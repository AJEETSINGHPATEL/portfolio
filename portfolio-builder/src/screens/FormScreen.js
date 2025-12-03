import { router } from '../router.js';
import { state } from '../state.js';
import { storage, setupAutoSave } from '../storage.js';
import { compressImage } from '../utils/imageCompressor.js';

// ===== FORM SCREEN =====
export async function FormScreen(container, params) {
  const type = params.type || state.get('currentType');
  const templateId = params.templateId || state.get('currentTemplate');

  // Load existing data if editing
  let formData = {};
  let itemId = params.itemId;

  if (itemId) {
    const item = await storage.getItem(itemId);
    if (item) {
      formData = item.data;
    }
  }

  const isPortfolio = type === 'portfolio';

  container.innerHTML = `
    <div class="screen">
      <div class="container">
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <button class="btn btn-secondary" id="back-btn">← Back</button>
          <h2>${isPortfolio ? 'Portfolio' : 'Resume'} Details</h2>
          <button class="btn btn-primary" id="preview-btn">Preview →</button>
        </div>

        <form id="main-form" class="mb-4">
          <!-- Personal Info -->
          <div class="card mb-3">
            <h3 class="mb-3">Personal Information</h3>
            
            <div class="form-group">
              <label class="form-label">Full Name *</label>
              <input type="text" class="form-input" name="name" value="${formData.name || ''}" required>
            </div>

            <div class="form-group">
              <label class="form-label">${isPortfolio ? 'Tagline' : 'Professional Title'} *</label>
              <input type="text" class="form-input" name="title" value="${formData.title || ''}" placeholder="${isPortfolio ? 'e.g., Creative Designer & Developer' : 'e.g., Senior Software Engineer'}" required>
            </div>

            <div class="form-group">
              <label class="form-label">Email *</label>
              <input type="email" class="form-input" name="email" value="${formData.email || ''}" required>
            </div>

            <div class="form-group">
              <label class="form-label">Phone</label>
              <input type="tel" class="form-input" name="phone" value="${formData.phone || ''}">
            </div>

            <div class="form-group">
              <label class="form-label">Location</label>
              <input type="text" class="form-input" name="location" value="${formData.location || ''}" placeholder="City, Country">
            </div>

            <div class="form-group">
              <label class="form-label">Profile Image</label>
              <input type="file" class="form-input" id="profile-image" accept="image/*">
              ${formData.profileImage ? '<p class="text-success mt-1">✓ Image uploaded</p>' : ''}
            </div>
          </div>

          <!-- About/Summary -->
          <div class="card mb-3">
            <h3 class="mb-3">${isPortfolio ? 'About Me' : 'Professional Summary'}</h3>
            <div class="form-group">
              <textarea class="form-textarea" name="about" rows="5" placeholder="${isPortfolio ? 'Tell us about yourself...' : 'Brief professional summary...'}">${formData.about || ''}</textarea>
            </div>
          </div>

          <!-- Skills -->
          <div class="card mb-3">
            <h3 class="mb-3">Skills</h3>
            <div id="skills-container">
              ${(formData.skills || ['']).map((skill, i) => `
                <div class="form-group flex gap-2">
                  <input type="text" class="form-input" name="skills[]" value="${skill}" placeholder="e.g., JavaScript, Design, Marketing">
                  ${i > 0 ? '<button type="button" class="btn btn-secondary remove-skill">Remove</button>' : ''}
                </div>
              `).join('')}
            </div>
            <button type="button" class="btn btn-outline" id="add-skill">+ Add Skill</button>
          </div>

          <!-- Experience -->
          <div class="card mb-3">
            <h3 class="mb-3">Work Experience</h3>
            <div id="experience-container">
              ${(formData.experience || [{}]).map((exp, i) => `
                <div class="experience-item mb-3" style="padding: 1rem; background: var(--bg-tertiary); border-radius: var(--radius-md);">
                  <div class="form-group">
                    <label class="form-label">Job Title</label>
                    <input type="text" class="form-input" name="experience[${i}][title]" value="${exp.title || ''}" placeholder="e.g., Senior Developer">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Company</label>
                    <input type="text" class="form-input" name="experience[${i}][company]" value="${exp.company || ''}" placeholder="e.g., Tech Corp">
                  </div>
                  <div class="grid-2">
                    <div class="form-group">
                      <label class="form-label">Start Date</label>
                      <input type="text" class="form-input" name="experience[${i}][startDate]" value="${exp.startDate || ''}" placeholder="e.g., Jan 2020">
                    </div>
                    <div class="form-group">
                      <label class="form-label">End Date</label>
                      <input type="text" class="form-input" name="experience[${i}][endDate]" value="${exp.endDate || ''}" placeholder="e.g., Present">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea class="form-textarea" name="experience[${i}][description]" rows="3" placeholder="Key responsibilities and achievements...">${exp.description || ''}</textarea>
                  </div>
                  ${i > 0 ? '<button type="button" class="btn btn-secondary remove-experience">Remove Experience</button>' : ''}
                </div>
              `).join('')}
            </div>
            <button type="button" class="btn btn-outline" id="add-experience">+ Add Experience</button>
          </div>

          <!-- Education -->
          <div class="card mb-3">
            <h3 class="mb-3">Education</h3>
            <div id="education-container">
              ${(formData.education || [{}]).map((edu, i) => `
                <div class="education-item mb-3" style="padding: 1rem; background: var(--bg-tertiary); border-radius: var(--radius-md);">
                  <div class="form-group">
                    <label class="form-label">Degree</label>
                    <input type="text" class="form-input" name="education[${i}][degree]" value="${edu.degree || ''}" placeholder="e.g., Bachelor of Science">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Institution</label>
                    <input type="text" class="form-input" name="education[${i}][institution]" value="${edu.institution || ''}" placeholder="e.g., University Name">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Year</label>
                    <input type="text" class="form-input" name="education[${i}][year]" value="${edu.year || ''}" placeholder="e.g., 2020">
                  </div>
                  ${i > 0 ? '<button type="button" class="btn btn-secondary remove-education">Remove</button>' : ''}
                </div>
              `).join('')}
            </div>
            <button type="button" class="btn btn-outline" id="add-education">+ Add Education</button>
          </div>

          ${isPortfolio ? `
            <!-- Projects (Portfolio only) -->
            <div class="card mb-3">
              <h3 class="mb-3">Projects</h3>
              <div id="projects-container">
                ${(formData.projects || [{}]).map((proj, i) => `
                  <div class="project-item mb-3" style="padding: 1rem; background: var(--bg-tertiary); border-radius: var(--radius-md);">
                    <div class="form-group">
                      <label class="form-label">Project Name</label>
                      <input type="text" class="form-input" name="projects[${i}][name]" value="${proj.name || ''}" placeholder="e.g., E-commerce Website">
                    </div>
                    <div class="form-group">
                      <label class="form-label">Description</label>
                      <textarea class="form-textarea" name="projects[${i}][description]" rows="3" placeholder="Project details...">${proj.description || ''}</textarea>
                    </div>
                    <div class="form-group">
                      <label class="form-label">Link</label>
                      <input type="url" class="form-input" name="projects[${i}][link]" value="${proj.link || ''}" placeholder="https://...">
                    </div>
                    ${i > 0 ? '<button type="button" class="btn btn-secondary remove-project">Remove Project</button>' : ''}
                  </div>
                `).join('')}
              </div>
              <button type="button" class="btn btn-outline" id="add-project">+ Add Project</button>
            </div>
          ` : ''}

          <!-- Social Links -->
          <div class="card mb-3">
            <h3 class="mb-3">Social Links</h3>
            <div class="form-group">
              <label class="form-label">LinkedIn</label>
              <input type="url" class="form-input" name="linkedin" value="${formData.linkedin || ''}" placeholder="https://linkedin.com/in/...">
            </div>
            <div class="form-group">
              <label class="form-label">GitHub</label>
              <input type="url" class="form-input" name="github" value="${formData.github || ''}" placeholder="https://github.com/...">
            </div>
            <div class="form-group">
              <label class="form-label">Website</label>
              <input type="url" class="form-input" name="website" value="${formData.website || ''}" placeholder="https://...">
            </div>
          </div>

          <!-- Save Button -->
          <div class="text-center">
            <button type="submit" class="btn btn-primary" style="min-width: 200px;">Save & Continue</button>
          </div>
        </form>
      </div>
    </div>
  `;

  // Get form element
  const form = document.getElementById('main-form');

  // Auto-save setup
  const autoSave = setupAutoSave(() => ({
    id: itemId,
    formData: getFormData()
  }));

  form.addEventListener('input', autoSave);

  // Profile image upload
  document.getElementById('profile-image').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file) {
      const compressed = await compressImage(file);
      formData.profileImage = compressed.dataUrl;
    }
  });

  // Dynamic field handlers
  document.getElementById('add-skill')?.addEventListener('click', () => {
    const container = document.getElementById('skills-container');
    const div = document.createElement('div');
    div.className = 'form-group flex gap-2';
    div.innerHTML = `
      <input type="text" class="form-input" name="skills[]" placeholder="e.g., JavaScript">
      <button type="button" class="btn btn-secondary remove-skill">Remove</button>
    `;
    container.appendChild(div);
    attachRemoveHandlers();
  });

  document.getElementById('add-experience')?.addEventListener('click', () => {
    const container = document.getElementById('experience-container');
    const count = container.children.length;
    const div = document.createElement('div');
    div.className = 'experience-item mb-3';
    div.style.cssText = 'padding: 1rem; background: var(--bg-tertiary); border-radius: var(--radius-md);';
    div.innerHTML = `
      <div class="form-group">
        <label class="form-label">Job Title</label>
        <input type="text" class="form-input" name="experience[${count}][title]" placeholder="e.g., Senior Developer">
      </div>
      <div class="form-group">
        <label class="form-label">Company</label>
        <input type="text" class="form-input" name="experience[${count}][company]" placeholder="e.g., Tech Corp">
      </div>
      <div class="grid-2">
        <div class="form-group">
          <label class="form-label">Start Date</label>
          <input type="text" class="form-input" name="experience[${count}][startDate]" placeholder="e.g., Jan 2020">
        </div>
        <div class="form-group">
          <label class="form-label">End Date</label>
          <input type="text" class="form-input" name="experience[${count}][endDate]" placeholder="e.g., Present">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Description</label>
        <textarea class="form-textarea" name="experience[${count}][description]" rows="3" placeholder="Key responsibilities..."></textarea>
      </div>
      <button type="button" class="btn btn-secondary remove-experience">Remove Experience</button>
    `;
    container.appendChild(div);
    attachRemoveHandlers();
  });

  document.getElementById('add-education')?.addEventListener('click', () => {
    const container = document.getElementById('education-container');
    const count = container.children.length;
    const div = document.createElement('div');
    div.className = 'education-item mb-3';
    div.style.cssText = 'padding: 1rem; background: var(--bg-tertiary); border-radius: var(--radius-md);';
    div.innerHTML = `
      <div class="form-group">
        <label class="form-label">Degree</label>
        <input type="text" class="form-input" name="education[${count}][degree]" placeholder="e.g., Bachelor of Science">
      </div>
      <div class="form-group">
        <label class="form-label">Institution</label>
        <input type="text" class="form-input" name="education[${count}][institution]" placeholder="e.g., University Name">
      </div>
      <div class="form-group">
        <label class="form-label">Year</label>
        <input type="text" class="form-input" name="education[${count}][year]" placeholder="e.g., 2020">
      </div>
      <button type="button" class="btn btn-secondary remove-education">Remove</button>
    `;
    container.appendChild(div);
    attachRemoveHandlers();
  });

  document.getElementById('add-project')?.addEventListener('click', () => {
    const container = document.getElementById('projects-container');
    const count = container.children.length;
    const div = document.createElement('div');
    div.className = 'project-item mb-3';
    div.style.cssText = 'padding: 1rem; background: var(--bg-tertiary); border-radius: var(--radius-md);';
    div.innerHTML = `
      <div class="form-group">
        <label class="form-label">Project Name</label>
        <input type="text" class="form-input" name="projects[${count}][name]" placeholder="e.g., E-commerce Website">
      </div>
      <div class="form-group">
        <label class="form-label">Description</label>
        <textarea class="form-textarea" name="projects[${count}][description]" rows="3" placeholder="Project details..."></textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Link</label>
        <input type="url" class="form-input" name="projects[${count}][link]" placeholder="https://...">
      </div>
      <button type="button" class="btn btn-secondary remove-project">Remove Project</button>
    `;
    container.appendChild(div);
    attachRemoveHandlers();
  });

  function attachRemoveHandlers() {
    container.querySelectorAll('.remove-skill').forEach(btn => {
      btn.addEventListener('click', () => btn.parentElement.remove());
    });
    container.querySelectorAll('.remove-experience').forEach(btn => {
      btn.addEventListener('click', () => btn.closest('.experience-item').remove());
    });
    container.querySelectorAll('.remove-education').forEach(btn => {
      btn.addEventListener('click', () => btn.closest('.education-item').remove());
    });
    container.querySelectorAll('.remove-project').forEach(btn => {
      btn.addEventListener('click', () => btn.closest('.project-item').remove());
    });
  }

  attachRemoveHandlers();

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = getFormData();

    if (!itemId) {
      itemId = await storage.saveFormData(type, templateId, data);
    } else {
      await storage.updateItem(itemId, data);
    }

    state.update({ formData: data });
    router.navigate('/preview', { type, templateId, itemId });
  });

  // Back button
  document.getElementById('back-btn').addEventListener('click', () => {
    router.navigate('/templates', { type });
  });

  // Preview button
  document.getElementById('preview-btn').addEventListener('click', () => {
    const data = getFormData();
    state.update({ formData: data });
    router.navigate('/preview', { type, templateId, itemId });
  });

  // Helper to get form data
  function getFormData() {
    const rawFormData = new FormData(form);
    const data = {};

    // Simple fields
    for (const [key, value] of rawFormData.entries()) {
      if (!key.includes('[')) {
        data[key] = value;
      }
    }

    // Skills array
    data.skills = Array.from(form.querySelectorAll('input[name="skills[]"]'))
      .map(input => input.value)
      .filter(v => v.trim());

    // Experience array
    data.experience = [];
    const expItems = form.querySelectorAll('.experience-item');
    expItems.forEach((item, i) => {
      data.experience.push({
        title: item.querySelector(`[name="experience[${i}][title]"]`)?.value || '',
        company: item.querySelector(`[name="experience[${i}][company]"]`)?.value || '',
        startDate: item.querySelector(`[name="experience[${i}][startDate]"]`)?.value || '',
        endDate: item.querySelector(`[name="experience[${i}][endDate]"]`)?.value || '',
        description: item.querySelector(`[name="experience[${i}][description]"]`)?.value || ''
      });
    });

    // Education array
    data.education = [];
    const eduItems = form.querySelectorAll('.education-item');
    eduItems.forEach((item, i) => {
      data.education.push({
        degree: item.querySelector(`[name="education[${i}][degree]"]`)?.value || '',
        institution: item.querySelector(`[name="education[${i}][institution]"]`)?.value || '',
        year: item.querySelector(`[name="education[${i}][year]"]`)?.value || ''
      });
    });

    // Projects array (portfolio only)
    if (isPortfolio) {
      data.projects = [];
      const projItems = form.querySelectorAll('.project-item');
      projItems.forEach((item, i) => {
        data.projects.push({
          name: item.querySelector(`[name="projects[${i}][name]"]`)?.value || '',
          description: item.querySelector(`[name="projects[${i}][description]"]`)?.value || '',
          link: item.querySelector(`[name="projects[${i}][link]"]`)?.value || ''
        });
      });
    }

    // Add profile image if exists (from outer scope)
    if (formData.profileImage) {
      data.profileImage = formData.profileImage;
    }

    return data;
  }
}
