import React, { useEffect, useRef, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import {
  ScannerContainer,
  ScannerOverlay,
  CloseButton,
  ScannerInstructions,
  ScannerFrame,
  SwitchCameraButton,
} from "./QRScanner.styles";
import { FaTimes, FaSyncAlt } from "react-icons/fa";

interface QRScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (qrData: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ isOpen, onClose, onScan }) => {
  const [scanned, setScanned] = useState(false);
  const [facingMode, setFacingMode] = useState<
    "environment" | "user" | undefined
  >("user");
  const [cameraError, setCameraError] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const lastScannedRef = useRef<string | null>(null);
  const switchedOnErrorRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      setCameraError(false);
      switchedOnErrorRef.current = false;
    }
  }, [isOpen]);

  const handleScan = (detectedCodes: { rawValue: string }[]) => {
    if (!detectedCodes?.length || scanned || !isOpen) return;

    let qrCodeData = detectedCodes[0].rawValue;

    // Clean QR data: remove whitespace, newlines, carriage returns
    qrCodeData = qrCodeData.trim().replace(/\s+/g, "");

    // Ignore if same QR is detected again
    if (lastScannedRef.current === qrCodeData) return;
    lastScannedRef.current = qrCodeData;

    setScanned(true);

    // Extract last 6 characters from QR code
    const cleanUrl = qrCodeData.replace(/\/$/, "");
    const qrData = cleanUrl.slice(-6);

    console.log("QR Code extracted:", { raw: qrCodeData, extracted: qrData });

    onScan(qrData);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setScanned(false);
      lastScannedRef.current = null;
      onClose();
    }, 500);
  };

  const handleError = (error: unknown) => {
    const err = error as { name?: string } | null;
    const isNotReadable = err?.name === "NotReadableError";
    if (isNotReadable && !switchedOnErrorRef.current) {
      switchedOnErrorRef.current = true;
      // Try: user -> environment -> no constraint (let browser pick)
      setFacingMode((prev) => {
        if (prev === "user") return "environment";
        if (prev === "environment") return undefined; // { video: true }
        return "user"; // fallback
      });
      return;
    }
    setCameraError(true);
  };

  const handleRetry = () => {
    setCameraError(false);
    switchedOnErrorRef.current = false;
    setFacingMode((prev) => {
      if (prev === "user") return "environment";
      if (prev === "environment") return undefined;
      return "user";
    });
  };

  const toggleCamera = () => {
    setFacingMode((prev) => {
      if (prev === "user") return "environment";
      if (prev === "environment") return undefined;
      return "user";
    });
    setScanned(false);
    lastScannedRef.current = null;
    setCameraError(false);
  };

  const handleClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setScanned(false);
    lastScannedRef.current = null;
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ScannerContainer>
      <ScannerOverlay>
        <CloseButton onClick={handleClose}>
          <FaTimes />
        </CloseButton>
        <ScannerInstructions>
          Position the QR code within the frame
          <span
            style={{
              display: "block",
              fontSize: "0.85em",
              marginTop: "6px",
              opacity: 0.9,
            }}
          >
            Crown/cap not scanning? Use good lighting, hold flat, avoid glare,
            or use Upload.
          </span>
        </ScannerInstructions>
        <ScannerFrame>
          <Scanner
            key={facingMode ?? "default"}
            onScan={handleScan}
            onError={handleError}
            constraints={facingMode ? { facingMode } : {}}
            allowMultiple={false}
            components={{ finder: true }}
            styles={{
              container: { width: "100%", height: "100%" },
              video: { width: "100%", height: "100%", objectFit: "cover" },
            }}
          />

          {cameraError && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                textAlign: "center",
                padding: "1.25rem",
                backgroundColor: "rgba(0, 0, 0, 0.85)",
                borderRadius: "8px",
                zIndex: 10,
                maxWidth: "90%",
              }}
            >
              <p style={{ margin: "0 0 0.75rem 0" }}>
                Camera not accessible. Another app may be using it, or
                permissions are blocked.
              </p>
              <p style={{ margin: 0, fontSize: "0.9em", opacity: 0.9 }}>
                Close Zoom, Teams, or other camera apps, then tap Retry.
              </p>
              <button
                onClick={handleRetry}
                style={{
                  marginTop: "1rem",
                  padding: "0.5rem 1.25rem",
                  background: "#0b3c6e",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "14px",
                }}
              >
                Retry
              </button>
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
