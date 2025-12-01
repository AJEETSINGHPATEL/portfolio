// ===== RESUME TEMPLATES =====

export function renderResumeTemplate(container, templateId, data) {
    const templates = {
        ats: renderATSResume,
        creative: renderCreativeResume,
        'minimal-resume': renderMinimalResume,
        corporate: renderCorporateResume,
        bold: renderBoldResume,
        'two-column': renderTwoColumnResume,
        classic: renderClassicResume,
        technical: renderTechnicalResume,
        freshers: renderFreshersResume,
        premium: renderPremiumResume
    };

    const renderer = templates[templateId] || templates.ats;
    renderer(container, data);
}

// 1. ATS-Friendly Resume
function renderATSResume(container, data) {
    container.innerHTML = `
    <style>
      .ats-resume { font-family: Arial, sans-serif; color: #000; max-width: 800px; margin: 0 auto; line-height: 1.6; }
      .ats-resume h1 { font-size: 24pt; margin-bottom: 5px; }
      .ats-resume h2 { font-size: 14pt; border-bottom: 1px solid #000; margin-top: 15px; margin-bottom: 10px; }
      .ats-resume .section { margin-bottom: 15px; }
      .ats-resume .job-title { font-weight: bold; }
      .ats-resume .company { font-style: italic; }
    </style>
    <div class="ats-resume">
      <h1>${data.name || 'YOUR NAME'}</h1>
      <p>${data.title || 'Professional Title'}</p>
      <p>${data.email || ''} | ${data.phone || ''} | ${data.location || ''}</p>

      ${data.about ? `
        <div class="section">
          <h2>PROFESSIONAL SUMMARY</h2>
          <p>${data.about}</p>
        </div>
      ` : ''}

      ${data.skills && data.skills.length ? `
        <div class="section">
          <h2>SKILLS</h2>
          <p>${data.skills.join(' • ')}</p>
        </div>
      ` : ''}

      ${data.experience && data.experience.length ? `
        <div class="section">
          <h2>WORK EXPERIENCE</h2>
          ${data.experience.map(exp => `
            <div style="margin-bottom: 10px;">
              <p class="job-title">${exp.title || ''}</p>
              <p class="company">${exp.company || ''} | ${exp.startDate || ''} - ${exp.endDate || ''}</p>
              <p>${exp.description || ''}</p>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.education && data.education.length ? `
        <div class="section">
          <h2>EDUCATION</h2>
          ${data.education.map(edu => `
            <p><strong>${edu.degree || ''}</strong> - ${edu.institution || ''} (${edu.year || ''})</p>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

// 2. Creative Resume
function renderCreativeResume(container, data) {
    container.innerHTML = `
    <style>
      .creative-resume { font-family: 'Arial', sans-serif; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 2rem; }
      .creative-resume .content { background: white; padding: 2rem; border-radius: 15px; }
      .creative-resume h1 { font-size: 2.5rem; color: #f5576c; margin-bottom: 0.5rem; }
      .creative-resume h2 { color: #f093fb; font-size: 1.5rem; margin-top: 1.5rem; }
      .creative-resume .skill-bar { background: #f0f0f0; height: 10px; border-radius: 5px; margin: 0.5rem 0; overflow: hidden; }
      .creative-resume .skill-fill { background: linear-gradient(90deg, #f093fb, #f5576c); height: 100%; width: 80%; }
    </style>
    <div class="creative-resume">
      <div class="content">
        ${data.profileImage ? `<img src="${data.profileImage}" alt="${data.name}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 4px solid #f5576c; margin-bottom: 1rem;">` : ''}
        <h1>${data.name || 'Your Name'}</h1>
        <p style="font-size: 1.2rem; color: #666;">${data.title || 'Your Title'}</p>
        <p style="color: #888;">${data.email || ''} | ${data.phone || ''}</p>

        ${data.about ? `<div style="margin-top: 1.5rem;"><p>${data.about}</p></div>` : ''}

        ${data.skills && data.skills.length ? `
          <div>
            <h2>Skills</h2>
            ${data.skills.map(skill => `
              <div>
                <p style="margin-bottom: 0.25rem;">${skill}</p>
                <div class="skill-bar"><div class="skill-fill"></div></div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${data.experience && data.experience.length ? `
          <div>
            <h2>Experience</h2>
            ${data.experience.map(exp => `
              <div style="margin-bottom: 1rem;">
                <h3 style="color: #f5576c; margin-bottom: 0.25rem;">${exp.title || ''}</h3>
                <p style="color: #888;">${exp.company || ''} | ${exp.startDate || ''} - ${exp.endDate || ''}</p>
                <p>${exp.description || ''}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${data.education && data.education.length ? `
          <div>
            <h2>Education</h2>
            ${data.education.map(edu => `
              <p><strong>${edu.degree || ''}</strong> - ${edu.institution || ''} (${edu.year || ''})</p>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// 3. Minimal Resume
function renderMinimalResume(container, data) {
    container.innerHTML = `
    <style>
      .minimal-resume { font-family: 'Helvetica', sans-serif; color: #333; max-width: 800px; margin: 0 auto; }
      .minimal-resume h1 { font-size: 2rem; font-weight: 300; margin-bottom: 0.5rem; }
      .minimal-resume h2 { font-size: 1.2rem; font-weight: 600; margin-top: 2rem; margin-bottom: 1rem; }
      .minimal-resume .divider { height: 1px; background: #ddd; margin: 1rem 0; }
    </style>
    <div class="minimal-resume">
      <h1>${data.name || 'Your Name'}</h1>
      <p>${data.title || 'Your Title'}</p>
      <p style="color: #666;">${data.email || ''} • ${data.phone || ''} • ${data.location || ''}</p>
      <div class="divider"></div>

      ${data.about ? `<div><p>${data.about}</p><div class="divider"></div></div>` : ''}

      ${data.skills && data.skills.length ? `
        <div>
          <h2>Skills</h2>
          <p>${data.skills.join(', ')}</p>
        </div>
      ` : ''}

      ${data.experience && data.experience.length ? `
        <div>
          <h2>Experience</h2>
          ${data.experience.map(exp => `
            <div style="margin-bottom: 1rem;">
              <p><strong>${exp.title || ''}</strong> at ${exp.company || ''}</p>
              <p style="color: #666; font-size: 0.9rem;">${exp.startDate || ''} - ${exp.endDate || ''}</p>
              <p>${exp.description || ''}</p>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.education && data.education.length ? `
        <div>
          <h2>Education</h2>
          ${data.education.map(edu => `
            <p><strong>${edu.degree || ''}</strong> - ${edu.institution || ''} (${edu.year || ''})</p>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

// 4. Corporate Resume
function renderCorporateResume(container, data) {
    container.innerHTML = `
    <style>
      .corporate-resume { font-family: 'Times New Roman', serif; color: #1a1a1a; max-width: 850px; margin: 0 auto; }
      .corporate-resume h1 { font-size: 2.5rem; color: #003d82; border-bottom: 3px solid #003d82; padding-bottom: 0.5rem; }
      .corporate-resume h2 { color: #003d82; font-size: 1.3rem; margin-top: 1.5rem; text-transform: uppercase; }
      .corporate-resume .header-info { background: #f5f5f5; padding: 1rem; margin: 1rem 0; }
    </style>
    <div class="corporate-resume">
      <h1>${data.name || 'YOUR NAME'}</h1>
      <div class="header-info">
        <p><strong>${data.title || 'Professional Title'}</strong></p>
        <p>${data.email || ''} | ${data.phone || ''} | ${data.location || ''}</p>
      </div>

      ${data.about ? `
        <div>
          <h2>Executive Summary</h2>
          <p>${data.about}</p>
        </div>
      ` : ''}

      ${data.experience && data.experience.length ? `
        <div>
          <h2>Professional Experience</h2>
          ${data.experience.map(exp => `
            <div style="margin-bottom: 1.5rem;">
              <p><strong style="font-size: 1.1rem;">${exp.title || ''}</strong></p>
              <p style="font-style: italic;">${exp.company || ''} | ${exp.startDate || ''} - ${exp.endDate || ''}</p>
              <p>${exp.description || ''}</p>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.skills && data.skills.length ? `
        <div>
          <h2>Core Competencies</h2>
          <p>${data.skills.join(' • ')}</p>
        </div>
      ` : ''}

      ${data.education && data.education.length ? `
        <div>
          <h2>Education</h2>
          ${data.education.map(edu => `
            <p><strong>${edu.degree || ''}</strong> - ${edu.institution || ''} (${edu.year || ''})</p>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

// 5. Bold Header Resume
function renderBoldResume(container, data) {
    container.innerHTML = `
    <style>
      .bold-resume { font-family: Arial, sans-serif; }
      .bold-resume .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 3rem 2rem; text-align: center; }
      .bold-resume .header h1 { font-size: 3rem; margin-bottom: 0.5rem; }
      .bold-resume .content { padding: 2rem; max-width: 900px; margin: 0 auto; }
      .bold-resume h2 { color: #667eea; font-size: 1.5rem; margin-top: 2rem; border-left: 4px solid #667eea; padding-left: 1rem; }
    </style>
    <div class="bold-resume">
      <div class="header">
        ${data.profileImage ? `<img src="${data.profileImage}" alt="${data.name}" style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover; border: 5px solid white; margin-bottom: 1rem;">` : ''}
        <h1>${data.name || 'YOUR NAME'}</h1>
        <p style="font-size: 1.5rem;">${data.title || 'Your Title'}</p>
        <p>${data.email || ''} | ${data.phone || ''}</p>
      </div>
      <div class="content">
        ${data.about ? `<div><p style="font-size: 1.1rem; text-align: center; font-style: italic;">${data.about}</p></div>` : ''}

        ${data.experience && data.experience.length ? `
          <div>
            <h2>Experience</h2>
            ${data.experience.map(exp => `
              <div style="margin-bottom: 1.5rem;">
                <h3>${exp.title || ''}</h3>
                <p style="color: #666;">${exp.company || ''} | ${exp.startDate || ''} - ${exp.endDate || ''}</p>
                <p>${exp.description || ''}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${data.skills && data.skills.length ? `
          <div>
            <h2>Skills</h2>
            <p>${data.skills.join(' • ')}</p>
          </div>
        ` : ''}

        ${data.education && data.education.length ? `
          <div>
            <h2>Education</h2>
            ${data.education.map(edu => `
              <p><strong>${edu.degree || ''}</strong> - ${edu.institution || ''} (${edu.year || ''})</p>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// 6. Two-Column Resume
function renderTwoColumnResume(container, data) {
    container.innerHTML = `
    <style>
      .two-column-resume { display: grid; grid-template-columns: 250px 1fr; min-height: 100vh; }
      .two-column-resume .sidebar { background: #2c3e50; color: white; padding: 2rem 1.5rem; }
      .two-column-resume .main { padding: 2rem; }
      .two-column-resume .sidebar h2 { color: #3498db; font-size: 1.2rem; margin-top: 2rem; }
      .two-column-resume .main h1 { font-size: 2.5rem; color: #2c3e50; }
      .two-column-resume .main h2 { color: #3498db; margin-top: 2rem; }
    </style>
    <div class="two-column-resume">
      <div class="sidebar">
        ${data.profileImage ? `<img src="${data.profileImage}" alt="${data.name}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin-bottom: 1rem;">` : ''}
        
        <h2>Contact</h2>
        <p style="font-size: 0.9rem;">${data.email || ''}</p>
        <p style="font-size: 0.9rem;">${data.phone || ''}</p>
        <p style="font-size: 0.9rem;">${data.location || ''}</p>

        ${data.skills && data.skills.length ? `
          <div>
            <h2>Skills</h2>
            ${data.skills.map(skill => `<p style="font-size: 0.9rem; margin: 0.5rem 0;">• ${skill}</p>`).join('')}
          </div>
        ` : ''}

        ${data.education && data.education.length ? `
          <div>
            <h2>Education</h2>
            ${data.education.map(edu => `
              <div style="margin-bottom: 1rem;">
                <p style="font-size: 0.9rem; font-weight: bold;">${edu.degree || ''}</p>
                <p style="font-size: 0.85rem;">${edu.institution || ''}</p>
                <p style="font-size: 0.85rem;">${edu.year || ''}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
      
      <div class="main">
        <h1>${data.name || 'Your Name'}</h1>
        <p style="font-size: 1.3rem; color: #666;">${data.title || 'Your Title'}</p>

        ${data.about ? `
          <div style="margin-top: 2rem;">
            <h2>Profile</h2>
            <p>${data.about}</p>
          </div>
        ` : ''}

        ${data.experience && data.experience.length ? `
          <div>
            <h2>Experience</h2>
            ${data.experience.map(exp => `
              <div style="margin-bottom: 1.5rem;">
                <h3 style="color: #2c3e50;">${exp.title || ''}</h3>
                <p style="color: #666;">${exp.company || ''} | ${exp.startDate || ''} - ${exp.endDate || ''}</p>
                <p>${exp.description || ''}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// 7-10: Simplified versions (classic, technical, freshers, premium)
function renderClassicResume(container, data) {
    renderATSResume(container, data); // Use ATS as base
}

function renderTechnicalResume(container, data) {
    container.innerHTML = `
    <style>
      .tech-resume { font-family: 'Consolas', monospace; color: #333; max-width: 850px; margin: 0 auto; }
      .tech-resume h1 { font-size: 2rem; color: #0066cc; border-bottom: 2px solid #0066cc; }
      .tech-resume h2 { color: #0066cc; margin-top: 1.5rem; }
      .tech-resume code { background: #f5f5f5; padding: 0.2rem 0.5rem; border-radius: 3px; }
    </style>
    <div class="tech-resume">
      <h1>${data.name || 'Your Name'}</h1>
      <p><code>${data.title || 'Your Title'}</code></p>
      <p>${data.email || ''} | ${data.phone || ''}</p>
      ${data.about ? `<div style="margin-top: 1rem;"><p>${data.about}</p></div>` : ''}
      ${data.skills ? `<div><h2>Technical Skills</h2><p>${data.skills.map(s => `<code>${s}</code>`).join(' ')}</p></div>` : ''}
    </div>
  `;
}

function renderFreshersResume(container, data) {
    container.innerHTML = `
    <style>
      .freshers-resume { font-family: Arial, sans-serif; color: #333; max-width: 800px; margin: 0 auto; }
      .freshers-resume h1 { font-size: 2.5rem; color: #4CAF50; text-align: center; }
      .freshers-resume .tagline { text-align: center; font-size: 1.2rem; color: #666; margin-bottom: 2rem; }
      .freshers-resume h2 { color: #4CAF50; margin-top: 2rem; }
    </style>
    <div class="freshers-resume">
      <h1>${data.name || 'Your Name'}</h1>
      <p class="tagline">${data.title || 'Your Title'}</p>
      <p style="text-align: center;">${data.email || ''} | ${data.phone || ''}</p>
      ${data.about ? `<div style="margin-top: 2rem;"><h2>Objective</h2><p>${data.about}</p></div>` : ''}
      ${data.education ? `<div><h2>Education</h2>${data.education.map(edu => `<p><strong>${edu.degree || ''}</strong> - ${edu.institution || ''} (${edu.year || ''})</p>`).join('')}</div>` : ''}
      ${data.skills ? `<div><h2>Skills</h2><p>${data.skills.join(', ')}</p></div>` : ''}
    </div>
  `;
}

function renderPremiumResume(container, data) {
    container.innerHTML = `
    <style>
      .premium-resume { font-family: 'Georgia', serif; background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); padding: 3rem; }
      .premium-resume .content { background: white; padding: 3rem; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
      .premium-resume h1 { font-size: 3rem; color: #1e3c72; text-align: center; margin-bottom: 0.5rem; }
      .premium-resume .tagline { text-align: center; font-size: 1.5rem; color: #666; font-style: italic; margin-bottom: 2rem; }
      .premium-resume h2 { color: #2a5298; font-size: 1.8rem; margin-top: 2rem; border-bottom: 2px solid #2a5298; padding-bottom: 0.5rem; }
      .premium-resume .ornament { text-align: center; color: #2a5298; font-size: 2rem; margin: 1rem 0; }
    </style>
    <div class="premium-resume">
      <div class="content">
        <div class="ornament">◆</div>
        ${data.profileImage ? `<div style="text-align: center;"><img src="${data.profileImage}" alt="${data.name}" style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover; border: 4px solid #2a5298; margin-bottom: 1rem;"></div>` : ''}
        <h1>${data.name || 'Your Name'}</h1>
        <p class="tagline">${data.title || 'Your Title'}</p>
        <div class="ornament">◆</div>
        <p style="text-align: center; color: #666;">${data.email || ''} • ${data.phone || ''} • ${data.location || ''}</p>

        ${data.about ? `
          <div>
            <h2>Profile</h2>
            <p style="font-size: 1.1rem; line-height: 1.8;">${data.about}</p>
          </div>
        ` : ''}

        ${data.experience && data.experience.length ? `
          <div>
            <h2>Professional Experience</h2>
            ${data.experience.map(exp => `
              <div style="margin-bottom: 1.5rem;">
                <h3 style="color: #1e3c72;">${exp.title || ''}</h3>
                <p style="font-style: italic; color: #666;">${exp.company || ''} | ${exp.startDate || ''} - ${exp.endDate || ''}</p>
                <p>${exp.description || ''}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${data.skills && data.skills.length ? `
          <div>
            <h2>Expertise</h2>
            <p style="font-size: 1.1rem;">${data.skills.join(' • ')}</p>
          </div>
        ` : ''}

        ${data.education && data.education.length ? `
          <div>
            <h2>Education</h2>
            ${data.education.map(edu => `
              <p><strong style="color: #1e3c72;">${edu.degree || ''}</strong> - ${edu.institution || ''} (${edu.year || ''})</p>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  `;
}
