import { router } from '../router.js';

// ===== SPLASH SCREEN =====
export function SplashScreen(container) {
    container.innerHTML = `
    <div class="screen flex flex-col items-center justify-center" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);">
      <div class="splash-content text-center">
        <div class="splash-logo mb-4">
          <div style="font-size: 4rem; animation: bounce 1s ease-in-out infinite;">📱</div>
        </div>
        <h1 class="text-gradient mb-2">Portfolio Builder</h1>
        <p class="text-secondary">Create stunning portfolios & resumes</p>
        <div class="loader mt-4"></div>
      </div>
    </div>
  `;

    // Add bounce animation
    const style = document.createElement('style');
    style.textContent = `
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
  `;
    document.head.appendChild(style);

    // Auto navigate to home after 2 seconds
    setTimeout(() => {
        router.navigate('/home');
    }, 2000);
}
