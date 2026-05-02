import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export async function downloadAsPng(elementId: string, filename: string) {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const dataUrl = await toPng(element, { 
      quality: 1, 
      pixelRatio: 3, // High quality
      width: element.offsetWidth,
      height: element.offsetHeight,
      style: {
        // Reset any CSS transform scale applied for preview — capture at full 1:1 size
        transform: 'scale(1)',
        transformOrigin: 'top left',
        opacity: '1',
      }
    });
    
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = dataUrl;
    link.click();
  } catch (err) {
    console.error('Failed to export PNG', err);
    throw new Error('Failed to generate PNG image.');
  }
}

export async function downloadAsPdf(elementId: string, filename: string) {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const width = element.offsetWidth;
    const height = element.offsetHeight;

    // Capture at full resolution — reset transform scale used for preview
    const dataUrl = await toPng(element, { 
      quality: 1,
      pixelRatio: 2,
      width,
      height,
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left',
        opacity: '1',
      }
    });
    
    // Convert px → mm at 96dpi (1px = 25.4/96 mm ≈ 0.2646mm)
    // This maps 1123x794px perfectly to A4 landscape (297x210mm)
    const PX_TO_MM = 25.4 / 96;
    const widthMm  = width  * PX_TO_MM;
    const heightMm = height * PX_TO_MM;

    const orientation = width > height ? 'landscape' : 'portrait';

    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format: [widthMm, heightMm], // exact certificate dimensions
    });

    // Image fills the entire page with no margins
    pdf.addImage(dataUrl, 'PNG', 0, 0, widthMm, heightMm);
    pdf.save(`${filename}.pdf`);
  } catch (err) {
    console.error('Failed to export PDF', err);
    throw new Error('Failed to generate PDF document.');
  }
}

