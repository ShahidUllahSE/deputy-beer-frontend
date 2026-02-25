import jsQR from "jsqr";

/**
 * Extract last 6 characters from QR code URL or data
 * If it's a URL, extracts last 6 characters after removing trailing slash
 * If it's not a URL or too short, returns the original trimmed value
 */
export const extractLast6Chars = (data: string | undefined | null): string | null => {
  if (!data) return null;
  
  const trimmed = data.trim();
  if (!trimmed) return null;
  
  // If it's a URL, extract last 6 characters
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    const cleanUrl = trimmed.replace(/\/$/, ''); // Remove trailing slash
    const last6 = cleanUrl.slice(-6); // Get last 6 characters
    
    // If we got valid 6 characters, return them
    if (last6 && last6.length === 6) {
      return last6;
    }
    
    // Fallback: try to get last segment and take last 6 chars
    const lastSegment = cleanUrl.split("/").pop() || "";
    return lastSegment.slice(-6) || null;
  }
  
  // If not a URL, try to get last segment and extract last 6 chars
  const lastSegment = trimmed.split("/").pop() || trimmed;
  return lastSegment.slice(-6) || null;
};

export const extractQRCode = async (imageSrc: string): Promise<string | null> => {
  return new Promise((resolve) => {
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = imageSrc;

    image.onload = () => {
      if (image.width <= 0 || image.height <= 0) {
        console.error(
          `Invalid image dimensions: width=${image.width}, height=${image.height}`
        );
        return resolve(null);
      }

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) {
        console.error("Failed to get 2D canvas context");
        return resolve(null);
      }

      // Use high-quality image smoothing for better QR code detection
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";

      canvas.width = image.width;
      canvas.height = image.height;

      try {
        context.drawImage(image, 0, 0, image.width, image.height);
      } catch (e) {
        console.error("Error drawing image on canvas:", e);
        return resolve(null);
      }

      let imageData;
      try {
        imageData = context.getImageData(0, 0, image.width, image.height);
      } catch (e) {
        console.error("Error getting image data:", e);
        return resolve(null);
      }

      if (
        !imageData.data ||
        imageData.data.length !== image.width * image.height * 4
      ) {
        console.error(
          `Invalid ImageData: length=${imageData.data.length}, expected=${
            image.width * image.height * 4
          }`
        );
        return resolve(null);
      }

      // Try the original image first (jsQR automatically tries inversion)
      try {
        const code = jsQR(imageData.data, image.width, image.height, {
          inversionAttempts: "attemptBoth", // Explicitly try both normal and inverted
        });
        if (code) {
          const qrCode = extractLast6Chars(code.data);
          return resolve(qrCode);
        }
      } catch (e) {
        // Silently continue
      }

      // Try with explicit inversion attempts
      try {
        const code = jsQR(imageData.data, image.width, image.height, {
          inversionAttempts: "dontInvert",
        });
        if (code) {
          const qrCode = extractLast6Chars(code.data);
          return resolve(qrCode);
        }
      } catch (e) {
        // Silently continue
      }

      // Try with onlyInvert for reflective/metallic surfaces
      try {
        const code = jsQR(imageData.data, image.width, image.height, {
          inversionAttempts: "onlyInvert",
        });
        if (code) {
          const qrCode = extractLast6Chars(code.data);
          return resolve(qrCode);
        }
      } catch (e) {
        // Silently continue
      }

      // Try multiple preprocessing methods
      const preprocessingMethods = [
        applyBinarization, // Try binarization first for metallic surfaces
        applyContrastEnhancement,
        applyHistogramEqualization,
        applySharpening,
        applyMetallicSurfaceEnhancement, // Special method for bottle caps
      ];

      for (const method of preprocessingMethods) {
        try {
          const processedImageData = method(
            context,
            image.width,
            image.height
          );
          if (
            !processedImageData.data ||
            processedImageData.data.length !== image.width * image.height * 4
          ) {
            console.warn(`Invalid processed ImageData from ${method.name}`);
            continue;
          }
          // Try with different inversion attempts for each preprocessing method
          const inversionOptions = ["attemptBoth", "dontInvert", "onlyInvert"];
          for (const inversion of inversionOptions) {
            try {
              const code = jsQR(
                processedImageData.data,
                image.width,
                processedImageData.height,
                { inversionAttempts: inversion as any }
              );
              if (code) {
                const qrCode = extractLast6Chars(code.data);
                return resolve(qrCode);
              }
            } catch (e) {
              // Continue to next inversion option
            }
          }
        } catch (e) {
          console.error(`Error in preprocessing method ${method.name}:`, e);
        }
      }

      // Try chained preprocessing (combine multiple methods for low-quality images)
      try {
        // Chain: Contrast -> Binarization
        let processed = applyContrastEnhancement(context, image.width, image.height);
        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");
        if (tempCtx) {
          tempCanvas.width = image.width;
          tempCanvas.height = image.height;
          tempCtx.putImageData(processed, 0, 0);
          processed = applyBinarization(tempCtx, image.width, image.height);
          // Try with different inversion attempts
          const inversionOptions = ["attemptBoth", "dontInvert", "onlyInvert"];
          for (const inversion of inversionOptions) {
            try {
              const code = jsQR(processed.data, image.width, image.height, {
                inversionAttempts: inversion as any,
              });
              if (code) {
                const qrCode = extractLast6Chars(code.data);
                return resolve(qrCode);
              }
            } catch (e) {
              // Continue
            }
          }
        }
      } catch (e) {
        // Silently continue
      }

      try {
        // Chain: Histogram Equalization -> Binarization
        let processed = applyHistogramEqualization(context, image.width, image.height);
        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");
        if (tempCtx) {
          tempCanvas.width = image.width;
          tempCanvas.height = image.height;
          tempCtx.putImageData(processed, 0, 0);
          processed = applyBinarization(tempCtx, image.width, image.height);
          // Try with different inversion attempts
          const inversionOptions = ["attemptBoth", "dontInvert", "onlyInvert"];
          for (const inversion of inversionOptions) {
            try {
              const code = jsQR(processed.data, image.width, image.height, {
                inversionAttempts: inversion as any,
              });
              if (code) {
                const qrCode = extractLast6Chars(code.data);
                return resolve(qrCode);
              }
            } catch (e) {
              // Continue
            }
          }
        }
      } catch (e) {
        // Silently continue
      }

      // Try multiple ROI (Region of Interest) attempts at different sizes
      const roiSizes = [0.3, 0.5, 0.7, 0.9, 1.0]; // Added full image size
      for (const size of roiSizes) {
        try {
          const qrCode = tryMultipleROIs(
            context,
            image.width,
            image.height,
            size
          );
          if (qrCode) {
            return resolve(extractLast6Chars(qrCode));
          }
        } catch (e) {
          // Silently continue
        }
      }

      // Try ROI with preprocessing for low-quality images
      for (const size of [0.7, 0.9, 1.0]) {
        try {
          const roiSize = Math.min(image.width, image.height) * size;
          const centerX = image.width / 2;
          const centerY = image.height / 2;
          const x = Math.max(0, centerX - roiSize / 2);
          const y = Math.max(0, centerY - roiSize / 2);
          const actualRoiSize = Math.min(roiSize, image.width - x, image.height - y);
          
          if (actualRoiSize < 50) continue;

          const roiCanvas = document.createElement("canvas");
          const roiCtx = roiCanvas.getContext("2d");
          if (!roiCtx) continue;

          roiCanvas.width = actualRoiSize;
          roiCanvas.height = actualRoiSize;
          roiCtx.imageSmoothingEnabled = true;
          roiCtx.imageSmoothingQuality = "high";
          roiCtx.drawImage(
            context.canvas,
            x, y, actualRoiSize, actualRoiSize,
            0, 0, actualRoiSize, actualRoiSize
          );

          // Try preprocessing on ROI
          for (const method of preprocessingMethods) {
            try {
              const processed = method(roiCtx, actualRoiSize, actualRoiSize);
              // Try with different inversion attempts
              const inversionOptions = ["attemptBoth", "dontInvert", "onlyInvert"];
              for (const inversion of inversionOptions) {
                try {
                  const code = jsQR(processed.data, actualRoiSize, actualRoiSize, {
                    inversionAttempts: inversion as any,
                  });
                  if (code) {
                    const qrCode = extractLast6Chars(code.data);
                    return resolve(qrCode);
                  }
                } catch (e) {
                  // Continue
                }
              }
            } catch (e) {
              // Continue
            }
          }
        } catch (e) {
          // Continue
        }
      }

      // Try multiple scaling attempts with preprocessing
      const scales = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0]; // Added more aggressive scaling
      for (const scale of scales) {
        try {
          const qrCode = tryScaling(
            context,
            image.width,
            image.height,
            scale
          );
          if (qrCode) {
            return resolve(extractLast6Chars(qrCode));
          }
        } catch (e) {
          // Silently continue
        }
      }

      // Try scaling + preprocessing combinations for low-quality images
      for (const scale of [2.0, 3.0, 4.0]) {
        try {
          const scaledCanvas = document.createElement("canvas");
          const scaledCtx = scaledCanvas.getContext("2d");
          if (!scaledCtx) continue;

          const newWidth = Math.floor(image.width * scale);
          const newHeight = Math.floor(image.height * scale);
          
          if (newWidth < 50 || newHeight < 50 || newWidth > 3000 || newHeight > 3000) {
            continue;
          }

          scaledCanvas.width = newWidth;
          scaledCanvas.height = newHeight;
          scaledCtx.imageSmoothingEnabled = true;
          scaledCtx.imageSmoothingQuality = "high";
          scaledCtx.drawImage(context.canvas, 0, 0, newWidth, newHeight);

          // Try each preprocessing method on scaled image
          for (const method of preprocessingMethods) {
            try {
              const processed = method(scaledCtx, newWidth, newHeight);
              // Try with different inversion attempts
              const inversionOptions = ["attemptBoth", "dontInvert", "onlyInvert"];
              for (const inversion of inversionOptions) {
                try {
                  const code = jsQR(processed.data, newWidth, newHeight, {
                    inversionAttempts: inversion as any,
                  });
                  if (code) {
                    const qrCode = extractLast6Chars(code.data);
                    return resolve(qrCode);
                  }
                } catch (e) {
                  // Continue
                }
              }
            } catch (e) {
              // Continue to next method
            }
          }
        } catch (e) {
          // Continue to next scale
        }
      }

      console.warn("All QR code detection strategies failed");
      resolve(null);
    };

    image.onerror = () => {
      console.error("Failed to load image");
      resolve(null);
    };
  });
};

