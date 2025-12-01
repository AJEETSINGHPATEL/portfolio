// ===== PORTFOLIO TEMPLATES =====

export function renderPortfolioTemplate(container, templateId, data) {
    const templates = {
        minimal: renderMinimalPortfolio,
        modern: renderModernPortfolio,
        elegant: renderElegantPortfolio,
        dark: renderDarkPortfolio,
        gradient: renderGradientPortfolio,
        business: renderBusinessPortfolio,
        animated: renderAnimatedPortfolio,
        developer: renderDeveloperPortfolio,
        designer: renderDesignerPortfolio,
        photo: renderPhotoPortfolio
    };

    const renderer = templates[templateId] || templates.minimal;
    renderer(container, data);
}

// 1. Minimal Template
function renderMinimalPortfolio(container, data) {
    container.innerHTML = `
    <style>
      .minimal-portfolio { font-family: 'Georgia', serif; color: #333; max-width: 800px; margin: 0 auto; }
      .minimal-portfolio h1 { font-size: 2.5rem; margin-bottom: 0.5rem; color: #000; }
      .minimal-portfolio .tagline { font-size: 1.2rem; color: #666; margin-bottom: 2rem; }
      .minimal-portfolio section { margin-bottom: 2rem; }
      .minimal-portfolio h2 { font-size: 1.5rem; border-bottom: 1px solid #ddd; padding-bottom: 0.5rem; margin-bottom: 1rem; }
      .minimal-portfolio .skill-tag { display: inline-block; padding: 0.25rem 0.75rem; background: #f5f5f5; margin: 0.25rem; border-radius: 3px; }
      .minimal-portfolio .experience-item { margin-bottom: 1.5rem; }
      .minimal-portfolio .project-card { margin-bottom: 1rem; padding: 1rem; border-left: 3px solid #000; }
    </style>
    <div class="minimal-portfolio">
      <header>
        ${data.profileImage ? `<img src="${data.profileImage}" alt="${data.name}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin-bottom: 1rem;">` : ''}
        <h1>${data.name || 'Your Name'}</h1>
        <p class="tagline">${data.title || 'Your Title'}</p>
        <p>${data.email || ''} ${data.phone ? '• ' + data.phone : ''} ${data.location ? '• ' + data.location : ''}</p>
      </header>

      ${data.about ? `
        <section>
          <h2>About</h2>
          <p>${data.about}</p>
        </section>
      ` : ''}

      ${data.skills && data.skills.length ? `
        <section>
          <h2>Skills</h2>
          <div>${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}</div>
        </section>
      ` : ''}

      ${data.experience && data.experience.length ? `
        <section>
          <h2>Experience</h2>
          ${data.experience.map(exp => `
            <div class="experience-item">
              <h3>${exp.title || ''}</h3>
              <p><strong>${exp.company || ''}</strong> • ${exp.startDate || ''} - ${exp.endDate || ''}</p>
              <p>${exp.description || ''}</p>
            </div>
          `).join('')}
        </section>
      ` : ''}

      ${data.projects && data.projects.length ? `
        <section>
          <h2>Projects</h2>
          ${data.projects.map(proj => `
            <div class="project-card">
              <h3>${proj.name || ''}</h3>
              <p>${proj.description || ''}</p>
              ${proj.link ? `<a href="${proj.link}" style="color: #000;">${proj.link}</a>` : ''}
            </div>
          `).join('')}
        </section>
      ` : ''}

      ${data.education && data.education.length ? `
        <section>
          <h2>Education</h2>
          ${data.education.map(edu => `
            <p><strong>${edu.degree || ''}</strong> - ${edu.institution || ''} (${edu.year || ''})</p>
          `).join('')}
        </section>
      ` : ''}

      ${(data.linkedin || data.github || data.website) ? `
        <section>
          <h2>Connect</h2>
          <p>
            ${data.linkedin ? `<a href="${data.linkedin}" style="color: #000; margin-right: 1rem;">LinkedIn</a>` : ''}
            ${data.github ? `<a href="${data.github}" style="color: #000; margin-right: 1rem;">GitHub</a>` : ''}
            ${data.website ? `<a href="${data.website}" style="color: #000;">Website</a>` : ''}
          </p>
        </section>
      ` : ''}
    </div>
  `;
}

