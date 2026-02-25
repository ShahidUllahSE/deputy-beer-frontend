import React, { useRef, useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import {
  ScannerContainer,
  ScannerOverlay,
  CloseButton,
  ScannerInstructions,
  ScannerFrame,
  SwitchCameraButton,
  ScannerVideo,
} from "./QRScanner.styles";
import { FaTimes, FaSyncAlt } from "react-icons/fa";

interface QRScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (qrData: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ isOpen, onClose, onScan }) => {
  const [scanned, setScanned] = useState(false);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("user");
  const [cameraError, setCameraError] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const lastScannedRef = useRef<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Start camera stream for display
  const startCameraDisplay = async () => {
    try {
      // Stop existing stream if any
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      setCameraError(false);

      // Request camera access for display
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        await videoRef.current.play();
      }
    } catch (error: any) {
      console.error("Camera display error:", error);
      setCameraError(true);
      
      // If back camera fails, try front camera
      if (facingMode === "environment") {
        console.log("Back camera failed, trying front camera");
        setTimeout(() => {
          setFacingMode("user");
        }, 500);
      }
    }
  };

  // Stop camera stream
  const stopCameraDisplay = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Reset scanner state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setScanned(false);
      lastScannedRef.current = null;
      setFacingMode("user"); // Start with front camera for laptops
      startCameraDisplay();
    } else {
      stopCameraDisplay();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }

    return () => {
      stopCameraDisplay();
    };
  }, [isOpen]);

  // Restart camera when facingMode changes
  useEffect(() => {
    if (isOpen) {
      startCameraDisplay();
    }
  }, [facingMode]);

  const handleResult = (result: any, error: any) => {
    if (!!result && !scanned && isOpen) {
      let qrCodeData = result.getText();

      // Clean QR data: remove whitespace, newlines, carriage returns
      qrCodeData = qrCodeData.trim().replace(/\s+/g, "");

      // Ignore if same QR is detected again
      if (lastScannedRef.current === qrCodeData) {
        return;
      }
      lastScannedRef.current = qrCodeData;

      setScanned(true); // lock scanning immediately

      // Extract last 6 characters from QR code URL
      const cleanUrl = qrCodeData.replace(/\/$/, ''); // Remove trailing slash
      const qrData = cleanUrl.slice(-6); // Get last 6 characters

      // Call the onScan callback
        onScan(qrData);

      // Close scanner after a short delay
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setScanned(false);
        lastScannedRef.current = null;
        onClose();
      }, 500);
    }

    if (!!error && !scanned) {
      // Silently handle errors - don't spam console
      // console.warn("QR error:", error);
    }
  };

  // Toggle between front and back camera
  const toggleCamera = () => {
    console.log("Switching camera from", facingMode, "to", facingMode === "environment" ? "user" : "environment");
    setFacingMode((prev) => {
      const newMode = prev === "environment" ? "user" : "environment";
      return newMode;
    });
    setScanned(false);
    lastScannedRef.current = null;
    setCameraError(false);
  };

  if (!isOpen) return null;

  return (
    <ScannerContainer>
      <ScannerOverlay>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        <ScannerInstructions>
          Position the QR code within the frame
        </ScannerInstructions>
        <ScannerFrame>
          {/* Display video feed */}
        <ScannerVideo ref={videoRef} autoPlay playsInline />
          
          {/* Hidden QrReader for scanning - uses same camera */}
          <div style={{ display: "none" }}>
            <QrReader
              key={facingMode}
              constraints={{ facingMode }}
              onResult={handleResult}
            />
          </div>

          {cameraError && (
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              textAlign: "center",
              padding: "1rem",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              borderRadius: "8px",
              zIndex: 10
            }}>
              Camera not accessible. Please check permissions.
            </div>
          )}
        </ScannerFrame>
        <SwitchCameraButton onClick={toggleCamera} title="Switch Camera">
          <FaSyncAlt />
        </SwitchCameraButton>
      </ScannerOverlay>
    </ScannerContainer>
  );
};

export default QRScanner;
