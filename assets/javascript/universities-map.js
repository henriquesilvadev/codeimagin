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
            color: "#D9731A", // Orange
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Reitoria_da_USP.jpg/800px-Reitoria_da_USP.jpg"
        },
        {
            name: "UNICAMP",
            fullName: "Universidade Estadual de Campinas",
            desc: "Pioneira em cursos de tecnologia e forte polo de inovação.",
            coords: [-22.8184, -47.0647],
            color: "#BF247A", // Pink
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Pra%C3%A7a_do_Ciclo_B%C3%A1sico_-_Unicamp.jpg/800px-Pra%C3%A7a_do_Ciclo_B%C3%A1sico_-_Unicamp.jpg"
        },
        {
            name: "ITA",
            fullName: "Instituto Tecnológico de Aeronáutica",
            desc: "Excelência em engenharia e tecnologia aeroespacial.",
            coords: [-23.2123, -45.8765],
            color: "#4EC9B0", // Cyan/Green
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Instituto_Tecnol%C3%B3gico_de_Aeron%C3%A1utica_-_S%C3%A3o_Jos%C3%A9_dos_Campos_-_SP_-_Brasil.jpg/800px-Instituto_Tecnol%C3%B3gico_de_Aeron%C3%A1utica_-_S%C3%A3o_Jos%C3%A9_dos_Campos_-_SP_-_Brasil.jpg"
        },
        {
            name: "UFMG",
            fullName: "Universidade Federal de Minas Gerais",
            desc: "Destaque nacional em ciência da computação e sistemas.",
            coords: [-19.8696, -43.9608],
            color: "#66d9ef", // Blue
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Reitoria_UFMG_2.jpg/800px-Reitoria_UFMG_2.jpg"
        },
        {
            name: "UFRJ",
            fullName: "Universidade Federal do Rio de Janeiro",
            desc: "Maior universidade federal do Brasil, forte em engenharia.",
            coords: [-22.8626, -43.2236],
            color: "#ae81ff", // Purple
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Pr%C3%A9dio_da_Reitoria_da_UFRJ.jpg/800px-Pr%C3%A9dio_da_Reitoria_da_UFRJ.jpg"
        },
        {
            name: "FIAP",
            fullName: "Faculdade de Informática e Administração Paulista",
            desc: "Focada em tecnologia, inovação e empreendedorismo.",
            coords: [-23.5727, -46.6227],
            color: "#f92672", // Red/Pink
            image: "https://lh3.googleusercontent.com/p/AF1QipM_yTqF2xXv_yTqF2xXv_yTqF2xXv_yTqF2xXv" // Placeholder/Generic if specific not found, using a generic tech image for now or a reliable placeholder
        },
        {
            name: "PUC-Rio",
            fullName: "Pontifícia Universidade Católica do Rio de Janeiro",
            desc: "Reconhecida pela excelência em informática e pesquisa.",
            coords: [-22.9788, -43.2323],
            color: "#e6db74", // Yellow
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/PUC-Rio_-_Edif%C3%ADcio_Cardeal_Leme.jpg/800px-PUC-Rio_-_Edif%C3%ADcio_Cardeal_Leme.jpg"
        },
        {
            name: "UFRGS",
            fullName: "Universidade Federal do Rio Grande do Sul",
            desc: "Líder em pesquisa tecnológica no sul do país.",
            coords: [-30.0346, -51.2177],
            color: "#a6e22e", // Green
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Ufrgs_reitoria.jpg/800px-Ufrgs_reitoria.jpg"
        },
        {
            name: "UFPE",
            fullName: "Universidade Federal de Pernambuco",
            desc: "Coração do Porto Digital, um dos maiores parques tecnológicos.",
            coords: [-8.0522, -34.9537],
            color: "#fd971f", // Orange
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/UFPE_Reitoria.jpg/800px-UFPE_Reitoria.jpg"
        },
        {
            name: "UNIFESP",
            fullName: "Universidade Federal de São Paulo",
            desc: "Crescente destaque em ciência e tecnologia.",
            coords: [-23.5977, -46.6464],
            color: "#812B8C", // Purple Brand
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Escola_Paulista_de_Medicina_-_UNIFESP.jpg/800px-Escola_Paulista_de_Medicina_-_UNIFESP.jpg"
        }
    ];

    // Fix for FIAP image (using a better placeholder if needed, or keeping the broken one if I can't find a good one. Let's use a generic tech building image for FIAP to be safe)
    universities[5].image = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"; // Modern office/tech building

    // Custom Icon Function
    const createCustomIcon = (color) => {
        return L.divIcon({
            className: 'custom-map-marker',
            html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; box-shadow: 0 0 15px ${color}; border: 2px solid #fff;"></div>`,
            iconSize: [18, 18],
            iconAnchor: [9, 9],
            popupAnchor: [0, -10]
        });
    };

    // Add Markers
    universities.forEach(uni => {
        const marker = L.marker(uni.coords, {
            icon: createCustomIcon(uni.color)
        }).addTo(map);

        // Custom Popup Content (Card Style)
        const popupContent = `
      <div class="map-popup-card">
        <div class="map-popup-image-container">
          <img src="${uni.image}" alt="${uni.fullName}" class="map-popup-image" loading="lazy" />
          <div class="map-popup-overlay"></div>
          <h3 class="map-popup-title" style="border-left-color: ${uni.color}">${uni.name}</h3>
        </div>
        <div class="map-popup-info">
          <h4>${uni.fullName}</h4>
          <p>${uni.desc}</p>
        </div>
      </div>
    `;

        marker.bindPopup(popupContent, {
            maxWidth: 300,
            minWidth: 280,
            className: 'custom-leaflet-popup'
        });

        // Fly to location on click
        marker.on('click', function () {
            map.flyTo(uni.coords, 14, {
                duration: 1.5,
                easeLinearity: 0.25
            });
        });
    });

})();
