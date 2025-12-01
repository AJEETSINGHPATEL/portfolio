import { router } from '../router.js';
import { state } from '../state.js';
import { storage } from '../storage.js';

// Import all templates (will be created)
import { renderPortfolioTemplate } from '../templates/portfolioTemplates.js';
import { renderResumeTemplate } from '../templates/resumeTemplates.js';

// ===== PREVIEW SCREEN =====
export async function PreviewScreen(container, params) {
    const type = params.type || state.get('currentType');
    const templateId = params.templateId || state.get('currentTemplate');
    const itemId = params.itemId;

    let data = state.get('formData');

    // Load from storage if itemId provided
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
          <button class="btn btn-secondary" id="back-btn">← Edit</button>
          <h2>Preview</h2>
          <button class="btn btn-primary" id="export-btn">Export PDF →</button>
        </div>

        <!-- Preview Container -->
        <div class="card" style="background: white; padding: 2rem;">
          <div id="preview-content"></div>
        </div>
      </div>
    </div>
  `;

    // Render template
    const previewContent = document.getElementById('preview-content');
    if (type === 'portfolio') {
        renderPortfolioTemplate(previewContent, templateId, data);
    } else {
        renderResumeTemplate(previewContent, templateId, data);
    }

    // Event listeners
    document.getElementById('back-btn').addEventListener('click', () => {
        router.navigate('/form', { type, templateId, itemId });
    });

    document.getElementById('export-btn').addEventListener('click', () => {
        router.navigate('/export', { type, templateId, itemId });
    });
}
