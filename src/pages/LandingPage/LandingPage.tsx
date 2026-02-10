import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import QRCodeField from "../../components/QRCodeField/QRCodeField";
import { FaCamera, FaUpload, FaCheckCircle } from "react-icons/fa";
import QRScanner from "../../components/QRScanner/QRScanner";
import { extractQRCode } from "../../utils/qrExtractor";
import posterImage from "../../assets/DEPUTY MUSIC POSTER 2 copy.png";
import {
  LandingContainer,
  HeroSection,
  HeroContent,
  HeroHeadline,
  HeroSubheadline,
  HeroImage,
  InfoStepsSection,
  StepsTitle,
  InfoStepsContainer,
  InfoStepItem,
  StepHeader,
  StepBanner,
  StepNumberCircle,
  InfoStepText,
  StepsSubmitButtonWrapper,
  StepsSubmitButton,
  QRFormSection,
  QRFormContainer,
  QRFormTitle,
  QRFormSubtitle,
  ModalQRCodeSection,
  ModalQRCodeGrid,
  ModalQRFieldRow,
  ModalQRFieldLabel,
  ModalQRFieldActions,
  ModalQRFieldIcon,
  ModalQRFieldStatus,
  ModalSubmitText,
  ModalSubmitButton,
  SubmitSection,
  ErrorMessage,
  Header,
  HeaderContent,
  Logo,
  AuthButtons,
  AuthButton,
} from "./LandingPage.styles";
import { RootState } from "../../redux/store";
import { apiService } from "../../services/api";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/auth";
import Footer from "../../components/Footer/Footer";
import AuthModal from "../../components/AuthModal/AuthModal";
import OTPModal from "../../components/OTPModal/OTPModal";
import CropModal from "../../components/CropModal/CropModal";

