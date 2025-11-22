const devfestData = [
    // BRASIL 2025
    {
        city: "Rio de Janeiro",
        country: "Brasil",
        date: "Nov 08, 2025",
        location: { lat: -22.9068, lng: -43.1729 },
        image: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/DevFest_RJ_2024.png",
        link: "https://gdg.community.dev/events/details/google-gdg-rio-de-janeiro-presents-devfest-rio-de-janeiro-2025/"
    },
    {
        city: "Belo Horizonte",
        country: "Brasil",
        date: "Nov 08, 2025",
        location: { lat: -19.9167, lng: -43.9345 },
        image: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/DevFest_BH_2024.png",
        link: "https://gdg.community.dev/events/details/google-gdg-belo-horizonte-presents-devfest-belo-horizonte-2025/"
    },
    {
        city: "São José dos Campos",
        country: "Brasil",
        date: "Nov 29, 2025",
        location: { lat: -23.1791, lng: -45.8872 },
        image: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/DevFest_SJC.png",
        link: "https://gdg.community.dev/gdg-sao-jose-dos-campos/"
    },

    // AMÉRICA LATINA 2025
    {
        city: "Buenos Aires",
        country: "Argentina",
        date: "Nov 16, 2025",
        location: { lat: -34.6037, lng: -58.3816 },
        image: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/DevFest_BA.png",
        link: "https://gdg.community.dev/gdg-buenos-aires/"
    },
    { city: "Monterrey", country: "México", date: "Nov 13, 2025", location: { lat: 25.6866, lng: -100.3161 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-monterrey/" },
    { city: "Campeche", country: "México", date: "Nov 15, 2025", location: { lat: 19.8301, lng: -90.5349 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-campeche/" },
    { city: "Ciudad de México", country: "México", date: "Nov 16, 2025", location: { lat: 19.4326, lng: -99.1332 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-mexico-city/" },
    { city: "Guadalajara", country: "México", date: "Nov 22, 2025", location: { lat: 20.6597, lng: -103.3496 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-guadalajara/" },
    { city: "Querétaro", country: "México", date: "Nov 22, 2025", location: { lat: 20.5888, lng: -100.3899 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-queretaro/" },
    { city: "Hermosillo", country: "México", date: "Nov 25, 2025", location: { lat: 29.0729, lng: -110.9559 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-hermosillo/" },
    { city: "Xalapa", country: "México", date: "Dec 05, 2025", location: { lat: 19.5438, lng: -96.9102 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-xalapa/" },
    { city: "Tijuana", country: "México", date: "Dec 06, 2025", location: { lat: 32.5149, lng: -117.0382 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-tijuana/" },
    { city: "Medellín", country: "Colombia", date: "Nov 29, 2025", location: { lat: 6.2442, lng: -75.5812 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-medellin/" },
    { city: "Pereira", country: "Colombia", date: "Nov 29, 2025", location: { lat: 4.8133, lng: -75.6961 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-pereira/" },
    { city: "Bogotá", country: "Colombia", date: "Dec 06, 2025", location: { lat: 4.7110, lng: -74.0721 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-bogota/" },
    { city: "Cali", country: "Colombia", date: "Nov 07, 2025", location: { lat: 3.4516, lng: -76.5320 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-cali/" },

    // ÁSIA 2025
    { city: "Bangalore", country: "Índia", date: "Dec 05, 2025", location: { lat: 12.9716, lng: 77.5946 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-bengaluru/" },
    { city: "Mumbai", country: "Índia", date: "Dec 20, 2025", location: { lat: 19.0760, lng: 72.8777 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-mumbai/" },
    { city: "New Delhi", country: "Índia", date: "Oct 11, 2025", location: { lat: 28.6139, lng: 77.2090 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-new-delhi/" },
    { city: "Chennai", country: "Índia", date: "Nov 08, 2025", location: { lat: 13.0827, lng: 80.2707 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-chennai/" },
    { city: "Kolkata", country: "Índia", date: "Dec 21, 2025", location: { lat: 22.5726, lng: 88.3639 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-kolkata/" },
    { city: "Ahmedabad", country: "Índia", date: "Nov 15, 2025", location: { lat: 23.0225, lng: 72.5714 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-ahmedabad/" },
    { city: "Kochi", country: "Índia", date: "Nov 01, 2025", location: { lat: 9.9312, lng: 76.2673 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-kochi/" },
    { city: "Goa", country: "Índia", date: "Oct 11, 2025", location: { lat: 15.2993, lng: 74.1240 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-goa/" },
    { city: "Prayagraj", country: "Índia", date: "Nov 29, 2025", location: { lat: 25.4358, lng: 81.8463 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-prayagraj/" },
    { city: "Tokyo", country: "Japão", date: "Nov 22, 2025", location: { lat: 35.6762, lng: 139.6503 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-tokyo/" },
    { city: "Singapore", country: "Singapura", date: "Nov 22, 2025", location: { lat: 1.3521, lng: 103.8198 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-singapore/" },

    // EUROPA 2025
    { city: "London", country: "UK", date: "Nov 22, 2025", location: { lat: 51.5074, lng: -0.1278 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-london/" },
    { city: "Berlin", country: "Germany", date: "Nov 22, 2025", location: { lat: 52.5200, lng: 13.4050 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-berlin/" },
    { city: "Kyiv", country: "Ukraine", date: "Nov 22, 2025", location: { lat: 50.4501, lng: 30.5234 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-kyiv/" },
    { city: "Paris", country: "France", date: "Late 2025", location: { lat: 48.8566, lng: 2.3522 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-paris/" },

    // ORIENTE MÉDIO 2025
    { city: "Baku", country: "Azerbaijan", date: "Nov 22, 2025", location: { lat: 40.4093, lng: 49.8671 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-baku/" },
    { city: "Batumi", country: "Georgia", date: "Nov 26, 2025", location: { lat: 41.6168, lng: 41.6367 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-batumi/" },
    { city: "Adana", country: "Turkey", date: "Nov 29, 2025", location: { lat: 37.0000, lng: 35.3213 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-adana/" },
    { city: "Amman", country: "Jordan", date: "Nov 29, 2025", location: { lat: 31.9454, lng: 35.9284 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-amman/" },
    { city: "Rehovot", country: "Israel", date: "Dec 02, 2025", location: { lat: 31.8928, lng: 34.8113 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-rehovot/" },
    { city: "Elazig", country: "Turkey", date: "Dec 04, 2025", location: { lat: 38.6810, lng: 39.2264 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-elazig/" },
    { city: "Riyadh", country: "Saudi Arabia", date: "Dec 06, 2025", location: { lat: 24.7136, lng: 46.6753 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-riyadh/" },
    { city: "Hatay", country: "Turkey", date: "Dec 13, 2025", location: { lat: 36.2023, lng: 36.1613 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-hatay/" },
    { city: "Yerevan", country: "Armenia", date: "Dec 20, 2025", location: { lat: 40.1872, lng: 44.5152 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-yerevan/" },
    { city: "Tripoli", country: "Lebanon", date: "Dec 20, 2025", location: { lat: 34.4367, lng: 35.8497 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-tripoli/" },
    { city: "Aqaba", country: "Jordan", date: "Dec 25, 2025", location: { lat: 29.5319, lng: 35.0061 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-aqaba/" },

    // ÁFRICA 2025
    { city: "Khartoum", country: "Sudan", date: "Nov 25, 2025", location: { lat: 15.5007, lng: 32.5599 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-khartoum/" },
    { city: "Aswan", country: "Egypt", date: "Dec 06, 2025", location: { lat: 24.0889, lng: 32.8998 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-aswan/" },
    { city: "Luanda", country: "Angola", date: "Dec 13, 2025", location: { lat: -8.8390, lng: 13.2894 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-luanda/" },
    { city: "Libreville", country: "Gabon", date: "Dec 20, 2025", location: { lat: 0.4162, lng: 9.4673 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-libreville/" },

    // AMÉRICA DO NORTE 2025
    { city: "Los Angeles", country: "USA", date: "Dec 06, 2025", location: { lat: 34.0522, lng: -118.2437 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-los-angeles/" },

    // 2026 EVENTOS
    { city: "Gela", country: "Italy", date: "Feb 21, 2026", location: { lat: 37.0664, lng: 14.2500 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-gela/" },
    { city: "Zagreb", country: "Croatia", date: "TBD 2026", location: { lat: 45.8150, lng: 15.9819 }, image: "assets/images/devfest-banner.png", link: "https://gdg.community.dev/gdg-zagreb/" }
];
