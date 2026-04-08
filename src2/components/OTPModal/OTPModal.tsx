import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { apiService } from "../../services/api";
import {
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalTitle,
  Subtitle,
  OTPContainer,
  OTPInput,
  ButtonDiv,
  SubmitButton,
  ResendButton,
  ResendText,
  ErrorMessage,
  TimerText,
} from "./OTPModal.styles";

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onVerificationSuccess: () => void;
}

const OTPModal: React.FC<OTPModalProps> = ({
  isOpen,
  onClose,
  email,
  onVerificationSuccess,
}) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    // Reset state when modal opens
    setOtp(["", "", "", "", "", ""]);
    setError(null);
    setTimer(600);
    setCanResend(false);

    // Focus first input on mount
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);

    // Timer countdown
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, email]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take last character
    setOtp(newOtp);
    setError(null);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pastedData[i] || "";
    }
    setOtp(newOtp);
    setError(null);

    // Focus last filled input or last input
    const lastIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiService.verifyOTP(email, otpString);
      toast.success(response.message || "Email verified successfully!");
      onVerificationSuccess();
      onClose();
    } catch (error: any) {
      setError(error.message || "Invalid verification code. Please try again.");
      // Clear OTP on error
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setResendLoading(true);
    setError(null);

    try {
      await apiService.resendOTP(email);
      toast.success("New verification code sent to your email!");
      setOtp(["", "", "", "", "", ""]);
      setTimer(600); // Reset timer to 10 minutes
      setCanResend(false);
      inputRefs.current[0]?.focus();
    } catch (error: any) {
      toast.error(error.message || "Failed to resend code. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={(e) => e.stopPropagation()}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalCloseButton
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          ×
        </ModalCloseButton>
        <ModalTitle>Verify Your Email</ModalTitle>
        <Subtitle>
          We've sent a 6-digit verification code to
          <br />
          <strong>{email}</strong>
        </Subtitle>

        <OTPContainer>
          {otp.map((digit, index) => (
            <OTPInput
              key={index}
              ref={(el) => {
                if (el) {
                  inputRefs.current[index] = el;
                }
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              autoComplete="off"
            />
          ))}
        </OTPContainer>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {timer > 0 && (
          <TimerText>
            Code expires in: <strong>{formatTime(timer)}</strong>
          </TimerText>
        )}

        <ButtonDiv>
          <SubmitButton
            onClick={handleVerify}
            disabled={loading || otp.join("").length !== 6}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </SubmitButton>
        </ButtonDiv>

        <ResendText>
          Didn't receive the code?{" "}
          {canResend ? (
            <ResendButton
              onClick={handleResend}
              disabled={resendLoading}
            >
              {resendLoading ? "Sending..." : "Resend Code"}
            </ResendButton>
          ) : (
            <span style={{ color: "#999" }}>
              Resend code in {formatTime(timer)}
            </span>
          )}
        </ResendText>
      </ModalContent>
    </ModalOverlay>
  );
};

export default OTPModal;