interface QRCodeData {
  value: string | null;
  imagePreview: string | null;
}

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const username = useSelector((state: RootState) => state.auth.username);
  const role = useSelector((state: RootState) => state.auth.role);

  // Auto-redirect admin users to admin dashboard
  useEffect(() => {
    if (isLoggedIn && role === "admin") {
      // Check if we're already on admin dashboard
      if (window.location.pathname !== "/admin/dashboard") {
        navigate("/admin/dashboard");
      }
    }
  }, [isLoggedIn, role, navigate]);

  const [qrCodes, setQrCodes] = useState<QRCodeData[]>([
    { value: null, imagePreview: null },
    { value: null, imagePreview: null },
    { value: null, imagePreview: null },
    { value: null, imagePreview: null },
  ]);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [currentScannerIndex, setCurrentScannerIndex] = useState<number | null>(null);
  const scannerIndexRef = useRef<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showQRForm, setShowQRForm] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [otpEmail, setOtpEmail] = useState<string>("");
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState<string>("");
  const [cropImageIndex, setCropImageIndex] = useState<number | null>(null);

  const handleScanClick = (index: number) => {
    if (!isLoggedIn) {
      toast.error("Please sign in or sign up to participate");
      setIsAuthModalOpen(true);
      setAuthMode("signin");
      return;
    }
    setCurrentScannerIndex(index);
    scannerIndexRef.current = index; // Store in ref to avoid closure issues
    setScannerOpen(true);
  };

  const handleUpload = async (index: number, file: File) => {
    if (!isLoggedIn) {
      toast.error("Please sign in or sign up to participate");
      setIsAuthModalOpen(true);
      setAuthMode("signin");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageData = e.target?.result as string;
      const qrData = await extractQRCode(imageData);

      if (qrData) {
        // Use functional update to avoid race conditions with multiple uploads
        setQrCodes((prevQrCodes) => {
          const newQrCodes = [...prevQrCodes];
          newQrCodes[index] = {
            value: qrData,
            imagePreview: imageData,
          };
          return newQrCodes;
        });
        setError(null);
        // QR code value will be displayed in the field, no toast needed
      } else {
        // No QR code detected, show crop modal
        setCropImageSrc(imageData);
        setCropImageIndex(index);
        setIsCropModalOpen(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedImageData: string, qrCodeValue: string | null) => {
    if (cropImageIndex !== null) {
      const index = cropImageIndex; // Capture index to avoid closure issues
      if (qrCodeValue) {
        // QR code found in cropped image - use functional update
        setQrCodes((prevQrCodes) => {
          const newQrCodes = [...prevQrCodes];
          newQrCodes[index] = {
            value: qrCodeValue,
            imagePreview: croppedImageData,
          };
          return newQrCodes;
        });
        setError(null);
        toast.success(`QR Code ${index + 1} extracted successfully!`);
      } else {
        toast.error("No QR code found in the cropped area. Please try cropping again.");
      }
    }
    setIsCropModalOpen(false);
    setCropImageSrc("");
    setCropImageIndex(null);
  };

  const handleScannerResult = async (qrData: string) => {
    // Use ref to get the index that was set when scanner opened (avoids closure issues)
    const index = scannerIndexRef.current;
    if (index !== null && index >= 0 && index < 4) {
      // Use functional update to avoid race conditions
      setQrCodes((prevQrCodes) => {
        const newQrCodes = [...prevQrCodes];
        newQrCodes[index] = {
          value: qrData,
          imagePreview: null,
        };
        return newQrCodes;
      });
      setError(null);
      // Reset scanner index after successful scan
      setCurrentScannerIndex(null);
      scannerIndexRef.current = null;
      // QR code value will be displayed in the field, no toast needed
    }
  };

  const handleRemove = (index: number) => {
    const newQrCodes = [...qrCodes];
    newQrCodes[index] = { value: null, imagePreview: null };
    setQrCodes(newQrCodes);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!isLoggedIn) {
      toast.error("Please sign in or sign up to participate");
      setIsAuthModalOpen(true);
      setAuthMode("signin");
      return;
    }

    // Validate all 4 QR codes are filled
    const allFilled = qrCodes.every((qr) => qr.value !== null);
    if (!allFilled) {
      setError("Please scan all 4 QR codes to complete your entry.");
      toast.error("Please scan all 4 QR codes to complete your entry.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const qrCodeValues = qrCodes.map((qr) => qr.value).filter(Boolean) as string[];
      
      // Validate each QR code before submitting
      const validationResults = await Promise.all(
        qrCodeValues.map(async (code, idx) => {
          try {
            const validation = await apiService.validateQRCode(code);
            return { index: idx, code, isValid: validation.isValid, error: null };
          } catch (error: any) {
            return { index: idx, code, isValid: false, error: error.message };
          }
        })
      );

      // Check if any QR code is invalid
      const invalidCodes = validationResults.filter((result) => !result.isValid);
      if (invalidCodes.length > 0) {
        const errorMessages = invalidCodes.map(
          (result) => `Crown #${result.index + 1}: ${result.error || "Invalid or already used"}`
        );
        const errorMsg = `Invalid QR codes detected:\n${errorMessages.join("\n")}`;
        setError(errorMsg);
        toast.error("One or more QR codes are invalid or have already been used.");
        setIsSubmitting(false);
        return;
      }

      // All QR codes are valid, proceed with submission
      const response = await apiService.submitEntry(qrCodeValues);

      toast.success(response.message || "Entry submitted successfully! Good luck!");
      
      // Reset form after successful submission
      setQrCodes([
        { value: null, imagePreview: null },
        { value: null, imagePreview: null },
        { value: null, imagePreview: null },
        { value: null, imagePreview: null },
      ]);
      setShowQRForm(false); // Hide the form section after successful submission
    } catch (error: any) {
      console.error("Error submitting entry:", error);
      const errorMessage = error.message || "Failed to submit entry. Please try again.";
      
      // Check if error message indicates invalid/used QR codes
      if (errorMessage.includes("invalid") || errorMessage.includes("used") || errorMessage.includes("already")) {
        setError(`QR Code Error: ${errorMessage}`);
      } else {
        setError(errorMessage);
      }
      
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const allQRCodesFilled = qrCodes.every((qr) => qr.value !== null);

  return (
    <LandingContainer>
      <Header>
        <HeaderContent>
          <Logo>Deputy Beer</Logo>
          <AuthButtons>
            {isLoggedIn ? (
              <>
                <span style={{ 
                  color: "#333", 
                  fontWeight: 600,
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "200px"
                }}>
                  Welcome, {username || "User"}!
                </span>
                {role === "admin" ? (
                  <AuthButton as={Link} to="/admin/dashboard" $primary>
                    Admin Panel
                  </AuthButton>
                ) : (
                  <AuthButton as={Link} to="/history" $primary>
                    My History
                  </AuthButton>
                )}
                <AuthButton 
                  onClick={() => {
                    dispatch(logout());
                    localStorage.removeItem("token");
                    localStorage.removeItem("userId");
                    localStorage.removeItem("username");
                    localStorage.removeItem("role");
                    toast.success("Logged out successfully");
                    navigate("/");
                  }}
                >
                  Logout
                </AuthButton>
              </>
            ) : (
              <>
                <AuthButton onClick={() => { setIsAuthModalOpen(true); setAuthMode("signin"); }}>Sign In</AuthButton>
                <AuthButton $primary onClick={() => { setIsAuthModalOpen(true); setAuthMode("signup"); }}>
                  Sign Up
                </AuthButton>
              </>
            )}
          </AuthButtons>
        </HeaderContent>
      </Header>

      <HeroSection>
        <HeroContent>
          <HeroHeadline>
            ENTER TO WIN A TRIP FOR YOU&nbsp;+&nbsp;3<br />
            TO THE CARIBBEAN'S BIGGEST MUSIC FESTIVALS
          </HeroHeadline>
          <HeroSubheadline>
            Bring De Vibes to the Caribbean's biggest music festivals
          </HeroSubheadline>
        </HeroContent>
        <HeroImage>
          <img 
            src={posterImage} 
            alt="Deputy Music Poster" 
          />
        </HeroImage>
      </HeroSection>

      <InfoStepsSection>
        <StepsTitle>HERE'S HOW TO ENTER</StepsTitle>
        <InfoStepsContainer>
          <InfoStepItem>
            <StepHeader>
              <StepBanner>STEP</StepBanner>
              <StepNumberCircle>1</StepNumberCircle>
            </StepHeader>
            <InfoStepText>
              Scan and upload 4 QR codes to enter
            </InfoStepText>
          </InfoStepItem>
          <InfoStepItem>
            <StepHeader>
              <StepBanner>STEP</StepBanner>
              <StepNumberCircle>2</StepNumberCircle>
            </StepHeader>
            <InfoStepText>
              1 entry = 4 crowns uploaded
            </InfoStepText>
          </InfoStepItem>
          <InfoStepItem>
            <StepHeader>
              <StepBanner>STEP</StepBanner>
              <StepNumberCircle>3</StepNumberCircle>
            </StepHeader>
            <InfoStepText>
              10 winners announced every week
            </InfoStepText>
          </InfoStepItem>
        </InfoStepsContainer>
        
        <StepsSubmitButtonWrapper>
          <StepsSubmitButton
            onClick={() => {
              setShowQRForm(true);
              // Scroll to form section after a brief delay to allow rendering
              setTimeout(() => {
                const formSection = document.getElementById('qr-form-section');
                if (formSection) {
                  formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }, 100);
            }}
          >
            <span>→</span>
            SUBMIT YOUR ENTRY
          </StepsSubmitButton>
        </StepsSubmitButtonWrapper>
      </InfoStepsSection>

      {showQRForm && (
        <QRFormSection id="qr-form-section">
          <QRFormContainer>
            <QRFormTitle>
              ENTER TO WIN A TRIP FOR YOU&nbsp;+&nbsp;3<br />
              TO THE CARIBBEAN'S BIGGEST MUSIC FESTIVALS
            </QRFormTitle>
            
            <QRFormSubtitle>
              Bring De Vibes to the Caribbean's biggest festivals Scan and upload festivals.
            </QRFormSubtitle>

            <ModalQRCodeSection>
              <ModalQRCodeGrid>
                {qrCodes.map((qr, index) => {
                  const hasValue = !!qr.value || !!qr.imagePreview;
                  return (
                    <ModalQRFieldRow key={index} $hasValue={hasValue}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <ModalQRFieldLabel>Crown #{index + 1}</ModalQRFieldLabel>
                          {!hasValue && (
                            <span style={{ 
                              fontSize: '0.8rem', 
                              color: '#999',
                              fontFamily: '"Manrope", sans-serif'
                            }}>
                              Click to scan/upload QR code
                            </span>
                          )}
                        </div>
                        {hasValue && qr.value && (
                          <span style={{ 
                            fontSize: '0.7rem', 
                            color: '#666',
                            fontFamily: '"Manrope", sans-serif',
                            wordBreak: 'break-all',
                            lineHeight: '1.2'
                          }}>
                            {qr.value}
                          </span>
                        )}
                      </div>
                      <ModalQRFieldActions>
                        {hasValue ? (
                          <>
                            <ModalQRFieldIcon 
                              $uploaded
                              onClick={() => !isSubmitting && handleRemove(index)}
                              disabled={isSubmitting}
                              title="Remove QR Code"
                            >
                              <FaCheckCircle />
                            </ModalQRFieldIcon>
                            <ModalQRFieldStatus>Uploaded</ModalQRFieldStatus>
                          </>
                        ) : (
                          <>
                            <ModalQRFieldIcon
                              onClick={() => !isSubmitting && handleScanClick(index)}
                              disabled={isSubmitting}
                              title="Scan QR Code"
                            >
                              <FaCamera />
                            </ModalQRFieldIcon>
                            <ModalQRFieldIcon
                              onClick={() => {
                                if (!isSubmitting) {
                                  const input = document.createElement('input');
                                  input.type = 'file';
                                  input.accept = 'image/*';
                                  input.onchange = (e) => {
                                    const file = (e.target as HTMLInputElement).files?.[0];
                                    if (file) handleUpload(index, file);
                                  };
                                  input.click();
                                }
                              }}
                              disabled={isSubmitting}
                              title="Upload QR Code"
                            >
                              <FaUpload />
                            </ModalQRFieldIcon>
                          </>
                        )}
                      </ModalQRFieldActions>
                    </ModalQRFieldRow>
                  );
                })}
              </ModalQRCodeGrid>
            </ModalQRCodeSection>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <ModalSubmitText>
              Submit all 4 crowns for 1 instant entry to win the PRIZE
            </ModalSubmitText>

            <SubmitSection>
              <ModalSubmitButton
                onClick={handleSubmit}
                disabled={!allQRCodesFilled || isSubmitting || !isLoggedIn}
              >
                {isSubmitting ? "Submitting..." : "SUBMIT ENTRY"}
              </ModalSubmitButton>
              {!isLoggedIn && (
                <p style={{ 
                  marginTop: "1rem", 
                  color: "#666", 
                  fontSize: "14px",
                  textAlign: "center",
                  padding: "0 1rem",
                  lineHeight: "1.5"
                }}>
                  Please sign in or sign up to submit your entry
                </p>
              )}
            </SubmitSection>
          </QRFormContainer>
        </QRFormSection>
      )}

      <Footer copyrightText="© 2026 Deputy Beer Campaign. All rights reserved." />

      <QRScanner
        isOpen={scannerOpen}
        onClose={() => {
          setScannerOpen(false);
          // Reset index when scanner closes (in case scan was cancelled)
          setCurrentScannerIndex(null);
          scannerIndexRef.current = null;
        }}
        onScan={handleScannerResult}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
        onSignUpSuccess={(email) => {
          setOtpEmail(email);
          setIsOTPModalOpen(true);
          setIsAuthModalOpen(false);
        }}
      />

      <OTPModal
        isOpen={isOTPModalOpen}
        onClose={() => setIsOTPModalOpen(false)}
        email={otpEmail}
        onVerificationSuccess={() => {
          setIsOTPModalOpen(false);
          toast.success("Email verified! Please sign in to continue.");
          setIsAuthModalOpen(true);
          setAuthMode("signin");
        }}
      />

      <CropModal
        isOpen={isCropModalOpen}
        imageSrc={cropImageSrc}
        onClose={() => {
          setIsCropModalOpen(false);
          setCropImageSrc("");
          setCropImageIndex(null);
        }}
        onCropComplete={handleCropComplete}
      />
    </LandingContainer>
  );
};

export default LandingPage;
