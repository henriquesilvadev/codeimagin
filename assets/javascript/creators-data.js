const creatorsData = [
    {
        name: "Brendan Eich",
        language: "JavaScript",
        location: { lat: 37.3861, lng: -122.0839 }, // Mountain View, CA (Netscape)
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Brendan_Eich_Mozilla_Foundation_official_photo.jpg/800px-Brendan_Eich_Mozilla_Foundation_official_photo.jpg",
        description: "Criador do JavaScript e co-fundador da Mozilla. Ele criou a primeira versão do JS em apenas 10 dias enquanto trabalhava na Netscape."
    },
    {
        name: "Guido van Rossum",
        language: "Python",
        location: { lat: 52.3676, lng: 4.9041 }, // Amsterdam, Netherlands (CWI)
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Guido_van_Rossum_OSCON_2006.jpg/800px-Guido_van_Rossum_OSCON_2006.jpg",
        description: "Criador da linguagem Python. Conhecido como 'Benevolent Dictator For Life' (BDFL) da comunidade Python até 2018."
    },
    {
        name: "James Gosling",
        language: "Java",
        location: { lat: 37.3541, lng: -121.9552 }, // Santa Clara, CA (Sun Microsystems)
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/James_Gosling_2008.jpg/800px-James_Gosling_2008.jpg",
        description: "Pai da linguagem Java. Ele liderou a equipe que criou o Java na Sun Microsystems nos anos 90."
    },
    {
        name: "Dennis Ritchie",
        language: "C",
        location: { lat: 40.6815, lng: -74.3999 }, // Murray Hill, NJ (Bell Labs)
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Dennis_Ritchie_2011.jpg/800px-Dennis_Ritchie_2011.jpg",
        description: "Criador da linguagem C e do sistema operacional Unix. Uma das figuras mais influentes da ciência da computação."
    },
    {
        name: "Bjarne Stroustrup",
        language: "C++",
        location: { lat: 56.1629, lng: 10.2039 }, // Aarhus, Denmark (University)
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Bjarne-stroustrup.jpg/800px-Bjarne-stroustrup.jpg",
        description: "Criador do C++. Ele desenvolveu a linguagem como uma extensão do C para suportar programação orientada a objetos."
    },
    {
        name: "Tim Berners-Lee",
        language: "HTML",
        location: { lat: 46.2293, lng: 6.1392 }, // CERN, Geneva
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Sir_Tim_Berners-Lee_%28cropped%29.jpg/800px-Sir_Tim_Berners-Lee_%28cropped%29.jpg",
        description: "Inventor da World Wide Web e do HTML. Ele escreveu o primeiro navegador e servidor web no CERN."
    },
    {
        name: "Yukihiro Matsumoto",
        language: "Ruby",
        location: { lat: 35.4684, lng: 133.0488 }, // Matsue, Japan
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Yukihiro_Matsumoto.JPG/800px-Yukihiro_Matsumoto.JPG",
        description: "Criador da linguagem Ruby. Conhecido como 'Matz', ele desenhou o Ruby para ser divertido e produtivo para desenvolvedores."
    },
    {
        name: "Rasmus Lerdorf",
        language: "PHP",
        location: { lat: 43.6532, lng: -79.3832 }, // Toronto, Canada
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Rasmus_Lerdorf_at_FrOSCon_2010.jpg/800px-Rasmus_Lerdorf_at_FrOSCon_2010.jpg",
        description: "Criador do PHP. Originalmente criado para gerenciar seu currículo pessoal online."
    },
    {
        name: "Anders Hejlsberg",
        language: "C# / TypeScript",
        location: { lat: 47.6423, lng: -122.1369 }, // Redmond, WA (Microsoft)
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Anders_Hejlsberg_at_PDC2008.jpg/800px-Anders_Hejlsberg_at_PDC2008.jpg",
        description: "Arquiteto chefe do C# e criador do TypeScript e Delphi. Uma lenda na criação de linguagens e ferramentas de desenvolvimento."
    },
    {
        name: "Håkon Wium Lie",
        language: "CSS",
        location: { lat: 59.9139, lng: 10.7522 }, // Oslo, Norway
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Hakon_Wium_Lie_2009.jpg/800px-Hakon_Wium_Lie_2009.jpg",
        description: "Propositor do CSS (Cascading Style Sheets). Trabalhou com Tim Berners-Lee no CERN e na Opera Software."
    }
];
