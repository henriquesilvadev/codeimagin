// Google Maps implementation for Creators Map

let map;
let markers = [];

function initMap() {
    // Map styles (Dark Theme)
    const mapStyles = [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
        },
        {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
        },
        {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }],
        },
        {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }],
        },
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }],
        },
        {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }],
        },
        {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }],
        },
        {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }],
        },
        {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }],
        },
        {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }],
        },
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }],
        },
        {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }],
        },
        {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }],
        },
    ];

    // Initialize Map
    const mapElement = document.getElementById("creatorsMap");
    if (!mapElement) return;

    map = new google.maps.Map(mapElement, {
        center: { lat: 20, lng: 0 }, // World view
        zoom: 2,
        styles: mapStyles,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
    });

    // Add Markers
    addMarkers();

    // Search Listener
    const searchInput = document.getElementById('mapSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterMarkers(e.target.value);
        });
    }
}

function addMarkers() {
    if (typeof creatorsData === 'undefined') {
        console.error("Creators data not loaded.");
        return;
    }

    creatorsData.forEach((creator) => {
        const marker = new google.maps.Marker({
            position: creator.location,
            map: map,
            title: creator.name,
            animation: google.maps.Animation.DROP,
        });

        // Add click listener
        marker.addListener("click", () => {
            openCreatorModal(creator);
        });

        // Store metadata for filtering
        marker.metadata = {
            name: creator.name.toLowerCase(),
            language: creator.language.toLowerCase(),
            country: creator.country ? creator.country.toLowerCase() : ''
        };

        markers.push(marker);
    });
}

function filterMarkers(query) {
    const lowerQuery = query.toLowerCase();

    markers.forEach(marker => {
        const { name, language, country } = marker.metadata;
        const isMatch = name.includes(lowerQuery) ||
            language.includes(lowerQuery) ||
            country.includes(lowerQuery);

        if (isMatch) {
            if (marker.getMap() === null) {
                marker.setMap(map);
            }
        } else {
            marker.setMap(null);
        }
    });
}

// Modal Logic
function createModalHTML() {
    const modal = document.createElement('div');
    modal.className = 'creator-modal';
    modal.id = 'creatorModal';

    modal.innerHTML = `
        <div class="creator-modal-overlay" id="creatorModalOverlay"></div>
        <div class="creator-modal-content">
            <button class="creator-modal-close" id="creatorModalClose">&times;</button>
            <div class="creator-image-wrapper">
                <img src="" alt="" class="creator-image" id="creatorImage">
                <div class="creator-image-overlay"></div>
            </div>
            <div class="creator-info">
                <span class="creator-language-badge" id="creatorLanguage"></span>
                <h2 class="creator-name" id="creatorName"></h2>
                <div class="creator-location">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span id="creatorLocationText">Localização</span>
                </div>
                <p class="creator-description" id="creatorDescription"></p>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close events
    const closeBtn = document.getElementById('creatorModalClose');
    const overlay = document.getElementById('creatorModalOverlay');

    const closeModal = () => {
        modal.classList.remove('active');
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
}

function openCreatorModal(creator) {
    let modal = document.getElementById('creatorModal');
    if (!modal) {
        createModalHTML();
        modal = document.getElementById('creatorModal');
    }

    // Generate fallback avatar if no photo
    const photoUrl = creator.photo || `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${encodeURIComponent(creator.name)}&backgroundColor=812B8C`;

    // Populate data
    const imgElement = document.getElementById('creatorImage');
    imgElement.src = photoUrl;
    imgElement.alt = creator.name;

    // Add error handler for broken images
    imgElement.onerror = function () {
        this.src = `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${encodeURIComponent(creator.name)}&backgroundColor=812B8C`;
        this.onerror = null; // Prevent infinite loop
    };

    document.getElementById('creatorLanguage').textContent = creator.language;
    document.getElementById('creatorName').textContent = creator.name;
    document.getElementById('creatorDescription').textContent = creator.description;
    document.getElementById('creatorLocationText').textContent = `${creator.location.lat.toFixed(2)}, ${creator.location.lng.toFixed(2)}`;

    // Show modal
    modal.classList.add('active');
}

// Load map when window loads
window.initMap = initMap;

// Handle Authentication Errors
window.gm_authFailure = function () {
    const mapElement = document.getElementById("creatorsMap");
    if (mapElement) {
        mapElement.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background-color: #242f3e; color: #fff; text-align: center; padding: 20px;">
                <h3 style="color: #ff6b6b; margin-bottom: 10px;">Erro no Mapa</h3>
                <p>Não foi possível carregar o Google Maps.</p>
                <p style="font-size: 0.8rem; opacity: 0.8;">Verifique a chave da API (API Key) e as configurações de faturamento no Google Cloud Console.</p>
            </div>
        `;
        mapElement.style.border = "1px solid #ff6b6b";
    }
    console.error("Google Maps Authentication Failure: Please check your API key and billing status.");
};
