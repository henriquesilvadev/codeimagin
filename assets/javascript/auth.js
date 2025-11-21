// Local Authentication System
// Handles signup, signin, session management, and user profile
// All data stored in localStorage - NO server-side storage

(function () {
    'use strict';

    const STORAGE_KEY = 'codeimaginAuth';

    // Initialize auth system
    function init() {
        checkSession();
        setupEventListeners();
    }

    // Check if user is logged in
    function checkSession() {
        const authData = getAuthData();
        if (authData.currentUser) {
            const user = authData.users[authData.currentUser];
            if (user) {
                showUserProfile(user);
                return true;
            }
        }
        showAuthButtons();
        return false;
    }

    // Get auth data from localStorage
    function getAuthData() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : { currentUser: null, users: {} };
    }

    // Save auth data to localStorage
    function saveAuthData(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    // Simple password hash (for demo purposes only)
    function hashPassword(password) {
        // In production, use proper hashing like bcrypt
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString(36);
    }

    // Signup function
    function signup(email, password, name, photoData) {
        const authData = getAuthData();

        // Check if user already exists
        if (authData.users[email]) {
            return { success: false, message: 'Email já cadastrado!' };
        }

        // Create new user
        const user = {
            email: email,
            password: hashPassword(password),
            name: name,
            photo: photoData || `emoji:${window.EmojiAvatar.getForUser(email)}`,
            createdAt: new Date().toISOString()
        };

        authData.users[email] = user;
        authData.currentUser = email;
        saveAuthData(authData);

        return { success: true, user: user };
    }

    // Signin function
    function signin(email, password) {
        const authData = getAuthData();
        const user = authData.users[email];

        if (!user) {
            return { success: false, message: 'Usuário não encontrado!' };
        }

        if (user.password !== hashPassword(password)) {
            return { success: false, message: 'Senha incorreta!' };
        }

        authData.currentUser = email;
        saveAuthData(authData);

        return { success: true, user: user };
    }

    // Logout function
    function logout() {
        const authData = getAuthData();
        authData.currentUser = null;
        saveAuthData(authData);
        showAuthButtons();
        closeAllModals();
    }

    // Show user profile in navbar
    function showUserProfile(user) {
        const authContainer = document.getElementById('authContainer');
        if (!authContainer) return;

        const isEmoji = user.photo && user.photo.startsWith('emoji:');
        const avatarContent = isEmoji
            ? `<span class="user-avatar-emoji">${user.photo.replace('emoji:', '')}</span>`
            : `<img src="${user.photo}" alt="${user.name}" class="user-avatar-img">`;

        authContainer.innerHTML = `
      <div class="user-profile">
        <div class="user-avatar">
          ${avatarContent}
        </div>
        <span class="user-name">${user.name}</span>
        <button class="logout-btn" id="logoutBtn" title="Sair">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </button>
      </div>
    `;

        document.getElementById('logoutBtn').addEventListener('click', logout);
    }

    // Show auth buttons
    function showAuthButtons() {
        const authContainer = document.getElementById('authContainer');
        if (!authContainer) return;

        authContainer.innerHTML = `
      <button class="auth-btn" id="signinBtn">Entrar</button>
      <button class="auth-btn auth-btn-primary" id="signupBtn">Cadastrar</button>
    `;

        document.getElementById('signinBtn').addEventListener('click', () => openModal('signin'));
        document.getElementById('signupBtn').addEventListener('click', () => openModal('signup'));
    }

    // Open modal
    function openModal(type) {
        const modal = document.getElementById(type === 'signup' ? 'signupModal' : 'signinModal');
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    // Close modal
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
            // Clear form
            const form = modal.querySelector('form');
            if (form) form.reset();
            // Clear photo preview
            const preview = modal.querySelector('.photo-preview');
            if (preview) preview.innerHTML = '';
        }
    }

    // Close all modals
    function closeAllModals() {
        closeModal('signupModal');
        closeModal('signinModal');
    }

    // Handle photo upload
    function handlePhotoUpload(input, previewContainer) {
        const file = input.files[0];
        if (!file) return null;

        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const photoData = e.target.result;
                previewContainer.innerHTML = `<img src="${photoData}" alt="Preview">`;
                resolve(photoData);
            };
            reader.readAsDataURL(file);
        });
    }

    // Handle Google Sign-In (Real implementation with Google Identity Services)
    function handleGoogleSignIn() {
        // Check if Google Identity Services is loaded
        if (typeof google === 'undefined' || !google.accounts) {
            showNotification('⚠️ Google Sign-In ainda está carregando. Tente novamente em alguns segundos.', 'info');
            return;
        }

        // Initialize Google Sign-In
        google.accounts.id.initialize({
            client_id: '760841351048-jlpcferjftleju76filf2rvk4rct5dth.apps.googleusercontent.com', // Replace with your actual Client ID
            callback: handleGoogleCallback,
            auto_select: false,
            cancel_on_tap_outside: true
        });

        // Prompt the One Tap dialog
        google.accounts.id.prompt((notification) => {
            if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                // Fallback to button flow if One Tap is not available
                showNotification('💡 Para usar Google Sign-In, você precisa configurar um Google OAuth Client ID válido.', 'info');

                // For demo purposes, show mock implementation
                handleMockGoogleSignIn();
            }
        });
    }

    // Handle Google OAuth callback
    function handleGoogleCallback(response) {
        try {
            // Decode JWT token to get user info
            const userInfo = parseJwt(response.credential);

            const googleUser = {
                email: userInfo.email,
                name: userInfo.name,
                photo: userInfo.picture || `emoji:${window.EmojiAvatar.getForUser(userInfo.email)}`
            };

            // Create or sign in user
            const authData = getAuthData();

            if (authData.users[googleUser.email]) {
                // Sign in existing user
                authData.currentUser = googleUser.email;
                saveAuthData(authData);
                showUserProfile(authData.users[googleUser.email]);
                closeAllModals();
                showNotification('Login com Google realizado!', 'success');
            } else {
                // Create new user
                authData.users[googleUser.email] = {
                    email: googleUser.email,
                    name: googleUser.name,
                    photo: googleUser.photo,
                    password: '', // No password for Google users
                    createdAt: new Date().toISOString(),
                    provider: 'google'
                };
                authData.currentUser = googleUser.email;
                saveAuthData(authData);
                showUserProfile(authData.users[googleUser.email]);
                closeAllModals();
                showNotification('Conta Google criada com sucesso!', 'success');
            }
        } catch (error) {
            console.error('Google Sign-In error:', error);
            showNotification('Erro ao fazer login com Google. Tente novamente.', 'error');
        }
    }

    // Parse JWT token
    function parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    // Mock Google Sign-In (fallback for demo)
    function handleMockGoogleSignIn() {
        const mockGoogleUser = {
            email: `demo.google.${Date.now()}@gmail.com`,
            name: 'Usuário Google Demo',
            photo: `emoji:${window.EmojiAvatar.getRandomEmoji()}`
        };

        const authData = getAuthData();

        if (authData.users[mockGoogleUser.email]) {
            authData.currentUser = mockGoogleUser.email;
            saveAuthData(authData);
            showUserProfile(authData.users[mockGoogleUser.email]);
            closeAllModals();
            showNotification('Login com Google (demo) realizado!', 'success');
        } else {
            authData.users[mockGoogleUser.email] = {
                email: mockGoogleUser.email,
                name: mockGoogleUser.name,
                photo: mockGoogleUser.photo,
                password: '',
                createdAt: new Date().toISOString(),
                provider: 'google'
            };
            authData.currentUser = mockGoogleUser.email;
            saveAuthData(authData);
            showUserProfile(authData.users[mockGoogleUser.email]);
            closeAllModals();
            showNotification('Conta Google (demo) criada com sucesso!', 'success');
        }
    }

    // Setup event listeners
    function setupEventListeners() {
        // Signup form
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(signupForm);
                const email = formData.get('email');
                const password = formData.get('password');
                const name = formData.get('name');
                const photoInput = document.getElementById('photoUpload');

                let photoData = null;
                if (photoInput.files.length > 0) {
                    const previewContainer = document.querySelector('#signupModal .photo-preview');
                    photoData = await handlePhotoUpload(photoInput, previewContainer);
                }

                const result = signup(email, password, name, photoData);

                if (result.success) {
                    showUserProfile(result.user);
                    closeModal('signupModal');
                    showNotification('Conta criada com sucesso!', 'success');
                } else {
                    showNotification(result.message, 'error');
                }
            });
        }

        // Signin form
        const signinForm = document.getElementById('signinForm');
        if (signinForm) {
            signinForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(signinForm);
                const email = formData.get('email');
                const password = formData.get('password');

                const result = signin(email, password);

                if (result.success) {
                    showUserProfile(result.user);
                    closeModal('signinModal');
                    showNotification('Login realizado com sucesso!', 'success');
                } else {
                    showNotification(result.message, 'error');
                }
            });
        }

        // Photo upload preview
        const photoUpload = document.getElementById('photoUpload');
        if (photoUpload) {
            photoUpload.addEventListener('change', () => {
                const previewContainer = document.querySelector('#signupModal .photo-preview');
                handlePhotoUpload(photoUpload, previewContainer);
            });
        }

        // Google Sign-In buttons
        const googleSignupBtn = document.getElementById('googleSignupBtn');
        if (googleSignupBtn) {
            googleSignupBtn.addEventListener('click', handleGoogleSignIn);
        }

        const googleSigninBtn = document.getElementById('googleSigninBtn');
        if (googleSigninBtn) {
            googleSigninBtn.addEventListener('click', handleGoogleSignIn);
        }

        // Close modal buttons
        document.querySelectorAll('.modal-close, .modal-overlay').forEach(el => {
            el.addEventListener('click', (e) => {
                if (e.target === el) {
                    const modal = el.closest('.auth-modal');
                    if (modal) closeModal(modal.id);
                }
            });
        });
    }

    // Show notification
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export for external use
    window.Auth = {
        signup,
        signin,
        logout,
        checkSession,
        getAuthData
    };

})();
