import React, { useState, useRef } from "react";
import { FaCamera, FaUpload, FaCheckCircle, FaTimes } from "react-icons/fa";
import {
  QRFieldContainer,
  QRFieldLabel,
  QRFieldBox,
  QRFieldActions,
  QRButton,
  QRImagePreview,
  QRImageContainer,
  RemoveButton,
} from "./QRCodeField.styles";

interface QRCodeFieldProps {
  index: number;
  value: string | null;
  imagePreview: string | null;
  onScan: (index: number) => void;
  onUpload: (index: number, file: File) => void;
  onRemove: (index: number) => void;
  disabled?: boolean;
}

const QRCodeField: React.FC<QRCodeFieldProps> = ({
  index,
  value,
  imagePreview,
  onScan,
  onUpload,
  onRemove,
  disabled = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      await onUpload(index, file);
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    onRemove(index);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <QRFieldContainer>
      <QRFieldLabel>QR Code {index + 1}</QRFieldLabel>
      <QRFieldBox $hasValue={!!value} $disabled={disabled}>
        {imagePreview ? (
          <QRImageContainer>
            <QRImagePreview src={imagePreview} alt={`QR Code ${index + 1}`} />
            <RemoveButton onClick={handleRemove} disabled={disabled}>
              <FaTimes />
            </RemoveButton>
          </QRImageContainer>
        ) : (
          <>
            {value ? (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FaCheckCircle style={{ color: "#0b3c6e", fontSize: "20px" }} />
                <span style={{ color: "#0b3c6e", fontWeight: 600 }}>
                  QR Code Scanned
                </span>
              </div>
            ) : (
              <span style={{ color: "#999", fontSize: "14px" }}>
                No QR code scanned
              </span>
            )}
          </>
        )}
      </QRFieldBox>
      {!value && (
        <QRFieldActions>
          <QRButton
            onClick={() => onScan(index)}
            disabled={disabled || isProcessing}
            type="button"
          >
            <FaCamera />
            Scan
          </QRButton>
          <QRButton
            onClick={handleUploadClick}
            disabled={disabled || isProcessing}
            type="button"
            $variant="upload"
          >
            <FaUpload />
            Upload
          </QRButton>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: "none" }}
            disabled={disabled || isProcessing}
          />
        </QRFieldActions>
      )}
    </QRFieldContainer>
  );
};

export default QRCodeField;
