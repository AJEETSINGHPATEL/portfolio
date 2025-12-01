import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// ===== PDF GENERATOR =====

export async function generatePDF(elementId, filename = 'document.pdf') {
    try {
        const element = document.getElementById(elementId);
        if (!element) {
            throw new Error('Element not found');
        }

        // Show loading indicator
        const loadingEl = document.createElement('div');
        loadingEl.className = 'pdf-loading';
        loadingEl.innerHTML = '<div class="loader"></div><p>Generating PDF...</p>';
        loadingEl.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.95);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      z-index: 10000;
      color: white;
    `;
        document.body.appendChild(loadingEl);

        // Capture element as canvas
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            windowWidth: 1200,
            windowHeight: element.scrollHeight
        });

        // Calculate PDF dimensions
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Create PDF
        const pdf = new jsPDF({
            orientation: imgHeight > imgWidth ? 'portrait' : 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        // Add image to PDF
        const imgData = canvas.toDataURL('image/jpeg', 0.85);
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);

        // Remove loading indicator
        document.body.removeChild(loadingEl);

        // Return PDF blob and download function
        return {
            blob: pdf.output('blob'),
            download: () => pdf.save(filename),
            size: pdf.output('blob').size
        };
    } catch (error) {
        console.error('PDF generation failed:', error);
        throw error;
    }
}

export async function downloadPDF(elementId, filename) {
    const result = await generatePDF(elementId, filename);
    result.download();
    return result;
}
