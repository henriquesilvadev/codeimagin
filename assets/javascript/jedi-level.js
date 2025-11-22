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

            // Get API key from environment or config
            const apiKey = await getApiKey();

            if (!apiKey) {
                throw new Error('API key não encontrada. Configure GEMINI_API_KEY.');
            }

            // Call Gemini API to generate Jedi avatar
            const generatedImage = await callGeminiImageGeneration(apiKey, prompt, userPhoto);

            if (generatedImage) {
                generatedAvatar = generatedImage;
                displayHologram(rank);
                if (modal) modal.classList.remove('active');
            } else {
                throw new Error('Falha ao gerar avatar');
            }

        } catch (error) {
            console.error('Error generating avatar:', error);
            alert(`Erro ao gerar avatar: ${error.message}\n\nUsando foto original com efeitos holográficos.`);

            // Fallback: use original photo with holographic effects
            generatedAvatar = userPhoto;
            const rank = getJediRank();
            displayHologram(rank);
            if (modal) modal.classList.remove('active');

        } finally {
            if (generateBtn) generateBtn.disabled = false;
            if (loadingSpinner) loadingSpinner.classList.remove('active');
        }
    }

    async function getApiKey() {
        // ⚠️ AVISO IMPORTANTE ⚠️
        // Esta chave está exposta APENAS para fins de DEMONSTRAÇÃO.
        // NÃO usar este padrão em produção. Em sistemas reais, a chave deve ficar
        // em um backend seguro ou função serverless.
        //
        // Esta chave será revogada após a apresentação da demo.
        // Usando a mesma chave do chatbot para consistência
        return 'AIzaSyC1cHY4tsDoZpIJoJWP_y_47VaB9FcsmCs';
    }

    async function callGeminiImageGeneration(apiKey, prompt, photoBase64) {
        try {
            // Use Gemini's generateContent with image input
            const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

            // Extract base64 data from data URL
            const base64Data = photoBase64.split(',')[1];
            const mimeType = photoBase64.split(';')[0].split(':')[1];

            const requestBody = {
                contents: [{
                    parts: [
                        {
                            text: `${prompt}\n\nIMPORTANT: Describe in detail how to transform this person into a ${prompt.includes('Master') ? 'Jedi Master' : prompt.includes('Knight') ? 'Jedi Knight' : 'Padawan'} with holographic blue glow effect, Star Wars style. Be very specific about the visual transformation.`
                        },
                        {
                            inline_data: {
                                mime_type: mimeType,
                                data: base64Data
                            }
                        }
                    ]
                }],
                generationConfig: {
                    temperature: 0.9,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            };

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`);
            }

            const data = await response.json();

            // For now, Gemini doesn't generate images directly, so we'll use the description
            // to apply enhanced CSS filters to the original photo
            // In a production app, you'd use Imagen API or another image generation service

            console.log('Gemini response:', data);

            // Apply enhanced holographic effect to original photo
            return applyJediTransformation(photoBase64, prompt);

        } catch (error) {
            console.error('Gemini API error:', error);
            throw error;
        }
    }

    function applyJediTransformation(photoBase64, prompt) {
        // Create a more pronounced Jedi holographic transformation
        console.log('🎨 Applying Jedi transformation...');

        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = img.width;
                canvas.height = img.height;

                // Draw original image
                ctx.drawImage(img, 0, 0);

                // Get image data for pixel manipulation
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                // Apply strong blue holographic filter pixel by pixel
                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];

                    // Convert to grayscale first
                    const gray = (r + g + b) / 3;

                    // Apply strong blue tint with holographic effect
                    data[i] = gray * 0.3;          // Red - muito reduzido
                    data[i + 1] = gray * 0.6;      // Green - médio
                    data[i + 2] = gray * 1.5;      // Blue - muito aumentado

                    // Increase brightness for holographic glow
                    data[i] = Math.min(255, data[i] + 30);
                    data[i + 1] = Math.min(255, data[i + 1] + 50);
                    data[i + 2] = Math.min(255, data[i + 2] + 80);
                }

                // Put modified image data back
                ctx.putImageData(imageData, 0, 0);

                // Add additional glow layers
                ctx.globalCompositeOperation = 'screen';
                ctx.fillStyle = 'rgba(59, 130, 246, 0.4)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Add bright highlights
                ctx.globalCompositeOperation = 'overlay';
                ctx.fillStyle = 'rgba(96, 165, 250, 0.3)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                const result = canvas.toDataURL('image/png');
                console.log('✅ Jedi transformation complete!');
                resolve(result);
            };

            img.onerror = (error) => {
                console.error('❌ Error loading image for transformation:', error);
                resolve(photoBase64); // Fallback to original
            };

            img.src = photoBase64;
        });
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
