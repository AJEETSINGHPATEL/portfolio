import { router } from '../router.js';
import { state } from '../state.js';

// Template metadata
const PORTFOLIO_TEMPLATES = [
    { id: 'minimal', name: 'Minimal', icon: '✨', description: 'Clean and simple' },
    { id: 'modern', name: 'Modern', icon: '🚀', description: 'Bold and contemporary' },
    { id: 'elegant', name: 'Elegant', icon: '💎', description: 'Sophisticated design' },
    { id: 'dark', name: 'Dark Theme', icon: '🌙', description: 'Sleek dark mode' },
    { id: 'gradient', name: 'Gradient', icon: '🌈', description: 'Colorful gradients' },
    { id: 'business', name: 'Business', icon: '💼', description: 'Professional corporate' },
    { id: 'animated', name: 'Animated', icon: '⚡', description: 'Dynamic effects' },
    { id: 'developer', name: 'Developer', icon: '💻', description: 'Tech-focused' },
    { id: 'designer', name: 'Designer', icon: '🎨', description: 'Creative showcase' },
    { id: 'photo', name: 'Photo Heavy', icon: '📸', description: 'Image-focused' }
];

const RESUME_TEMPLATES = [
    { id: 'ats', name: 'ATS Friendly', icon: '📋', description: 'Optimized for ATS' },
    { id: 'creative', name: 'Creative', icon: '🎭', description: 'Unique and artistic' },
    { id: 'minimal-resume', name: 'Minimal', icon: '📄', description: 'Simple and clean' },
    { id: 'corporate', name: 'Corporate', icon: '🏢', description: 'Traditional business' },
    { id: 'bold', name: 'Bold Header', icon: '💪', description: 'Strong visual impact' },
    { id: 'two-column', name: 'Two Column', icon: '📊', description: 'Sidebar layout' },
    { id: 'classic', name: 'Classic', icon: '📜', description: 'Timeless format' },
    { id: 'technical', name: 'Technical', icon: '⚙️', description: 'Tech industry' },
    { id: 'freshers', name: 'Freshers', icon: '🎓', description: 'Entry-level focus' },
    { id: 'premium', name: 'Premium', icon: '👑', description: 'Luxury design' }
];

// ===== TEMPLATE SELECTION SCREEN =====
export function TemplateSelectionScreen(container, params) {
    const type = params.type || 'portfolio';
    const templates = type === 'portfolio' ? PORTFOLIO_TEMPLATES : RESUME_TEMPLATES;

    state.set('currentType', type);

    container.innerHTML = `
    <div class="screen">
      <div class="container">
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <button class="btn btn-secondary" id="back-btn">← Back</button>
          <h2>${type === 'portfolio' ? 'Portfolio' : 'Resume'} Templates</h2>
          <div style="width: 100px;"></div>
        </div>

        <p class="text-center text-secondary mb-4">Choose a template to get started</p>

        <!-- Template Grid -->
        <div class="card-grid">
          ${templates.map(template => `
            <div class="card" style="cursor: pointer;" data-template="${template.id}">
              <div style="font-size: 3rem; text-align: center; margin-bottom: 1rem;">${template.icon}</div>
              <h3 class="text-center">${template.name}</h3>
              <p class="text-center text-secondary">${template.description}</p>
              <button class="btn btn-primary mt-2" style="width: 100%;">Select</button>
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
