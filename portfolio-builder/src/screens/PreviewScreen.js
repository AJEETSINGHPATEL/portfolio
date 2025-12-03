import { router } from '../router.js';
import { state } from '../state.js';
import { storage } from '../storage.js';

// Import all templates
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
        <div class="flex items-center justify-between mb-4 sticky-header">
          <button class="btn btn-secondary" id="back-btn">← Edit</button>
          <h2 class="text-lg font-bold">Preview</h2>
          <button class="btn btn-primary" id="export-btn">Export →</button>
        </div>

        <!-- Preview Container -->
        <div class="preview-wrapper" style="background: #525659; padding: 1rem; overflow: hidden; min-height: calc(100vh - 80px);">
          <div id="scale-container" style="transform-origin: top center; transition: transform 0.3s ease;">
            <div id="preview-content" style="background: white; box-shadow: 0 0 20px rgba(0,0,0,0.3); margin: 0 auto;"></div>
          </div>
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

  // Scaling Logic
  function applyScaling() {
    const scaleContainer = document.getElementById('scale-container');
    const content = document.getElementById('preview-content');
    const wrapper = document.querySelector('.preview-wrapper');

    if (!scaleContainer || !content || !wrapper) return;

    // Force desktop width
    content.style.width = '1000px'; // Standard desktop width

    // Calculate scale
    const availableWidth = wrapper.clientWidth - 32; // - padding
    const contentWidth = 1000;
    const scale = Math.min(1, availableWidth / contentWidth);

    scaleContainer.style.transform = `scale(${scale})`;
    scaleContainer.style.width = '1000px';

    // Adjust height of container to fit scaled content
    const scaledHeight = content.scrollHeight * scale;
    scaleContainer.style.height = `${content.scrollHeight}px`; // Keep original height for flow
    wrapper.style.height = `${scaledHeight + 40}px`; // Adjust wrapper

    // Center it
    const marginLeft = (availableWidth - (contentWidth * scale)) / 2;
    scaleContainer.style.marginLeft = `${Math.max(0, marginLeft)}px`;
  }

  // Initial scale
  setTimeout(applyScaling, 100);

  // Resize listener
  window.addEventListener('resize', applyScaling);

  // Event listeners
  document.getElementById('back-btn').addEventListener('click', () => {
    window.removeEventListener('resize', applyScaling);
    router.navigate('/form', { type, templateId, itemId });
  });

  document.getElementById('export-btn').addEventListener('click', () => {
    window.removeEventListener('resize', applyScaling);
    router.navigate('/export', { type, templateId, itemId });
  });
}