// Contrast enhancement preprocessing
function applyContrastEnhancement(
  context: CanvasRenderingContext2D,
  width: number,
  height: number
): ImageData {
  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;

  let total = 0;
  for (let i = 0; i < data.length; i += 4) {
    total += (data[i] + data[i + 1] + data[i + 2]) / 3;
  }
  const avg = total / (data.length / 4);

  const factor = (259 * (128 + 50)) / (255 * (259 - 50));
  for (let i = 0; i < data.length; i += 4) {
    data[i] = clamp(factor * (data[i] - avg) + avg);
    data[i + 1] = clamp(factor * (data[i + 1] - avg) + avg);
    data[i + 2] = clamp(factor * (data[i + 2] - avg) + avg);
  }

  return imageData;
}

// Binarization with Otsu threshold for better results
function applyBinarization(
  context: CanvasRenderingContext2D,
  width: number,
  height: number
): ImageData {
  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;

  const threshold = calculateOtsuThreshold(imageData);

  for (let i = 0; i < data.length; i += 4) {
    const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
    const value = brightness > threshold ? 255 : 0;
    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
  }

  return imageData;
}

// Sharpening filter to enhance edges
function applySharpening(
  context: CanvasRenderingContext2D,
  width: number,
  height: number
): ImageData {
  const imageData = context.getImageData(0, 0, width, height);
  const output = context.createImageData(width, height);
  const kernel = [
    [0, -1, 0],
    [-1, 5, -1],
    [0, -1, 0],
  ];

  applyConvolutionFilter(imageData, output, kernel);
  return output;
}

