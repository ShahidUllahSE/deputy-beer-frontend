import React, { useState, useRef, useEffect } from "react";
import { extractQRCode } from "../../utils/qrExtractor";
import {
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalTitle,
  CropContainer,
  CropImage,
  CropControls,
  CropButton,
  CancelButton,
  ProcessingText,
  CropArea,
  CropHandle,
} from "./CropModal.styles";

interface CropModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (croppedImageData: string, qrCodeValue: string | null) => void;
}

const CropModal: React.FC<CropModalProps> = ({
  isOpen,
  imageSrc,
  onClose,
  onCropComplete,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 200, height: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [imageZoom, setImageZoom] = useState(1);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && imageRef.current) {
      const img = imageRef.current;
      const handleLoad = () => {
        const maxWidth = 600;
        const maxHeight = 500;
        let width = img.naturalWidth;
        let height = img.naturalHeight;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        setImageSize({ width, height });
        // Center the crop area with a smaller initial size for small QR codes
        const initialSize = Math.min(150, Math.min(width, height) * 0.3);
        setCropArea({
          x: (width - initialSize) / 2,
          y: (height - initialSize) / 2,
          width: initialSize,
          height: initialSize,
        });
      };
      
      if (img.complete) {
        handleLoad();
      } else {
        img.onload = handleLoad;
      }
    }
  }, [isOpen, imageSrc]);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / imageZoom;
      const y = (e.clientY - rect.top) / imageZoom;

      if (isResizing && resizeHandle) {
        // Resize logic
        const deltaX = (x - dragStart.x);
        const deltaY = (y - dragStart.y);
        
        setCropArea((prev) => {
          let newArea = { ...prev };
          
          switch (resizeHandle) {
            case "nw": // Top-left
              newArea.width = Math.max(50, prev.width - deltaX);
              newArea.height = Math.max(50, prev.height - deltaY);
              newArea.x = Math.max(0, prev.x + deltaX);
              newArea.y = Math.max(0, prev.y + deltaY);
              break;
            case "ne": // Top-right
              newArea.width = Math.max(50, prev.width + deltaX);
              newArea.height = Math.max(50, prev.height - deltaY);
              newArea.y = Math.max(0, prev.y + deltaY);
              break;
            case "sw": // Bottom-left
              newArea.width = Math.max(50, prev.width - deltaX);
              newArea.height = Math.max(50, prev.height + deltaY);
              newArea.x = Math.max(0, prev.x + deltaX);
              break;
            case "se": // Bottom-right
              newArea.width = Math.max(50, prev.width + deltaX);
              newArea.height = Math.max(50, prev.height + deltaY);
              break;
          }
          
          // Keep square aspect ratio
          const size = Math.min(newArea.width, newArea.height);
          newArea.width = size;
          newArea.height = size;
          
          // Constrain to image bounds
          newArea.x = Math.max(0, Math.min(newArea.x, imageSize.width - newArea.width));
          newArea.y = Math.max(0, Math.min(newArea.y, imageSize.height - newArea.height));
          
          return newArea;
        });
        
        setDragStart({ x, y });
      } else if (isDragging) {
        // Move the crop area
        const newX = x - dragStart.x;
        const newY = y - dragStart.y;
        
        setCropArea((prev) => ({
          ...prev,
          x: Math.max(0, Math.min(newX, imageSize.width - prev.width)),
          y: Math.max(0, Math.min(newY, imageSize.height - prev.height)),
        }));
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeHandle(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleGlobalMouseMove);
        document.removeEventListener("mouseup", handleGlobalMouseUp);
      };
    }
  }, [isDragging, isResizing, resizeHandle, dragStart, imageSize, imageZoom]);

  const handleMouseDown = (e: React.MouseEvent, handle?: string) => {
    if (!containerRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / imageZoom;
    const y = (e.clientY - rect.top) / imageZoom;

    if (handle) {
      // Resizing from a corner handle
      setIsResizing(true);
      setResizeHandle(handle);
      setDragStart({ x, y });
    } else if (
      x >= cropArea.x &&
      x <= cropArea.x + cropArea.width &&
      y >= cropArea.y &&
      y <= cropArea.y + cropArea.height
    ) {
      // Dragging the crop area
      setIsDragging(true);
      setDragStart({ x: x - cropArea.x, y: y - cropArea.y });
    }
  };

  const handleCropSizeChange = (delta: number) => {
    setCropArea((prev) => {
      const newSize = Math.max(50, Math.min(Math.min(imageSize.width, imageSize.height), prev.width + delta));
      const centerX = prev.x + prev.width / 2;
      const centerY = prev.y + prev.height / 2;
      const newX = Math.max(0, Math.min(centerX - newSize / 2, imageSize.width - newSize));
      const newY = Math.max(0, Math.min(centerY - newSize / 2, imageSize.height - newSize));
      return {
        x: newX,
        y: newY,
        width: newSize,
        height: newSize,
      };
    });
  };

  const handleImageZoom = (delta: number) => {
    setImageZoom((prev) => Math.max(0.5, Math.min(3, prev + delta)));
  };

  const getCroppedImage = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        // Calculate scale factor
        const scaleX = img.naturalWidth / imageSize.width;
        const scaleY = img.naturalHeight / imageSize.height;

        canvas.width = cropArea.width * scaleX;
        canvas.height = cropArea.height * scaleY;

        let finalWidth = cropArea.width * scaleX;
        let finalHeight = cropArea.height * scaleY;
        
        // Scale up small images to improve QR code detection (minimum 300x300)
        const minSize = 300;
        let scaleFactor = 1;
        if (finalWidth < minSize || finalHeight < minSize) {
          scaleFactor = Math.max(minSize / finalWidth, minSize / finalHeight);
          finalWidth = Math.round(finalWidth * scaleFactor);
          finalHeight = Math.round(finalHeight * scaleFactor);
        }
        
        canvas.width = finalWidth;
        canvas.height = finalHeight;

        // Use high-quality image smoothing for better QR code detection
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        
        ctx.drawImage(
          img,
          cropArea.x * scaleX,
          cropArea.y * scaleY,
          cropArea.width * scaleX,
          cropArea.height * scaleY,
          0,
          0,
          canvas.width,
          canvas.height
        );

        // Use PNG format to preserve quality (lossless, better for QR codes)
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = reject;
      img.src = imageSrc;
    });
  };

  const handleCrop = async () => {
    setIsProcessing(true);
    try {
      const croppedImageData = await getCroppedImage();
      const qrCodeValue = await extractQRCode(croppedImageData);
      onCropComplete(croppedImageData, qrCodeValue);
    } catch (error) {
      console.error("Error cropping image:", error);
      onCropComplete(imageSrc, null);
    } finally {
      setIsProcessing(false);
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
        <ModalTitle>Crop QR Code</ModalTitle>
        <CropContainer
          ref={containerRef}
          style={{ transform: `scale(${imageZoom})`, transformOrigin: "center center" }}
        >
          <div
            style={{
              position: "relative",
              width: imageSize.width || "auto",
              height: imageSize.height || "auto",
            }}
            onMouseDown={handleMouseDown}
          >
            <CropImage
              ref={imageRef}
              src={imageSrc}
              alt="Uploaded image"
              style={{ width: imageSize.width || "auto", height: imageSize.height || "auto" }}
              draggable={false}
            />
            <CropArea
              style={{
                left: `${cropArea.x}px`,
                top: `${cropArea.y}px`,
                width: `${cropArea.width}px`,
                height: `${cropArea.height}px`,
              }}
            >
              <CropHandle
                style={{ top: "-8px", left: "-8px", cursor: "nw-resize" }}
                onMouseDown={(e) => handleMouseDown(e, "nw")}
              />
              <CropHandle
                style={{ top: "-8px", right: "-8px", cursor: "ne-resize" }}
                onMouseDown={(e) => handleMouseDown(e, "ne")}
              />
              <CropHandle
                style={{ bottom: "-8px", left: "-8px", cursor: "sw-resize" }}
                onMouseDown={(e) => handleMouseDown(e, "sw")}
              />
              <CropHandle
                style={{ bottom: "-8px", right: "-8px", cursor: "se-resize" }}
                onMouseDown={(e) => handleMouseDown(e, "se")}
              />
            </CropArea>
          </div>
        </CropContainer>
        <CropControls>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
            <label style={{ fontSize: "0.85rem", color: "#666", fontWeight: 600 }}>
              Crop Size: {Math.round(cropArea.width)}px
            </label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <CropButton
                onClick={() => handleCropSizeChange(-10)}
                disabled={isProcessing}
                style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}
              >
                −
              </CropButton>
              <CropButton
                onClick={() => handleCropSizeChange(10)}
                disabled={isProcessing}
                style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}
              >
                +
              </CropButton>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
            <label style={{ fontSize: "0.85rem", color: "#666", fontWeight: 600 }}>
              Image Zoom: {Math.round(imageZoom * 100)}%
            </label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <CropButton
                onClick={() => handleImageZoom(-0.1)}
                disabled={isProcessing}
                style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}
              >
                −
              </CropButton>
              <CropButton
                onClick={() => handleImageZoom(0.1)}
                disabled={isProcessing}
                style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}
              >
                +
              </CropButton>
            </div>
          </div>
        </CropControls>
        {isProcessing && (
          <ProcessingText>Processing cropped image...</ProcessingText>
        )}
        <CropControls style={{ marginTop: "1rem", justifyContent: "flex-end", gap: "0.75rem" }}>
          <CancelButton onClick={onClose} disabled={isProcessing}>
            Cancel
          </CancelButton>
          <CropButton onClick={handleCrop} disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Extract QR Code"}
          </CropButton>
        </CropControls>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CropModal;
