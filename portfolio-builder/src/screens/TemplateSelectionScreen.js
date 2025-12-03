import { router } from '../router.js';
import { state } from '../state.js';

// Template metadata with colors for previews
const PORTFOLIO_TEMPLATES = [
  { id: 'minimal', name: 'Minimal', color: '#333', description: 'Clean and simple' },
  { id: 'modern', name: 'Modern', color: '#2563eb', description: 'Bold and contemporary' },
  { id: 'elegant', name: 'Elegant', color: '#7c3aed', description: 'Sophisticated design' },
  { id: 'dark', name: 'Dark Theme', color: '#1e293b', description: 'Sleek dark mode' },
  { id: 'gradient', name: 'Gradient', color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', description: 'Colorful gradients' },
  { id: 'business', name: 'Business', color: '#0f172a', description: 'Professional corporate' },
  { id: 'animated', name: 'Animated', color: '#f59e0b', description: 'Dynamic effects' },
  { id: 'developer', name: 'Developer', color: '#10b981', description: 'Tech-focused' },
  { id: 'designer', name: 'Designer', color: '#ec4899', description: 'Creative showcase' },
  { id: 'photo', name: 'Photo Heavy', color: '#6366f1', description: 'Image-focused' }
];

const RESUME_TEMPLATES = [
  { id: 'premium', name: 'Premium', color: '#0f172a', description: 'Luxury design (Recommended)', recommended: true },
  { id: 'modern-professional', name: 'Modern Pro', color: '#2c3e50', description: 'Clean & Professional', recommended: true },
  { id: 'ats', name: 'ATS Friendly', color: '#333', description: 'Optimized for ATS' },
  { id: 'creative', name: 'Creative', color: '#f5576c', description: 'Unique and artistic' },
  { id: 'minimal-resume', name: 'Minimal', color: '#475569', description: 'Simple and clean' },
  { id: 'corporate', name: 'Corporate', color: '#003d82', description: 'Traditional business' },
  { id: 'bold', name: 'Bold Header', color: '#764ba2', description: 'Strong visual impact' },
  { id: 'two-column', name: 'Two Column', color: '#2c3e50', description: 'Sidebar layout' },
  { id: 'classic', name: 'Classic', color: '#000', description: 'Timeless format' },
  { id: 'technical', name: 'Technical', color: '#0066cc', description: 'Tech industry' },
  { id: 'freshers', name: 'Freshers', color: '#4CAF50', description: 'Entry-level focus' }
];

// ===== TEMPLATE SELECTION SCREEN =====
export function TemplateSelectionScreen(container, params) {
  const type = params.type || 'portfolio';
  const templates = type === 'portfolio' ? PORTFOLIO_TEMPLATES : RESUME_TEMPLATES;

  state.set('currentType', type);

  container.innerHTML = `
    <div class="screen" style="background: #f8fafc;">
      <div class="container" style="max-width: 1200px;">
        <!-- Header -->
        <div class="flex items-center justify-between mb-8 pt-4">
          <button class="btn btn-secondary" id="back-btn">← Back</button>
          <div class="text-center">
            <h2 class="text-2xl font-bold text-slate-800">Choose a Template</h2>
            <p class="text-slate-500">Select a design to start building your ${type}</p>
          </div>
          <div style="width: 80px;"></div>
        </div>

        <!-- Template Grid -->
        <div class="template-grid">
          ${templates.map(template => `
            <div class="template-card ${template.recommended ? 'recommended' : ''}" data-template="${template.id}">
              ${template.recommended ? '<div class="badge-recommended">Most Popular</div>' : ''}
              
              <div class="preview-container">
                <div class="mini-preview" style="--theme-color: ${template.color.includes('gradient') ? '#333' : template.color}; --bg-gradient: ${template.color.includes('gradient') ? template.color : 'none'}">
                  <!-- Mini Document Structure -->
                  <div class="mini-header" style="background: ${template.color.includes('gradient') ? template.color : template.color}"></div>
                  <div class="mini-body">
                    <div class="mini-line w-3-4"></div>
                    <div class="mini-line w-1-2"></div>
                    <div class="mini-gap"></div>
                    <div class="mini-row">
                        <div class="mini-col-1"></div>
                        <div class="mini-col-2">
                            <div class="mini-line"></div>
                            <div class="mini-line"></div>
                            <div class="mini-line w-3-4"></div>
                        </div>
                    </div>
                    <div class="mini-gap"></div>
                    <div class="mini-line w-1-3"></div>
                    <div class="mini-line"></div>
                    <div class="mini-line"></div>
                  </div>
                </div>
                
                <div class="overlay">
                    <button class="btn btn-primary">Use This Template</button>
                </div>
              </div>
              
              <div class="template-info">
                <h3 class="font-bold text-slate-800">${template.name}</h3>
                <p class="text-sm text-slate-500">${template.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // Event listeners
  document.getElementById('back-btn').addEventListener('click', () => {
    router.navigate('/home');
  });

  container.querySelectorAll('[data-template]').forEach(card => {
    card.addEventListener('click', () => {
      const templateId = card.dataset.template;
      state.set('currentTemplate', templateId);
      router.navigate('/form', { type, templateId });
    });
  });
}

export { PORTFOLIO_TEMPLATES, RESUME_TEMPLATES };