// Histogram equalization to improve contrast
function applyHistogramEqualization(
  context: CanvasRenderingContext2D,
  width: number,
  height: number
): ImageData {
  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;

  const histogram = new Array(256).fill(0);
  for (let i = 0; i < data.length; i += 4) {
    const brightness = Math.floor((data[i] + data[i + 1] + data[i + 2]) / 3);
    histogram[brightness]++;
  }

  const cdf = new Array(256);
  cdf[0] = histogram[0];
  for (let i = 1; i < 256; i++) {
    cdf[i] = cdf[i - 1] + histogram[i];
  }

  const cdfMin = Math.min(...cdf.filter((val) => val > 0));
  const totalPixels = width * height;

  for (let i = 0; i < data.length; i += 4) {
    const brightness = Math.floor((data[i] + data[i + 1] + data[i + 2]) / 3);
    const newValue = Math.floor(
      ((cdf[brightness] - cdfMin) / (totalPixels - cdfMin)) * 255
    );
    data[i] = newValue;
    data[i + 1] = newValue;
    data[i + 2] = newValue;
  }

  return imageData;
}

// Special preprocessing for metallic/reflective surfaces (like bottle caps)
function applyMetallicSurfaceEnhancement(
  context: CanvasRenderingContext2D,
  width: number,
  height: number
): ImageData {
  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;

  // Step 1: Apply aggressive contrast enhancement
  let total = 0;
  for (let i = 0; i < data.length; i += 4) {
    total += (data[i] + data[i + 1] + data[i + 2]) / 3;
  }
  const avg = total / (data.length / 4);

  // More aggressive contrast factor for metallic surfaces
  const factor = (259 * (128 + 100)) / (255 * (259 - 100));
  for (let i = 0; i < data.length; i += 4) {
    data[i] = clamp(factor * (data[i] - avg) + avg);
    data[i + 1] = clamp(factor * (data[i + 1] - avg) + avg);
    data[i + 2] = clamp(factor * (data[i + 2] - avg) + avg);
  }

  // Step 2: Apply adaptive binarization with multiple thresholds
  const threshold1 = calculateOtsuThreshold(imageData);
  const threshold2 = threshold1 * 0.7; // Lower threshold for dark areas
  const threshold3 = threshold1 * 1.3; // Higher threshold for bright areas

  for (let i = 0; i < data.length; i += 4) {
    const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
    let value = 0;
    
    // Use different thresholds based on local brightness
    if (brightness > threshold3) {
      value = 255; // Very bright areas
    } else if (brightness < threshold2) {
      value = 0; // Very dark areas
    } else {
      // Use Otsu threshold for mid-range
      value = brightness > threshold1 ? 255 : 0;
    }
    
    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
  }

  return imageData;
}

