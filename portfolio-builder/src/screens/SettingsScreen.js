import { router } from '../router.js';
import { storage } from '../storage.js';

// ===== SETTINGS SCREEN =====
export function SettingsScreen(container) {
    container.innerHTML = `
    <div class="screen">
      <div class="container">
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <button class="btn btn-secondary" id="back-btn">← Back</button>
          <h2>Settings</h2>
          <div style="width: 100px;"></div>
        </div>

        <!-- Settings Options -->
        <div class="card mb-3">
          <h3 class="mb-3">Data Management</h3>
          
          <div class="form-group">
            <button class="btn btn-outline" id="export-data-btn" style="width: 100%;">
              📤 Export All Data
            </button>
            <p class="text-secondary mt-1">Download all your portfolios and resumes as JSON</p>
          </div>

          <div class="form-group">
            <label class="form-label">Import Data</label>
            <input type="file" class="form-input" id="import-file" accept=".json">
            <p class="text-secondary mt-1">Upload previously exported data</p>
          </div>

          <div class="form-group">
            <button class="btn btn-secondary" id="clear-data-btn" style="width: 100%; background: var(--error);">
              🗑️ Clear All Data
            </button>
            <p class="text-secondary mt-1">Delete all saved portfolios and resumes</p>
          </div>
        </div>

        <!-- App Info -->
        <div class="card">
          <h3 class="mb-3">About</h3>
          <p class="text-secondary">Portfolio & Resume Builder v1.0.0</p>
          <p class="text-secondary">Create professional portfolios and resumes with ease</p>
        </div>

        <!-- Status Message -->
        <div id="status-message" class="hidden mt-3"></div>
      </div>
    </div>
  `;

    // Export data
    document.getElementById('export-data-btn').addEventListener('click', async () => {
        try {
            const data = await storage.exportData();
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `portfolio-builder-backup-${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);

            showStatus('✓ Data exported successfully!', 'success');
        } catch (error) {
            showStatus('✗ Export failed', 'error');
            console.error(error);
        }
    });

    // Import data
    document.getElementById('import-file').addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const text = await file.text();
                const success = await storage.importData(text);

                if (success) {
                    showStatus('✓ Data imported successfully!', 'success');
                } else {
                    showStatus('✗ Import failed - invalid file', 'error');
                }
            } catch (error) {
                showStatus('✗ Import failed', 'error');
                console.error(error);
            }
        }
    });

    // Clear all data
    document.getElementById('clear-data-btn').addEventListener('click', async () => {
        if (confirm('Are you sure you want to delete all data? This cannot be undone.')) {
            try {
                await storage.clearAll();
                showStatus('✓ All data cleared', 'success');
                setTimeout(() => router.navigate('/home'), 2000);
            } catch (error) {
                showStatus('✗ Failed to clear data', 'error');
                console.error(error);
            }
        }
    });

    // Back button
    document.getElementById('back-btn').addEventListener('click', () => {
        router.navigate('/home');
    });

    function showStatus(message, type) {
        const statusEl = document.getElementById('status-message');
        statusEl.className = `card text-center ${type === 'success' ? 'text-success' : 'text-error'}`;
        statusEl.textContent = message;
        statusEl.classList.remove('hidden');

        setTimeout(() => {
            statusEl.classList.add('hidden');
        }, 3000);
    }
}
