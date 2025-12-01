import './style.css';
import { router } from './router.js';
import { SplashScreen } from './screens/SplashScreen.js';
import { HomeScreen } from './screens/HomeScreen.js';
import { TemplateSelectionScreen } from './screens/TemplateSelectionScreen.js';
import { FormScreen } from './screens/FormScreen.js';
import { PreviewScreen } from './screens/PreviewScreen.js';
import { ExportScreen } from './screens/ExportScreen.js';
import { SettingsScreen } from './screens/SettingsScreen.js';

// ===== MAIN APPLICATION =====

// Register routes
router.register('/', SplashScreen);
router.register('/home', HomeScreen);
router.register('/templates', TemplateSelectionScreen);
router.register('/form', FormScreen);
router.register('/preview', PreviewScreen);
router.register('/export', ExportScreen);
router.register('/settings', SettingsScreen);

// Initialize app
function init() {
  // Hide loading screen
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
    }
  }, 500);

  // Start router
  router.navigate('/');
}

// Start app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker registration failed, but app still works
    });
  });
}