// Helper function to clamp values
function clamp(value: number): number {
  return Math.max(0, Math.min(255, value));
}

// Calculate Otsu threshold for optimal binarization
function calculateOtsuThreshold(imageData: ImageData): number {
  const data = imageData.data;
  const histogram = new Array(256).fill(0);

  for (let i = 0; i < data.length; i += 4) {
    const brightness = Math.floor((data[i] + data[i + 1] + data[i + 2]) / 3);
    histogram[brightness]++;
  }

  const total = imageData.width * imageData.height;

  let sum = 0;
  for (let i = 0; i < 256; i++) sum += i * histogram[i];

  let sumB = 0;
  let wB = 0;
  let wF = 0;
  let maxVariance = 0;
  let threshold = 128; // Default fallback

  for (let i = 0; i < 256; i++) {
    wB += histogram[i];
    if (wB === 0) continue;

    wF = total - wB;
    if (wF === 0) break;

    sumB += i * histogram[i];

    const mB = sumB / wB;
    const mF = (sum - sumB) / wF;

    const variance = wB * wF * (mB - mF) * (mB - mF);
    if (variance > maxVariance) {
      maxVariance = variance;
      threshold = i;
    }
  }

  return threshold;
}

// Apply convolution filter for sharpening
function applyConvolutionFilter(
  input: ImageData,
  output: ImageData,
  kernel: number[][]
) {
  const width = input.width;
  const height = input.height;
  const inputData = input.data;
  const outputData = output.data;
  const kernelSize = kernel.length;
  const kernelRadius = Math.floor(kernelSize / 2);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0,
        g = 0,
        b = 0;

      for (let ky = 0; ky < kernelSize; ky++) {
        for (let kx = 0; kx < kernelSize; kx++) {
          const pixelX = x + kx - kernelRadius;
          const pixelY = y + ky - kernelRadius;

          if (
            pixelX >= 0 &&
            pixelX < width &&
            pixelY >= 0 &&
            pixelY < height
          ) {
            const idx = (pixelY * width + pixelX) * 4;
            const weight = kernel[ky][kx];

            r += inputData[idx] * weight;
            g += inputData[idx + 1] * weight;
            b += inputData[idx + 2] * weight;
          }
        }
      }

      const idx = (y * width + x) * 4;
      outputData[idx] = clamp(r);
      outputData[idx + 1] = clamp(g);
      outputData[idx + 2] = clamp(b);
      outputData[idx + 3] = inputData[idx + 3];
    }
  }
}

