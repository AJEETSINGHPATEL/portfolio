import { router } from '../router.js';
import { state } from '../state.js';
import { storage } from '../storage.js';
import { downloadPDF, generatePDF } from '../utils/pdfGenerator.js';
import { renderPortfolioTemplate } from '../templates/portfolioTemplates.js';
import { renderResumeTemplate } from '../templates/resumeTemplates.js';

// ===== EXPORT SCREEN =====
export async function ExportScreen(container, params) {
  const type = params.type || state.get('currentType');
  const templateId = params.templateId || state.get('currentTemplate');
  const itemId = params.itemId;

  let data = state.get('formData');

  if (itemId && !data) {
    const item = await storage.getItem(itemId);
    if (item) {
      data = item.data;
    }
  }

  container.innerHTML = `
    <div class="screen">
      <div class="container">
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <button class="btn btn-secondary" id="back-btn">← Back</button>
          <h2>Export & Share</h2>
          <div style="width: 100px;"></div>
        </div>

        <!-- Export Options -->
        <div class="grid-2 mb-4">
          <div class="card text-center">
            <div style="font-size: 3rem; margin-bottom: 1rem;">📥</div>
            <h3>Download PDF</h3>
            <p class="text-secondary mb-3">Save as high-quality PDF</p>
            <button class="btn btn-primary" id="download-btn">Download PDF</button>
          </div>

          <div class="card text-center">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🌐</div>
            <h3>Download HTML</h3>
            <p class="text-secondary mb-3">Save as web page</p>
            <button class="btn btn-outline" id="download-html-btn">Download HTML</button>
          </div>

          <div class="card text-center">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🔗</div>
            <h3>Share</h3>
            <p class="text-secondary mb-3">Share file or link</p>
            <button class="btn btn-outline" id="share-btn">Share</button>
          </div>
        </div>

        <!-- Preview (hidden, used for PDF generation) -->
        <div id="pdf-preview" style="position: absolute; left: -9999px; width: 1200px; background: white; padding: 2rem;">
            <div id="preview-content"></div>
        </div>

        <!-- Status Messages -->
        <div id="status-message" class="hidden"></div>
      </div>
    </div>
  `;

  // Render template for PDF
  const previewContent = document.getElementById('preview-content');
  if (type === 'portfolio') {
    renderPortfolioTemplate(previewContent, templateId, data);
  } else {
    renderResumeTemplate(previewContent, templateId, data);
  }

  // Download PDF
  document.getElementById('download-btn').addEventListener('click', async () => {
    try {
      const filename = `${data.name || 'document'}_${type}.pdf`;
      await downloadPDF('pdf-preview', filename);
      showStatus('✓ PDF downloaded successfully!', 'success');
    } catch (error) {
      showStatus('✗ Failed to generate PDF', 'error');
      console.error(error);
    }
  });

  // Download HTML
  document.getElementById('download-html-btn').addEventListener('click', () => {
    try {
      const htmlContent = generateHTML(previewContent.innerHTML, data.name || 'Resume');
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${data.name || 'document'}_${type}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showStatus('✓ HTML downloaded successfully!', 'success');
    } catch (error) {
      showStatus('✗ Failed to download HTML', 'error');
      console.error(error);
    }
  });

  // Share link/file
  document.getElementById('share-btn').addEventListener('click', async () => {
    try {
      const filename = `${data.name || 'document'}_${type}.pdf`;

      // Try to share PDF file if supported
      if (navigator.share && navigator.canShare) {
        const { blob } = await generatePDF('pdf-preview', filename);
        const file = new File([blob], filename, { type: 'application/pdf' });

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'My Resume/Portfolio',
            text: 'Check out my resume/portfolio!'
          });
          showStatus('✓ Shared successfully!', 'success');
          return;
        }
      }

      // Fallback to clipboard copy
      const shareUrl = window.location.href;
      await navigator.clipboard.writeText(shareUrl);
      showStatus('✓ Link copied! (Note: Local link only)', 'success');

    } catch (error) {
      console.error('Share failed:', error);
      // Fallback if share API fails or is cancelled
      const shareUrl = window.location.href;
      navigator.clipboard.writeText(shareUrl).then(() => {
        showStatus('✓ Link copied to clipboard!', 'success');
      });
    }
  });

  // Back button
  document.getElementById('back-btn').addEventListener('click', () => {
    router.navigate('/preview', { type, templateId, itemId });
  });

  function showStatus(message, type) {
    const statusEl = document.getElementById('status-message');
    statusEl.className = `card text-center ${type === 'success' ? 'text-success' : 'text-error'}`;
    statusEl.textContent = message;
    statusEl.classList.remove('hidden');

    setTimeout(() => {
      statusEl.classList.add('hidden');
    }, 3000);
  }

  function generateHTML(content, title) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body { margin: 0; padding: 0; background: #f0f2f5; min-height: 100vh; display: flex; justify-content: center; }
        .container { background: white; width: 100%; max-width: 1000px; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
        @media print { 
            body { background: white; display: block; } 
            .container { box-shadow: none; max-width: 100%; }
        }
    </style>
</head>
<body>
    <div class="container">
        ${content}
    </div>
</body>
</html>`;
  }
}
