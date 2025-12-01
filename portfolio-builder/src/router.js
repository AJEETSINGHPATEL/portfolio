// ===== ROUTER =====
class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.params = {};
  }

  register(path, handler) {
    this.routes[path] = handler;
  }

  navigate(path, params = {}) {
    this.params = params;
    this.currentRoute = path;
    
    const handler = this.routes[path];
    if (handler) {
      const app = document.getElementById('app');
      app.innerHTML = '';
      handler(app, params);
    } else {
      console.error(`Route not found: ${path}`);
      this.navigate('/');
    }
  }

  back() {
    window.history.back();
  }
}

export const router = new Router();
