// src/utils/export.ts
import Konva from 'konva';
import jsPDF from 'jspdf';

export type ImageFormat = 'png' | 'jpeg' | 'webp';

export interface ExportOptions {
  includeNotes?: boolean;
  includeScaleBar?: boolean;
  pixelRatio?: number;
}

/**
 * Export the Konva stage as an image file
 * @param stage - Konva Stage reference
 * @param format - Image format (png, jpeg, webp)
 * @param filename - Output filename (without extension)
 * @param options - Export options
 */
export function exportAsImage(
  stage: Konva.Stage,
  format: ImageFormat,
  filename: string = 'floorplan',
  options: ExportOptions = {}
): void {
  const { pixelRatio = 2 } = options;

  // Get MIME type for the format
  const mimeType = getMimeType(format);

  // Generate data URL from stage
  const dataURL = stage.toDataURL({
    mimeType,
    quality: format === 'jpeg' ? 0.95 : 1,
    pixelRatio, // Higher resolution export
  });

  // Trigger download
  downloadDataURL(dataURL, `${filename}.${format}`);
}

/**
 * Export the Konva stage as a PDF file
 * @param stage - Konva Stage reference
 * @param filename - Output filename (without extension)
 * @param options - Export options
 */
export function exportAsPdf(
  stage: Konva.Stage,
  filename: string = 'floorplan',
  options: ExportOptions = {}
): void {
  const { pixelRatio = 2 } = options;

  // Generate high-resolution image
  const dataURL = stage.toDataURL({
    mimeType: 'image/png',
    quality: 1,
    pixelRatio,
  });

  // Get stage dimensions
  const stageWidth = stage.width();
  const stageHeight = stage.height();

  // Calculate aspect ratio
  const aspectRatio = stageWidth / stageHeight;

  // PDF dimensions (letter size in points: 8.5" x 11" = 612 x 792 pts)
  const pdfWidth = 612;
  const pdfHeight = 792;
  const pdfAspectRatio = pdfWidth / pdfHeight;

  // Calculate image dimensions to fit in PDF while preserving aspect ratio
  let imgWidth: number;
  let imgHeight: number;

  if (aspectRatio > pdfAspectRatio) {
    // Image is wider than PDF - fit to width
    imgWidth = pdfWidth - 40; // 20pt margin on each side
    imgHeight = imgWidth / aspectRatio;
  } else {
    // Image is taller than PDF - fit to height
    imgHeight = pdfHeight - 40; // 20pt margin on each side
    imgWidth = imgHeight * aspectRatio;
  }

  // Center the image
  const x = (pdfWidth - imgWidth) / 2;
  const y = (pdfHeight - imgHeight) / 2;

  // Create PDF
  const pdf = new jsPDF({
    orientation: aspectRatio > 1 ? 'landscape' : 'portrait',
    unit: 'pt',
    format: 'letter',
  });

  // Add image to PDF
  pdf.addImage(dataURL, 'PNG', x, y, imgWidth, imgHeight);

  // Add metadata
  pdf.setProperties({
    title: filename,
    subject: 'Floorplan created with Floorplan Studio',
    creator: 'Floorplan Studio',
    author: 'User',
  });

  // Save PDF
  pdf.save(`${filename}.pdf`);
}

/**
 * Get MIME type for image format
 */
function getMimeType(format: ImageFormat): string {
  const mimeTypes: Record<ImageFormat, string> = {
    png: 'image/png',
    jpeg: 'image/jpeg',
    webp: 'image/webp',
  };
  return mimeTypes[format];
}

/**
 * Trigger a download of a data URL
 */
function downloadDataURL(dataURL: string, filename: string): void {
  // Create temporary link element
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataURL;

  // Trigger download
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
}

/**
 * Copy canvas content to clipboard (PNG format)
 * Note: This requires HTTPS or localhost due to clipboard API restrictions
 */
export async function copyToClipboard(stage: Konva.Stage): Promise<boolean> {
  try {
    // Check if clipboard API is available
    if (!navigator.clipboard || !navigator.clipboard.write) {
      console.warn('Clipboard API not available');
      return false;
    }

    // Generate blob from stage
    const blob = await new Promise<Blob>((resolve, reject) => {
      stage.toBlob({
        callback: (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to generate blob'));
          }
        },
        mimeType: 'image/png',
        quality: 1,
        pixelRatio: 2,
      });
    });

    // Copy to clipboard
    await navigator.clipboard.write([
      new ClipboardItem({
        'image/png': blob,
      }),
    ]);

    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}
