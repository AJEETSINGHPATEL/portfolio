import { router } from '../router.js';
import { storage } from '../storage.js';

// ===== HOME SCREEN =====
export async function HomeScreen(container) {
    const savedItems = await storage.getSavedItems();
    const portfolios = savedItems.filter(item => item.type === 'portfolio');
    const resumes = savedItems.filter(item => item.type === 'resume');

    container.innerHTML = `
    <div class="screen">
      <div class="container">
        <!-- Header -->
        <div class="text-center mb-4">
          <h1 class="text-gradient">Portfolio & Resume Builder</h1>
          <p class="text-secondary">Create professional portfolios and resumes in minutes</p>
        </div>

        <!-- Main Actions -->
        <div class="grid-2 mb-4">
          <div class="card" style="cursor: pointer;" data-action="create-portfolio">
            <div style="font-size: 3rem; text-align: center; margin-bottom: 1rem;">🎨</div>
            <h3 class="text-center">Create Portfolio</h3>
            <p class="text-center text-secondary">Showcase your work with beautiful templates</p>
          </div>
          
          <div class="card" style="cursor: pointer;" data-action="create-resume">
            <div style="font-size: 3rem; text-align: center; margin-bottom: 1rem;">📄</div>
            <h3 class="text-center">Create Resume</h3>
            <p class="text-center text-secondary">Professional resumes that stand out</p>
          </div>
        </div>

        <!-- Saved Items -->
        ${savedItems.length > 0 ? `
          <div class="mt-4">
            <h2 class="mb-3">Your Work</h2>
            
            ${portfolios.length > 0 ? `
              <div class="mb-4">
                <h3 class="mb-2">Portfolios (${portfolios.length})</h3>
                <div class="card-grid">
                  ${portfolios.slice(0, 3).map(item => `
                    <div class="card" style="cursor: pointer;" data-item-id="${item.id}">
                      <h4>${item.data.name || 'Untitled Portfolio'}</h4>
                      <p class="text-secondary">${new Date(item.updatedAt).toLocaleDateString()}</p>
                      <button class="btn btn-primary mt-2" data-edit="${item.id}">Edit</button>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
            
            ${resumes.length > 0 ? `
              <div class="mb-4">
                <h3 class="mb-2">Resumes (${resumes.length})</h3>
                <div class="card-grid">
                  ${resumes.slice(0, 3).map(item => `
                    <div class="card" style="cursor: pointer;" data-item-id="${item.id}">
                      <h4>${item.data.name || 'Untitled Resume'}</h4>
                      <p class="text-secondary">${new Date(item.updatedAt).toLocaleDateString()}</p>
                      <button class="btn btn-primary mt-2" data-edit="${item.id}">Edit</button>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        ` : `
          <div class="card text-center mt-4">
            <h3>No saved items yet</h3>
            <p class="text-secondary">Create your first portfolio or resume to get started</p>
          </div>
        `}

        <!-- Settings Button -->
        <div class="text-center mt-4">
          <button class="btn btn-secondary" data-action="settings">⚙️ Settings</button>
        </div>
      </div>
    </div>
  `;

    // Event listeners
    container.querySelector('[data-action="create-portfolio"]')?.addEventListener('click', () => {
        router.navigate('/templates', { type: 'portfolio' });
    });

    container.querySelector('[data-action="create-resume"]')?.addEventListener('click', () => {
        router.navigate('/templates', { type: 'resume' });
    });

    container.querySelector('[data-action="settings"]')?.addEventListener('click', () => {
        router.navigate('/settings');
    });

    // Edit buttons
    container.querySelectorAll('[data-edit]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const itemId = btn.dataset.edit;
            router.navigate('/form', { itemId });
        });
    });
}