// Try multiple regions of interest at different positions
function tryMultipleROIs(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  sizeFactor: number
): string | null {
  const roiSize = Math.min(width, height) * sizeFactor;
  const positions = [
    { x: width / 2 - roiSize / 2, y: height / 2 - roiSize / 2 }, // Center
    { x: 0, y: 0 }, // Top-left
    { x: width - roiSize, y: 0 }, // Top-right
    { x: 0, y: height - roiSize }, // Bottom-left
    { x: width - roiSize, y: height - roiSize }, // Bottom-right
    { x: width / 2 - roiSize / 2, y: 0 }, // Top-center
    { x: width / 2 - roiSize / 2, y: height - roiSize }, // Bottom-center
    { x: 0, y: height / 2 - roiSize / 2 }, // Left-center
    { x: width - roiSize, y: height / 2 - roiSize / 2 }, // Right-center
  ];

  for (const pos of positions) {
    // Ensure ROI is within bounds
    const x = Math.max(0, Math.min(pos.x, width - roiSize));
    const y = Math.max(0, Math.min(pos.y, height - roiSize));
    const actualRoiSize = Math.min(roiSize, width - x, height - y);

    if (actualRoiSize < 50) continue; // Skip if too small

    const roiCanvas = document.createElement("canvas");
    const roiContext = roiCanvas.getContext("2d");
    if (!roiContext) continue;

    roiCanvas.width = actualRoiSize;
    roiCanvas.height = actualRoiSize;

    try {
      roiContext.drawImage(
        context.canvas,
        x,
        y,
        actualRoiSize,
        actualRoiSize,
        0,
        0,
        actualRoiSize,
        actualRoiSize
      );

      const roiImageData = roiContext.getImageData(0, 0, actualRoiSize, actualRoiSize);
      // Try with different inversion attempts
      const inversionOptions = ["attemptBoth", "dontInvert", "onlyInvert"];
      for (const inversion of inversionOptions) {
        try {
          const code = jsQR(roiImageData.data, actualRoiSize, actualRoiSize, {
            inversionAttempts: inversion as any,
          });
          if (code) {
            return extractLast6Chars(code.data);
          }
        } catch (e) {
          // Continue
        }
      }
    } catch (e) {
      // Skip this ROI if there's an error
      continue;
    }
  }

  return null;
}

// Try scaling the image at different sizes
function tryScaling(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  scale: number
): string | null {
  const newWidth = Math.floor(width * scale);
  const newHeight = Math.floor(height * scale);

  // Skip if too small or too large
  if (newWidth < 50 || newHeight < 50 || newWidth > 2000 || newHeight > 2000) {
    return null;
  }

  const scaledCanvas = document.createElement("canvas");
  const scaledContext = scaledCanvas.getContext("2d");
  if (!scaledContext) return null;

  scaledCanvas.width = newWidth;
  scaledCanvas.height = newHeight;

  try {
    scaledContext.drawImage(context.canvas, 0, 0, newWidth, newHeight);

    const scaledImageData = scaledContext.getImageData(
      0,
      0,
      newWidth,
      newHeight
    );
    // Try with different inversion attempts
    const inversionOptions = ["attemptBoth", "dontInvert", "onlyInvert"];
    for (const inversion of inversionOptions) {
      try {
        const code = jsQR(scaledImageData.data, newWidth, newHeight, {
          inversionAttempts: inversion as any,
        });
        if (code) {
          return extractLast6Chars(code.data);
        }
      } catch (e) {
        // Continue
      }
    }
  } catch (e) {
    return null;
  }

  return null;
}
