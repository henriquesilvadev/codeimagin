// Jedi Level Avatar Generator
// Star Wars themed skill assessment and holographic avatar display

(function () {
    'use strict';

    // State
    let skills = {
        html: 50,
        css: 50,
        javascript: 50
    };
    let userPhoto = null;
    let generatedAvatar = null;

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        setupEventListeners();
        updateJediLevel();
    }

    function setupEventListeners() {
        // Modal controls
        const openBtn = document.getElementById('jediLevelBtn');
        const closeBtn = document.getElementById('jediModalClose');
        const modal = document.getElementById('jediModal');

        if (openBtn) {
            openBtn.addEventListener('click', () => {
                modal.classList.add('active');
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }

        // Close on overlay click
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        // Skill sliders
        ['html', 'css', 'javascript'].forEach(skill => {
            const slider = document.getElementById(`${skill}Slider`);
            const value = document.getElementById(`${skill}Value`);

            if (slider) {
                slider.addEventListener('input', (e) => {
                    const val = parseInt(e.target.value);
                    skills[skill] = val;
                    if (value) value.textContent = `${val}%`;
                    updateJediLevel();
                });
            }
        });

        // Photo upload
        const photoInput = document.getElementById('photoInput');
        const photoArea = document.getElementById('photoUploadArea');
        const photoPreview = document.getElementById('photoPreview');
        const photoPreviewImg = document.getElementById('photoPreviewImg');

        if (photoArea && photoInput) {
            photoArea.addEventListener('click', () => {
                photoInput.click();
            });

            photoInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        userPhoto = event.target.result;
                        if (photoPreviewImg) {
                            photoPreviewImg.src = userPhoto;
                            photoPreview?.classList.add('active');
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        // Generate button
        const generateBtn = document.getElementById('generateAvatarBtn');
        if (generateBtn) {
            generateBtn.addEventListener('click', generateAvatar);
        }

        // Close hologram
        const hologramClose = document.getElementById('hologramClose');
        if (hologramClose) {
            hologramClose.addEventListener('click', closeHologram);
        }
    }

    function updateJediLevel() {
        const average = (skills.html + skills.css + skills.javascript) / 3;
        let rank, description;

        if (average < 34) {
            rank = '🌟 Padawan';
            description = 'Iniciante na Força do Código';
        } else if (average < 67) {
            rank = '⚔️ Cavaleiro Jedi';
            description = 'Caminho do Equilíbrio';
        } else {
            rank = '👑 Mestre Jedi';
            description = 'Domínio Completo da Força';
        }

        const rankElement = document.getElementById('jediRank');
        const descElement = document.getElementById('jediRankDescription');

        if (rankElement) rankElement.textContent = rank;
        if (descElement) descElement.textContent = description;
    }

    function getJediRank() {
        const average = (skills.html + skills.css + skills.javascript) / 3;
        if (average < 34) return 'Padawan';
        if (average < 67) return 'Jedi Knight';
        return 'Jedi Master';
    }

    async function generateAvatar() {
        if (!userPhoto) {
            alert('Por favor, faça upload de uma foto primeiro!');
            return;
        }

        const generateBtn = document.getElementById('generateAvatarBtn');
        const loadingSpinner = document.getElementById('loadingSpinner');
        const modal = document.getElementById('jediModal');

        // Show loading
        if (generateBtn) generateBtn.disabled = true;
        if (loadingSpinner) loadingSpinner.classList.add('active');

        try {
            const rank = getJediRank();
            const prompt = generatePrompt(rank);

            // Note: In a real implementation, you would call Google's Imagen API here
            // For now, we'll use a placeholder or the Gemini API to generate text
            // and create a stylized version of the uploaded photo

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // For demo purposes, we'll use the uploaded photo with CSS filters
            // In production, you'd call the actual API here
            generatedAvatar = userPhoto;

            // Display hologram
            displayHologram(rank);

            // Close modal
            if (modal) modal.classList.remove('active');

        } catch (error) {
            console.error('Error generating avatar:', error);
            alert('Erro ao gerar avatar. Tente novamente.');
        } finally {
            if (generateBtn) generateBtn.disabled = false;
            if (loadingSpinner) loadingSpinner.classList.remove('active');
        }
    }

    function generatePrompt(rank) {
        const prompts = {
            'Padawan': `A holographic Star Wars Padawan learner avatar, 
        young and eager, glowing blue hologram effect, 
        futuristic sci-fi style, transparent background, 
        cinematic lighting, training robes`,

            'Jedi Knight': `A holographic Star Wars Jedi Knight avatar, 
        confident and skilled, glowing blue hologram effect, 
        futuristic sci-fi style, transparent background, 
        cinematic lighting, Jedi robes with lightsaber`,

            'Jedi Master': `A holographic Star Wars Jedi Master avatar, 
        wise and powerful, glowing blue hologram effect, 
        futuristic sci-fi style, transparent background, 
        cinematic lighting, master robes with aura of wisdom`
        };

        return prompts[rank] || prompts['Padawan'];
    }

    function displayHologram(rank) {
        const container = document.getElementById('hologramContainer');
        const image = document.getElementById('hologramImage');
        const badge = document.getElementById('hologramBadge');

        if (!container || !image) return;

        // Set avatar image
        image.src = generatedAvatar;

        // Set badge text
        const badgeText = {
            'Padawan': '🌟 Padawan',
            'Jedi Knight': '⚔️ Cavaleiro Jedi',
            'Jedi Master': '👑 Mestre Jedi'
        };

        if (badge) {
            badge.textContent = badgeText[rank] || badgeText['Padawan'];
        }

        // Show hologram
        container.classList.add('active');

        // Save to localStorage
        saveHologram(rank);
    }

    function closeHologram() {
        const container = document.getElementById('hologramContainer');
        if (container) {
            container.classList.remove('active');
        }
    }

    function saveHologram(rank) {
        try {
            localStorage.setItem('jediAvatar', JSON.stringify({
                image: generatedAvatar,
                rank: rank,
                skills: skills,
                timestamp: Date.now()
            }));
        } catch (error) {
            console.error('Error saving hologram:', error);
        }
    }

    function loadSavedHologram() {
        try {
            const saved = localStorage.getItem('jediAvatar');
            if (saved) {
                const data = JSON.parse(saved);
                // Check if saved within last 7 days
                const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
                if (data.timestamp > weekAgo) {
                    generatedAvatar = data.image;
                    displayHologram(data.rank);
                }
            }
        } catch (error) {
            console.error('Error loading hologram:', error);
        }
    }

    // Load saved hologram on page load
    setTimeout(loadSavedHologram, 1000);

    // Export for debugging
    window.jediLevel = {
        skills,
        updateJediLevel,
        generateAvatar,
        closeHologram
    };
})();
