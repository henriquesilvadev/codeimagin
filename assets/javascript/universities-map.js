// Tech Universities Map using Leaflet.js
// Displays top 10 tech universities in Brazil with a dark theme

(function () {
    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
        console.error('Leaflet CSS/JS not loaded');
        return;
    }

    const mapContainer = document.getElementById('universitiesMap');
    if (!mapContainer) return;

    // Initialize map centered on Brazil (Southeast focus)
    const map = L.map('universitiesMap', {
        center: [-22.5, -45.0], // Centered roughly between SP, Rio, MG
        zoom: 6,
        scrollWheelZoom: false, // Disable scroll zoom for better UX
        zoomControl: false // We'll add it in a custom position if needed, or keep it minimal
    });

    // Add Zoom Control to top-right
    L.control.zoom({
        position: 'topright'
    }).addTo(map);

    // Dark Matter Tile Layer (CartoDB) - Free and beautiful dark theme
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    // University Data (Top 10 Tech/Engineering in Brazil)
    const universities = [
        {
            name: "USP",
            fullName: "Universidade de São Paulo",
            desc: "Referência em pesquisa e ciência da computação na América Latina.",
            coords: [-23.5505, -46.7333],
            color: "#D9731A" // Orange
        },
        {
            name: "UNICAMP",
            fullName: "Universidade Estadual de Campinas",
            desc: "Pioneira em cursos de tecnologia e forte polo de inovação.",
            coords: [-22.8184, -47.0647],
            color: "#BF247A" // Pink
        },
        {
            name: "ITA",
            fullName: "Instituto Tecnológico de Aeronáutica",
            desc: "Excelência em engenharia e tecnologia aeroespacial.",
            coords: [-23.2123, -45.8765],
            color: "#4EC9B0" // Cyan/Green
        },
        {
            name: "UFMG",
            fullName: "Universidade Federal de Minas Gerais",
            desc: "Destaque nacional em ciência da computação e sistemas.",
            coords: [-19.8696, -43.9608],
            color: "#66d9ef" // Blue
        },
        {
            name: "UFRJ",
            fullName: "Universidade Federal do Rio de Janeiro",
            desc: "Maior universidade federal do Brasil, forte em engenharia.",
            coords: [-22.8626, -43.2236],
            color: "#ae81ff" // Purple
        },
        {
            name: "FIAP",
            fullName: "Faculdade de Informática e Administração Paulista",
            desc: "Focada em tecnologia, inovação e empreendedorismo.",
            coords: [-23.5727, -46.6227],
            color: "#f92672" // Red/Pink
        },
        {
            name: "PUC-Rio",
            fullName: "Pontifícia Universidade Católica do Rio de Janeiro",
            desc: "Reconhecida pela excelência em informática e pesquisa.",
            coords: [-22.9788, -43.2323],
            color: "#e6db74" // Yellow
        },
        {
            name: "UFRGS",
            fullName: "Universidade Federal do Rio Grande do Sul",
            desc: "Líder em pesquisa tecnológica no sul do país.",
            coords: [-30.0346, -51.2177],
            color: "#a6e22e" // Green
        },
        {
            name: "UFPE",
            fullName: "Universidade Federal de Pernambuco",
            desc: "Coração do Porto Digital, um dos maiores parques tecnológicos.",
            coords: [-8.0522, -34.9537],
            color: "#fd971f" // Orange
        },
        {
            name: "UNIFESP",
            fullName: "Universidade Federal de São Paulo",
            desc: "Crescente destaque em ciência e tecnologia.",
            coords: [-23.5977, -46.6464],
            color: "#812B8C" // Purple Brand
        }
    ];

    // Custom Icon Function
    const createCustomIcon = (color) => {
        return L.divIcon({
            className: 'custom-map-marker',
            html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; box-shadow: 0 0 10px ${color}; border: 2px solid #fff;"></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8],
            popupAnchor: [0, -10]
        });
    };

    // Add Markers
    universities.forEach(uni => {
        const marker = L.marker(uni.coords, {
            icon: createCustomIcon(uni.color)
        }).addTo(map);

        // Custom Popup Content
        const popupContent = `
      <div class="map-popup-content">
        <h3 style="color: ${uni.color}">${uni.name}</h3>
        <h4>${uni.fullName}</h4>
        <p>${uni.desc}</p>
      </div>
    `;

        marker.bindPopup(popupContent);
    });

})();
