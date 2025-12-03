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
    premium: renderPremiumResume,
    'modern-professional': renderModernProfessionalResume
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
      @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400&family=Open+Sans:wght@300;400;600;700&display=swap');
      
      .premium-resume { 
        font-family: 'Open Sans', sans-serif; 
        color: #333; 
        max-width: 1000px; 
        margin: 0 auto; 
        background: white;
        display: grid;
        grid-template-columns: 320px 1fr;
        min-height: 100vh;
        box-shadow: 0 0 20px rgba(0,0,0,0.1);
      }
      
      /* Sidebar */
      .premium-sidebar {
        background: #0f172a;
        color: white;
        padding: 3rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
      }
      
      .profile-img-container {
        width: 180px;
        height: 180px;
        margin: 0 auto;
        border-radius: 50%;
        border: 4px solid #d4af37;
        overflow: hidden;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      }
      
      .profile-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .sidebar-section h3 {
        color: #d4af37;
        font-family: 'Merriweather', serif;
        font-size: 1.2rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        border-bottom: 1px solid rgba(212, 175, 55, 0.3);
        padding-bottom: 0.5rem;
        margin-bottom: 1rem;
      }
      
      .contact-item {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        margin-bottom: 0.8rem;
        font-size: 0.9rem;
        word-break: break-word;
      }
      
      .skill-tag {
        display: inline-block;
        background: rgba(255,255,255,0.1);
        padding: 0.3rem 0.8rem;
        border-radius: 4px;
        margin: 0.2rem;
        font-size: 0.85rem;
      }
      
      .edu-item {
        margin-bottom: 1.2rem;
      }
      
      .edu-degree {
        font-weight: 600;
        color: white;
        font-size: 1rem;
      }
      
      .edu-school {
        color: #94a3b8;
        font-size: 0.9rem;
        font-style: italic;
      }
      
      /* Main Content */
      .premium-main {
        padding: 4rem 3rem;
        background: #fff;
      }
      
      .header-name {
        font-family: 'Merriweather', serif;
        font-size: 3.5rem;
        color: #0f172a;
        line-height: 1.1;
        margin-bottom: 0.5rem;
      }
      
      .header-title {
        font-size: 1.4rem;
        color: #d4af37;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 3rem;
      }
      
      .main-section {
        margin-bottom: 3rem;
      }
      
      .main-section h2 {
        font-family: 'Merriweather', serif;
        font-size: 1.8rem;
        color: #0f172a;
        border-bottom: 2px solid #e2e8f0;
        padding-bottom: 0.5rem;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      
      .main-section h2::before {
        content: '';
        display: block;
        width: 8px;
        height: 8px;
        background: #d4af37;
        transform: rotate(45deg);
      }
      
      .exp-item {
        margin-bottom: 2rem;
        position: relative;
        padding-left: 1.5rem;
        border-left: 2px solid #f1f5f9;
      }
      
      .exp-item::before {
        content: '';
        position: absolute;
        left: -6px;
        top: 6px;
        width: 10px;
        height: 10px;
        background: #d4af37;
        border-radius: 50%;
      }
      
      .exp-role {
        font-size: 1.3rem;
        font-weight: 700;
        color: #0f172a;
      }
      
      .exp-company {
        font-size: 1rem;
        color: #64748b;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }
      
      .exp-date {
        font-size: 0.9rem;
        color: #94a3b8;
        font-style: italic;
        margin-bottom: 0.8rem;
      }
      
      .exp-desc {
        color: #475569;
        line-height: 1.7;
      }
      
      /* Print adjustments */
      @media print {
        .premium-resume {
          box-shadow: none;
          max-width: 100%;
          grid-template-columns: 280px 1fr;
        }
        .premium-sidebar {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    </style>
    
    <div class="premium-resume">
      <!-- Sidebar -->
      <aside class="premium-sidebar">
        ${data.profileImage ? `
          <div class="profile-img-container">
            <img src="${data.profileImage}" alt="${data.name}" class="profile-img">
          </div>
        ` : ''}
        
        <div class="sidebar-section">
          <h3>Contact</h3>
          ${data.email ? `<div class="contact-item">✉ ${data.email}</div>` : ''}
          ${data.phone ? `<div class="contact-item">📞 ${data.phone}</div>` : ''}
          ${data.location ? `<div class="contact-item">📍 ${data.location}</div>` : ''}
          ${data.website ? `<div class="contact-item">🌐 ${data.website}</div>` : ''}
        </div>
        
        ${data.skills && data.skills.length ? `
          <div class="sidebar-section">
            <h3>Skills</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
              ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
          </div>
        ` : ''}
        
        ${data.education && data.education.length ? `
          <div class="sidebar-section">
            <h3>Education</h3>
            ${data.education.map(edu => `
              <div class="edu-item">
                <div class="edu-degree">${edu.degree || ''}</div>
                <div class="edu-school">${edu.institution || ''}</div>
                <div style="color: #94a3b8; font-size: 0.85rem;">${edu.year || ''}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${data.languages && data.languages.length ? `
          <div class="sidebar-section">
            <h3>Languages</h3>
            ${data.languages.map(lang => `<div class="contact-item">• ${lang}</div>`).join('')}
          </div>
        ` : ''}
      </aside>
      
      <!-- Main Content -->
      <main class="premium-main">
        <header>
          <h1 class="header-name">${data.name || 'YOUR NAME'}</h1>
          <div class="header-title">${data.title || 'PROFESSIONAL TITLE'}</div>
        </header>
        
        ${data.about ? `
          <section class="main-section">
            <h2>Profile</h2>
            <p style="line-height: 1.8; color: #475569; font-size: 1.05rem;">${data.about}</p>
          </section>
        ` : ''}
        
        ${data.experience && data.experience.length ? `
          <section class="main-section">
            <h2>Experience</h2>
            ${data.experience.map(exp => `
              <div class="exp-item">
                <div class="exp-role">${exp.title || ''}</div>
                <div class="exp-company">${exp.company || ''}</div>
                <div class="exp-date">${exp.startDate || ''} - ${exp.endDate || ''}</div>
                <div class="exp-desc">${exp.description || ''}</div>
              </div>
            `).join('')}
          </section>
        ` : ''}
        
        ${data.projects && data.projects.length ? `
          <section class="main-section">
            <h2>Projects</h2>
            ${data.projects.map(proj => `
              <div class="exp-item">
                <div class="exp-role">${proj.name || ''}</div>
                ${proj.link ? `<a href="${proj.link}" style="color: #d4af37; font-size: 0.9rem; text-decoration: none;">${proj.link}</a>` : ''}
                <div class="exp-desc" style="margin-top: 0.5rem;">${proj.description || ''}</div>
              </div>
            `).join('')}
          </section>
        ` : ''}
        
        ${data.certifications && data.certifications.length ? `
          <section class="main-section">
            <h2>Certifications</h2>
            <ul style="padding-left: 1.5rem; color: #475569;">
              ${data.certifications.map(cert => `<li style="margin-bottom: 0.5rem;">${cert}</li>`).join('')}
            </ul>
          </section>
        ` : ''}
      </main>
    </div>
  `;
}

function renderModernProfessionalResume(container, data) {
  container.innerHTML = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
      
      .modern-pro-resume {
        font-family: 'Inter', sans-serif;
        color: #1e293b;
        max-width: 1000px;
        margin: 0 auto;
        background: white;
        line-height: 1.6;
      }

      .mp-header {
        display: flex;
        align-items: center;
        gap: 2rem;
        padding-bottom: 2rem;
        border-bottom: 2px solid #e2e8f0;
        margin-bottom: 2rem;
      }

      .mp-profile-img {
        width: 120px;
        height: 120px;
        border-radius: 12px;
        object-fit: cover;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }

      .mp-header-content {
        flex: 1;
      }

      .mp-name {
        font-size: 2.5rem;
        font-weight: 700;
        color: #0f172a;
        margin-bottom: 0.25rem;
        line-height: 1.2;
      }

      .mp-title {
        font-size: 1.25rem;
        color: #64748b;
        font-weight: 500;
        margin-bottom: 1rem;
      }

      .mp-contact {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        font-size: 0.9rem;
        color: #475569;
      }

      .mp-contact-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .mp-grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 3rem;
      }

      .mp-section {
        margin-bottom: 2.5rem;
      }

      .mp-section-title {
        font-size: 1.1rem;
        font-weight: 700;
        color: #0f172a;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        border-bottom: 2px solid #0f172a;
        padding-bottom: 0.5rem;
        margin-bottom: 1.5rem;
      }

      .mp-exp-item {
        margin-bottom: 2rem;
      }

      .mp-exp-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 0.5rem;
      }

      .mp-exp-role {
        font-weight: 600;
        font-size: 1.1rem;
        color: #0f172a;
      }

      .mp-exp-company {
        color: #64748b;
        font-weight: 500;
      }

      .mp-exp-date {
        font-size: 0.9rem;
        color: #94a3b8;
        font-weight: 500;
      }

      .mp-exp-desc {
        font-size: 0.95rem;
        color: #334155;
      }

      .mp-skill-tag {
        display: inline-block;
        background: #f1f5f9;
        color: #334155;
        padding: 0.25rem 0.75rem;
        border-radius: 6px;
        font-size: 0.85rem;
        font-weight: 500;
        margin: 0 0.5rem 0.5rem 0;
      }

      .mp-edu-item {
        margin-bottom: 1.5rem;
      }

      .mp-edu-degree {
        font-weight: 600;
        color: #0f172a;
      }

      .mp-edu-school {
        color: #64748b;
        font-size: 0.9rem;
      }

      .mp-edu-year {
        color: #94a3b8;
        font-size: 0.85rem;
      }

      @media print {
        .mp-grid {
          display: grid;
        }
      }
    </style>

    <div class="modern-pro-resume">
      <header class="mp-header">
        ${data.profileImage ? `<img src="${data.profileImage}" alt="${data.name}" class="mp-profile-img">` : ''}
        <div class="mp-header-content">
          <h1 class="mp-name">${data.name || 'YOUR NAME'}</h1>
          <div class="mp-title">${data.title || 'Professional Title'}</div>
          <div class="mp-contact">
            ${data.email ? `<div class="mp-contact-item">✉ ${data.email}</div>` : ''}
            ${data.phone ? `<div class="mp-contact-item">📞 ${data.phone}</div>` : ''}
            ${data.location ? `<div class="mp-contact-item">📍 ${data.location}</div>` : ''}
            ${data.website ? `<div class="mp-contact-item">🌐 ${data.website}</div>` : ''}
          </div>
        </div>
      </header>

      <div class="mp-grid">
        <!-- Main Column -->
        <div class="mp-main-col">
          ${data.about ? `
            <section class="mp-section">
              <h2 class="mp-section-title">Professional Summary</h2>
              <p style="color: #334155;">${data.about}</p>
            </section>
          ` : ''}

          ${data.experience && data.experience.length ? `
            <section class="mp-section">
              <h2 class="mp-section-title">Experience</h2>
              ${data.experience.map(exp => `
                <div class="mp-exp-item">
                  <div class="mp-exp-header">
                    <div>
                      <div class="mp-exp-role">${exp.title || ''}</div>
                      <div class="mp-exp-company">${exp.company || ''}</div>
                    </div>
                    <div class="mp-exp-date">${exp.startDate || ''} - ${exp.endDate || ''}</div>
                  </div>
                  <div class="mp-exp-desc">${exp.description || ''}</div>
                </div>
              `).join('')}
            </section>
          ` : ''}

          ${data.projects && data.projects.length ? `
            <section class="mp-section">
              <h2 class="mp-section-title">Projects</h2>
              ${data.projects.map(proj => `
                <div class="mp-exp-item">
                  <div class="mp-exp-role">${proj.name || ''}</div>
                  ${proj.link ? `<a href="${proj.link}" style="color: #2563eb; font-size: 0.9rem; text-decoration: none;">${proj.link}</a>` : ''}
                  <div class="mp-exp-desc" style="margin-top: 0.5rem;">${proj.description || ''}</div>
                </div>
              `).join('')}
            </section>
          ` : ''}
        </div>

        <!-- Sidebar Column -->
        <div class="mp-sidebar-col">
          ${data.skills && data.skills.length ? `
            <section class="mp-section">
              <h2 class="mp-section-title">Skills</h2>
              <div>
                ${data.skills.map(skill => `<span class="mp-skill-tag">${skill}</span>`).join('')}
              </div>
            </section>
          ` : ''}

          ${data.education && data.education.length ? `
            <section class="mp-section">
              <h2 class="mp-section-title">Education</h2>
              ${data.education.map(edu => `
                <div class="mp-edu-item">
                  <div class="mp-edu-degree">${edu.degree || ''}</div>
                  <div class="mp-edu-school">${edu.institution || ''}</div>
                  <div class="mp-edu-year">${edu.year || ''}</div>
                </div>
              `).join('')}
            </section>
          ` : ''}

          ${data.languages && data.languages.length ? `
            <section class="mp-section">
              <h2 class="mp-section-title">Languages</h2>
              ${data.languages.map(lang => `<div style="margin-bottom: 0.5rem; color: #334155;">• ${lang}</div>`).join('')}
            </section>
          ` : ''}
          
          ${data.certifications && data.certifications.length ? `
            <section class="mp-section">
              <h2 class="mp-section-title">Certifications</h2>
              ${data.certifications.map(cert => `<div style="margin-bottom: 0.5rem; color: #334155; font-size: 0.9rem;">• ${cert}</div>`).join('')}
            </section>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}