// 2. Modern Template
function renderModernPortfolio(container, data) {
    container.innerHTML = `
    <style>
      .modern-portfolio { font-family: 'Arial', sans-serif; color: #1a1a1a; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 3rem; }
      .modern-portfolio .content { background: white; padding: 2rem; border-radius: 20px; }
      .modern-portfolio h1 { font-size: 3rem; font-weight: 900; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .modern-portfolio .tagline { font-size: 1.5rem; color: #666; font-weight: 600; }
      .modern-portfolio h2 { font-size: 2rem; color: #667eea; margin-top: 2rem; margin-bottom: 1rem; }
      .modern-portfolio .skill-badge { display: inline-block; padding: 0.5rem 1rem; background: linear-gradient(135deg, #667eea, #764ba2); color: white; margin: 0.5rem; border-radius: 25px; font-weight: 600; }
      .modern-portfolio .card { background: #f8f9fa; padding: 1.5rem; border-radius: 15px; margin-bottom: 1rem; border-left: 4px solid #667eea; }
    </style>
    <div class="modern-portfolio">
      <div class="content">
        ${data.profileImage ? `<img src="${data.profileImage}" alt="${data.name}" style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover; border: 5px solid #667eea; margin-bottom: 1rem;">` : ''}
        <h1>${data.name || 'Your Name'}</h1>
        <p class="tagline">${data.title || 'Your Title'}</p>
        <p style="color: #666;">${data.email || ''} | ${data.phone || ''} | ${data.location || ''}</p>

        ${data.about ? `<div style="margin-top: 2rem;"><p style="font-size: 1.1rem; line-height: 1.8;">${data.about}</p></div>` : ''}

        ${data.skills && data.skills.length ? `
          <div>
            <h2>Skills</h2>
            ${data.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
          </div>
        ` : ''}

        ${data.experience && data.experience.length ? `
          <div>
            <h2>Experience</h2>
            ${data.experience.map(exp => `
              <div class="card">
                <h3 style="color: #667eea; margin-bottom: 0.5rem;">${exp.title || ''}</h3>
                <p style="font-weight: 600;">${exp.company || ''} | ${exp.startDate || ''} - ${exp.endDate || ''}</p>
                <p>${exp.description || ''}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${data.projects && data.projects.length ? `
          <div>
            <h2>Projects</h2>
            ${data.projects.map(proj => `
              <div class="card">
                <h3 style="color: #764ba2;">${proj.name || ''}</h3>
                <p>${proj.description || ''}</p>
                ${proj.link ? `<a href="${proj.link}" style="color: #667eea; font-weight: 600;">${proj.link}</a>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${data.education && data.education.length ? `
          <div>
            <h2>Education</h2>
            ${data.education.map(edu => `
              <div class="card">
                <h3>${edu.degree || ''}</h3>
                <p>${edu.institution || ''} | ${edu.year || ''}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// 3. Elegant Template
function renderElegantPortfolio(container, data) {
    container.innerHTML = `
    <style>
      .elegant-portfolio { font-family: 'Garamond', serif; color: #2c2c2c; max-width: 900px; margin: 0 auto; background: #faf8f3; padding: 3rem; }
      .elegant-portfolio h1 { font-size: 3rem; color: #8b7355; text-align: center; margin-bottom: 0.5rem; letter-spacing: 2px; }
      .elegant-portfolio .tagline { text-align: center; font-size: 1.3rem; color: #666; font-style: italic; margin-bottom: 2rem; }
      .elegant-portfolio h2 { font-size: 1.8rem; color: #8b7355; border-bottom: 2px solid #d4af37; padding-bottom: 0.5rem; margin-top: 2rem; }
      .elegant-portfolio .ornament { text-align: center; color: #d4af37; font-size: 1.5rem; margin: 1rem 0; }
      .elegant-portfolio .skill-item { display: inline-block; padding: 0.4rem 1rem; border: 1px solid #8b7355; margin: 0.3rem; color: #8b7355; }
    </style>
    <div class="elegant-portfolio">
      <div class="ornament">✦</div>
      ${data.profileImage ? `<div style="text-align: center;"><img src="${data.profileImage}" alt="${data.name}" style="width: 140px; height: 140px; border-radius: 50%; object-fit: cover; border: 3px solid #d4af37; margin-bottom: 1rem;"></div>` : ''}
      <h1>${data.name || 'Your Name'}</h1>
      <p class="tagline">${data.title || 'Your Title'}</p>
      <div class="ornament">✦</div>
      <p style="text-align: center; color: #666;">${data.email || ''} • ${data.phone || ''} • ${data.location || ''}</p>

      ${data.about ? `
        <div style="margin-top: 2rem; text-align: center;">
          <p style="font-size: 1.1rem; line-height: 1.8; font-style: italic;">${data.about}</p>
        </div>
      ` : ''}

      ${data.skills && data.skills.length ? `
        <div>
          <h2>Expertise</h2>
          <div style="text-align: center;">${data.skills.map(skill => `<span class="skill-item">${skill}</span>`).join('')}</div>
        </div>
      ` : ''}

      ${data.experience && data.experience.length ? `
        <div>
          <h2>Professional Journey</h2>
          ${data.experience.map(exp => `
            <div style="margin-bottom: 1.5rem;">
              <h3 style="color: #8b7355;">${exp.title || ''}</h3>
              <p style="font-style: italic;">${exp.company || ''} | ${exp.startDate || ''} - ${exp.endDate || ''}</p>
              <p>${exp.description || ''}</p>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.projects && data.projects.length ? `
        <div>
          <h2>Portfolio</h2>
          ${data.projects.map(proj => `
            <div style="margin-bottom: 1.5rem;">
              <h3 style="color: #8b7355;">${proj.name || ''}</h3>
              <p>${proj.description || ''}</p>
              ${proj.link ? `<a href="${proj.link}" style="color: #d4af37;">${proj.link}</a>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.education && data.education.length ? `
        <div>
          <h2>Education</h2>
          ${data.education.map(edu => `
            <p><strong style="color: #8b7355;">${edu.degree || ''}</strong> - ${edu.institution || ''} (${edu.year || ''})</p>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

// 4. Dark Template
function renderDarkPortfolio(container, data) {
    container.innerHTML = `
    <style>
      .dark-portfolio { font-family: 'Arial', sans-serif; background: #0a0a0a; color: #e0e0e0; padding: 3rem; }
      .dark-portfolio h1 { font-size: 3rem; color: #00ff88; text-shadow: 0 0 20px rgba(0, 255, 136, 0.5); }
      .dark-portfolio .tagline { font-size: 1.3rem; color: #888; }
      .dark-portfolio h2 { font-size: 2rem; color: #00ff88; margin-top: 2rem; text-transform: uppercase; letter-spacing: 2px; }
      .dark-portfolio .skill-chip { display: inline-block; padding: 0.5rem 1rem; background: rgba(0, 255, 136, 0.1); border: 1px solid #00ff88; color: #00ff88; margin: 0.5rem; }
      .dark-portfolio .card { background: #1a1a1a; padding: 1.5rem; border-radius: 10px; margin-bottom: 1rem; border: 1px solid #333; }
    </style>
    <div class="dark-portfolio">
      ${data.profileImage ? `<img src="${data.profileImage}" alt="${data.name}" style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover; border: 3px solid #00ff88; margin-bottom: 1rem; box-shadow: 0 0 30px rgba(0, 255, 136, 0.3);">` : ''}
      <h1>${data.name || 'Your Name'}</h1>
      <p class="tagline">${data.title || 'Your Title'}</p>
      <p style="color: #666;">${data.email || ''} | ${data.phone || ''} | ${data.location || ''}</p>

      ${data.about ? `<div style="margin-top: 2rem;"><p style="font-size: 1.1rem; line-height: 1.8;">${data.about}</p></div>` : ''}

      ${data.skills && data.skills.length ? `
        <div>
          <h2>Skills</h2>
          ${data.skills.map(skill => `<span class="skill-chip">${skill}</span>`).join('')}
        </div>
      ` : ''}

      ${data.experience && data.experience.length ? `
        <div>
          <h2>Experience</h2>
          ${data.experience.map(exp => `
            <div class="card">
              <h3 style="color: #00ff88;">${exp.title || ''}</h3>
              <p style="color: #888;">${exp.company || ''} | ${exp.startDate || ''} - ${exp.endDate || ''}</p>
              <p>${exp.description || ''}</p>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.projects && data.projects.length ? `
        <div>
          <h2>Projects</h2>
          ${data.projects.map(proj => `
            <div class="card">
              <h3 style="color: #00ff88;">${proj.name || ''}</h3>
              <p>${proj.description || ''}</p>
              ${proj.link ? `<a href="${proj.link}" style="color: #00ff88;">${proj.link}</a>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.education && data.education.length ? `
        <div>
          <h2>Education</h2>
          ${data.education.map(edu => `
            <div class="card">
              <h3>${edu.degree || ''}</h3>
              <p style="color: #888;">${edu.institution || ''} | ${edu.year || ''}</p>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

// 5-10: Simplified versions for brevity (gradient, business, animated, developer, designer, photo)
function renderGradientPortfolio(container, data) {
    container.innerHTML = `
    <style>
      .gradient-portfolio { background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #f7b731); padding: 3rem; color: white; }
      .gradient-portfolio .content { background: rgba(255,255,255,0.95); color: #333; padding: 2rem; border-radius: 20px; }
      .gradient-portfolio h1 { font-size: 3rem; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    </style>
    <div class="gradient-portfolio">
      <div class="content">
        <h1>${data.name || 'Your Name'}</h1>
        <p style="font-size: 1.3rem; color: #666;">${data.title || 'Your Title'}</p>
        ${data.about ? `<p style="margin-top: 1rem;">${data.about}</p>` : ''}
        ${data.skills ? `<div style="margin-top: 1rem;"><strong>Skills:</strong> ${data.skills.join(', ')}</div>` : ''}
      </div>
    </div>
  `;
}

function renderBusinessPortfolio(container, data) {
    container.innerHTML = `
    <style>
      .business-portfolio { font-family: 'Times New Roman', serif; color: #1a1a1a; max-width: 850px; margin: 0 auto; padding: 2rem; }
      .business-portfolio h1 { font-size: 2.5rem; color: #003366; border-bottom: 3px solid #003366; padding-bottom: 0.5rem; }
      .business-portfolio h2 { color: #003366; margin-top: 2rem; }
    </style>
    <div class="business-portfolio">
      <h1>${data.name || 'Your Name'}</h1>
      <p style="font-size: 1.2rem; color: #666;">${data.title || 'Your Title'}</p>
      <p>${data.email || ''} | ${data.phone || ''}</p>
      ${data.about ? `<div style="margin-top: 2rem;"><h2>Profile</h2><p>${data.about}</p></div>` : ''}
    </div>
  `;
}

function renderAnimatedPortfolio(container, data) {
    renderModernPortfolio(container, data); // Use modern as base
}

function renderDeveloperPortfolio(container, data) {
    container.innerHTML = `
    <style>
      .dev-portfolio { font-family: 'Courier New', monospace; background: #1e1e1e; color: #d4d4d4; padding: 2rem; }
      .dev-portfolio h1 { color: #4ec9b0; font-size: 2rem; }
      .dev-portfolio .comment { color: #6a9955; }
    </style>
    <div class="dev-portfolio">
      <div class="comment">// Portfolio</div>
      <h1>const developer = "${data.name || 'Your Name'}";</h1>
      <p class="comment">// ${data.title || 'Your Title'}</p>
      ${data.about ? `<p style="margin-top: 1rem;">${data.about}</p>` : ''}
    </div>
  `;
}

function renderDesignerPortfolio(container, data) {
    renderElegantPortfolio(container, data); // Use elegant as base
}

function renderPhotoPortfolio(container, data) {
    container.innerHTML = `
    <style>
      .photo-portfolio { max-width: 1000px; margin: 0 auto; }
      .photo-portfolio .hero { text-align: center; padding: 3rem; background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%23ddd" width="100" height="100"/></svg>'); color: white; }
      .photo-portfolio h1 { font-size: 3rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); }
    </style>
    <div class="photo-portfolio">
      <div class="hero">
        ${data.profileImage ? `<img src="${data.profileImage}" alt="${data.name}" style="width: 200px; height: 200px; border-radius: 50%; object-fit: cover; margin-bottom: 1rem; border: 5px solid white;">` : ''}
        <h1>${data.name || 'Your Name'}</h1>
        <p style="font-size: 1.5rem;">${data.title || 'Your Title'}</p>
      </div>
      <div style="padding: 2rem;">
        ${data.about ? `<p style="font-size: 1.1rem; text-align: center;">${data.about}</p>` : ''}
      </div>
    </div>
  `;
}
