/**
 * CodeX - Interactive Code Editor
 * Real-time JavaScript code execution with syntax highlighting
 */

class CodeEditor {
    constructor() {
        // DOM Elements
        this.fab = document.getElementById('codeEditorFab');
        this.modal = document.getElementById('codeEditorModal');
        this.overlay = this.modal?.querySelector('.code-editor-overlay');
        this.closeBtn = document.getElementById('codeEditorClose');
        this.textarea = document.getElementById('codeEditorTextarea');
        this.output = document.getElementById('codeEditorOutput');
        this.runBtn = document.getElementById('runCodeBtn');
        this.clearBtn = document.getElementById('clearCodeBtn');
        this.clearConsoleBtn = document.getElementById('clearConsoleBtn');
        this.lineNumbers = document.getElementById('lineNumbers');

        // State
        this.isOpen = false;
        this.originalConsole = {
            log: console.log,
            error: console.error,
            warn: console.warn
        };

        this.init();
    }

    init() {
        if (!this.modal) return;

        // Event Listeners
        this.fab?.addEventListener('click', () => this.open());
        this.closeBtn?.addEventListener('click', () => this.close());
        this.overlay?.addEventListener('click', () => this.close());
        this.runBtn?.addEventListener('click', () => this.runCode());
        this.clearBtn?.addEventListener('click', () => this.clearEditor());
        this.clearConsoleBtn?.addEventListener('click', () => this.clearConsole());

        // Textarea events
        this.textarea?.addEventListener('input', () => this.updateLineNumbers());
        this.textarea?.addEventListener('scroll', () => this.syncScroll());
        this.textarea?.addEventListener('keydown', (e) => this.handleKeydown(e));

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && this.isOpen) {
                e.preventDefault();
                this.runCode();
            }
        });

        // Initialize
        this.setDefaultCode();
        this.updateLineNumbers();
    }

    setDefaultCode() {
        const defaultCode = `// Bem-vindo ao CodeX! 🚀
// Experimente executar este código

function saudacao(nome) {
  return \`Olá, \${nome}! Bem-vindo ao CodeImag.in\`;
}

console.log(saudacao('Desenvolvedor'));

// Teste operações matemáticas
const numeros = [1, 2, 3, 4, 5];
const soma = numeros.reduce((a, b) => a + b, 0);
console.log('Soma:', soma);

// Experimente criar suas próprias funções!`;

        if (this.textarea) {
            this.textarea.value = defaultCode;
        }
    }

    open() {
        if (!this.modal) return;
        this.modal.classList.remove('hidden');
        this.isOpen = true;
        document.body.style.overflow = 'hidden';
        this.textarea?.focus();

        // Animation
        setTimeout(() => {
            this.modal.classList.add('active');
        }, 10);
    }

    close() {
        if (!this.modal) return;
        this.modal.classList.remove('active');
        setTimeout(() => {
            this.modal.classList.add('hidden');
            this.isOpen = false;
            document.body.style.overflow = '';
        }, 300);
    }

    updateLineNumbers() {
        if (!this.textarea || !this.lineNumbers) return;

        const lines = this.textarea.value.split('\n').length;
        const lineNumbersHtml = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
        this.lineNumbers.textContent = lineNumbersHtml;
    }

    syncScroll() {
        if (!this.textarea || !this.lineNumbers) return;
        this.lineNumbers.scrollTop = this.textarea.scrollTop;
    }

    handleKeydown(e) {
        // Tab key support
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = this.textarea.selectionStart;
            const end = this.textarea.selectionEnd;
            const value = this.textarea.value;

            this.textarea.value = value.substring(0, start) + '  ' + value.substring(end);
            this.textarea.selectionStart = this.textarea.selectionEnd = start + 2;
            this.updateLineNumbers();
        }
    }

    clearEditor() {
        if (this.textarea) {
            this.textarea.value = '';
            this.updateLineNumbers();
            this.textarea.focus();
        }
    }

    clearConsole() {
        if (this.output) {
            this.output.innerHTML = '<div class="output-welcome"><p>Console limpo ✨</p></div>';
        }
    }

    runCode() {
        if (!this.textarea || !this.output) return;

        const code = this.textarea.value.trim();
        if (!code) {
            this.addOutput('⚠️ Nenhum código para executar', 'warn');
            return;
        }

        // Clear welcome message
        const welcome = this.output.querySelector('.output-welcome');
        if (welcome) {
            welcome.remove();
        }

        // Capture console output
        const logs = [];
        const captureLog = (type, ...args) => {
            logs.push({ type, args, timestamp: new Date() });
        };

        // Override console methods
        console.log = (...args) => captureLog('log', ...args);
        console.error = (...args) => captureLog('error', ...args);
        console.warn = (...args) => captureLog('warn', ...args);

        try {
            // Execute code in isolated scope
            const func = new Function(code);
            const result = func();

            // If function returns a value, log it
            if (result !== undefined) {
                console.log(result);
            }

            // Display all captured logs
            logs.forEach(({ type, args, timestamp }) => {
                const message = args.map(arg => this.formatValue(arg)).join(' ');
                this.addOutput(message, type, timestamp);
            });

            // Success message if no output
            if (logs.length === 0) {
                this.addOutput('✅ Código executado com sucesso (sem saída)', 'success');
            }

        } catch (error) {
            this.addOutput(`❌ Erro: ${error.message}`, 'error');
            if (error.stack) {
                this.addOutput(error.stack, 'error-stack');
            }
        } finally {
            // Restore original console methods
            console.log = this.originalConsole.log;
            console.error = this.originalConsole.error;
            console.warn = this.originalConsole.warn;
        }
    }

    formatValue(value) {
        if (value === null) return 'null';
        if (value === undefined) return 'undefined';
        if (typeof value === 'string') return value;
        if (typeof value === 'function') return value.toString();
        if (typeof value === 'object') {
            try {
                return JSON.stringify(value, null, 2);
            } catch (e) {
                return String(value);
            }
        }
        return String(value);
    }

    addOutput(message, type = 'log', timestamp = new Date()) {
        if (!this.output) return;

        const outputLine = document.createElement('div');
        outputLine.className = `output-line output-${type}`;

        const time = timestamp.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        const icon = this.getIcon(type);

        outputLine.innerHTML = `
      <span class="output-time">[${time}]</span>
      <span class="output-icon">${icon}</span>
      <span class="output-message">${this.escapeHtml(message)}</span>
    `;

        this.output.appendChild(outputLine);
        this.output.scrollTop = this.output.scrollHeight;
    }

    getIcon(type) {
        const icons = {
            log: '▶',
            error: '✖',
            warn: '⚠',
            success: '✓',
            'error-stack': '↳'
        };
        return icons[type] || '▶';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new CodeEditor();
    });
} else {
    new CodeEditor();
}
