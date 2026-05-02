import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export async function downloadAsPng(elementId: string, filename: string) {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const dataUrl = await toPng(element, { 
      quality: 1, 
      pixelRatio: 3, // High quality
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left'
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
    const dataUrl = await toPng(element, { 
      quality: 1, 
      pixelRatio: 2 // Slightly lower for PDF to keep file size reasonable
    });
    
    // Default A4 dimensions in mm: 210 x 297
    // Determine orientation based on element dimensions
    const orientation = element.offsetWidth > element.offsetHeight ? 'landscape' : 'portrait';
    
    const pdf = new jsPDF({
      orientation,
      unit: 'px',
      format: [element.offsetWidth, element.offsetHeight]
    });

    pdf.addImage(dataUrl, 'PNG', 0, 0, element.offsetWidth, element.offsetHeight);
    pdf.save(`${filename}.pdf`);
  } catch (err) {
    console.error('Failed to export PDF', err);
    throw new Error('Failed to generate PDF document.');
  }
}
