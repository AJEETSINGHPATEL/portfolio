import { router } from '../router.js';
import { state } from '../state.js';
import { storage } from '../storage.js';
import { downloadPDF } from '../utils/pdfGenerator.js';
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
            <div style="font-size: 3rem; margin-bottom: 1rem;">🔗</div>
            <h3>Share Link</h3>
            <p class="text-secondary mb-3">Generate shareable link</p>
            <button class="btn btn-outline" id="share-btn">Generate Link</button>
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

    // Share link
    document.getElementById('share-btn').addEventListener('click', () => {
        // For now, just copy current URL
        const shareUrl = window.location.href;
        navigator.clipboard.writeText(shareUrl).then(() => {
            showStatus('✓ Link copied to clipboard!', 'success');
        });
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
}
