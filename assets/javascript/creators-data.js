const creatorsData = [
    // Pioneers
    {
        name: "Ada Lovelace",
        language: "Primeira Programadora",
        country: "Reino Unido",
        location: { lat: 51.5074, lng: -0.1278 }, // London, UK
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/800px-Ada_Lovelace_portrait.jpg",
        description: "Escreveu o primeiro algoritmo para ser processado por uma máquina, a Máquina Analítica de Charles Babbage."
    },
    {
        name: "Alan Turing",
        language: "Ciência da Computação",
        country: "Reino Unido",
        location: { lat: 53.4808, lng: -2.2426 }, // Manchester, UK
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Alan_Turing_Aged_16.jpg/800px-Alan_Turing_Aged_16.jpg",
        description: "Pai da ciência da computação teórica e da inteligência artificial."
    },
    {
        name: "Grace Hopper",
        language: "COBOL",
        country: "EUA",
        location: { lat: 38.8719, lng: -77.0563 }, // Arlington, VA
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Commodore_Grace_M._Hopper%2C_USN_%28covered%29.jpg/800px-Commodore_Grace_M._Hopper%2C_USN_%28covered%29.jpg",
        description: "Pioneira na programação de computadores e criadora do primeiro compilador. Popularizou o termo 'bug'."
    },
    // Modern Languages
    {
        name: "Brendan Eich",
        language: "JavaScript",
        country: "EUA",
        location: { lat: 37.3861, lng: -122.0839 }, // Mountain View, CA
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Brendan_Eich_Mozilla_Foundation_official_photo.jpg/800px-Brendan_Eich_Mozilla_Foundation_official_photo.jpg",
        description: "Criador do JavaScript e co-fundador da Mozilla."
    },
    {
        name: "Guido van Rossum",
        language: "Python",
        country: "Holanda",
        location: { lat: 52.3676, lng: 4.9041 }, // Amsterdam, Netherlands
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Guido_van_Rossum_OSCON_2006.jpg/800px-Guido_van_Rossum_OSCON_2006.jpg",
        description: "Criador da linguagem Python."
    },
    {
        name: "James Gosling",
        language: "Java",
        country: "Canadá",
        location: { lat: 51.0447, lng: -114.0719 }, // Calgary, Canada (Birthplace)
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/James_Gosling_2008.jpg/800px-James_Gosling_2008.jpg",
        description: "Pai da linguagem Java."
    },
    {
        name: "Dennis Ritchie",
        language: "C",
        country: "EUA",
        location: { lat: 40.6815, lng: -74.3999 }, // Murray Hill, NJ
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Dennis_Ritchie_2011.jpg/800px-Dennis_Ritchie_2011.jpg",
        description: "Criador da linguagem C e do Unix."
    },
    {
        name: "Bjarne Stroustrup",
        language: "C++",
        country: "Dinamarca",
        location: { lat: 56.1629, lng: 10.2039 }, // Aarhus, Denmark
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Bjarne-stroustrup.jpg/800px-Bjarne-stroustrup.jpg",
        description: "Criador do C++."
    },
    {
        name: "José Valim",
        language: "Elixir",
        country: "Brasil",
        location: { lat: -23.5505, lng: -46.6333 }, // São Paulo, Brazil
        photo: "https://avatars.githubusercontent.com/u/9582?v=4",
        description: "Criador da linguagem Elixir, focada em concorrência e produtividade."
    },
    {
        name: "Yukihiro Matsumoto",
        language: "Ruby",
        country: "Japão",
        location: { lat: 35.4684, lng: 133.0488 }, // Matsue, Japan
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Yukihiro_Matsumoto.JPG/800px-Yukihiro_Matsumoto.JPG",
        description: "Criador da linguagem Ruby."
    },
    {
        name: "Rasmus Lerdorf",
        language: "PHP",
        country: "Groenlândia",
        location: { lat: 64.1814, lng: -51.6941 }, // Nuuk, Greenland (Birthplace)
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Rasmus_Lerdorf_at_FrOSCon_2010.jpg/800px-Rasmus_Lerdorf_at_FrOSCon_2010.jpg",
        description: "Criador do PHP."
    },
    {
        name: "Anders Hejlsberg",
        language: "C# / TypeScript",
        country: "Dinamarca",
        location: { lat: 55.6761, lng: 12.5683 }, // Copenhagen, Denmark
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Anders_Hejlsberg_at_PDC2008.jpg/800px-Anders_Hejlsberg_at_PDC2008.jpg",
        description: "Arquiteto chefe do C# e criador do TypeScript."
    },
    {
        name: "Linus Torvalds",
        language: "Linux / Git",
        country: "Finlândia",
        location: { lat: 60.1699, lng: 24.9384 }, // Helsinki, Finland
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg/800px-LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg",
        description: "Criador do kernel Linux e do sistema de controle de versão Git."
    },
    {
        name: "Ken Thompson",
        language: "Go / B / Unix",
        country: "EUA",
        location: { lat: 29.9511, lng: -90.0715 }, // New Orleans, LA
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Ken_Thompson_%28programmer%29_2019.jpg/800px-Ken_Thompson_%28programmer%29_2019.jpg",
        description: "Co-criador do Unix, criador da linguagem B e co-criador do Go."
    },
    {
        name: "Rob Pike",
        language: "Go",
        country: "Canadá",
        location: { lat: 49.2827, lng: -123.1207 }, // Vancouver, Canada
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Rob_Pike_-_GopherCon_2014.jpg/800px-Rob_Pike_-_GopherCon_2014.jpg",
        description: "Co-criador da linguagem Go e desenvolvedor chave do Unix."
    },
    {
        name: "Ryan Dahl",
        language: "Node.js / Deno",
        country: "EUA",
        location: { lat: 32.7157, lng: -117.1611 }, // San Diego, CA
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Ryan_Dahl.jpg/800px-Ryan_Dahl.jpg",
        description: "Criador do Node.js e do Deno."
    },
    {
        name: "Rich Hickey",
        language: "Clojure",
        country: "EUA",
        location: { lat: 40.7128, lng: -74.0060 }, // New York, NY
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rich_Hickey_at_Clojure_Conj_2013.jpg/800px-Rich_Hickey_at_Clojure_Conj_2013.jpg",
        description: "Criador da linguagem Clojure."
    },
    {
        name: "Evan You",
        language: "Vue.js",
        country: "China",
        location: { lat: 31.2304, lng: 121.4737 }, // Shanghai, China (Origin)
        photo: "https://avatars.githubusercontent.com/u/499550?v=4",
        description: "Criador do framework Vue.js."
    },
    {
        name: "Jordan Walke",
        language: "React",
        country: "EUA",
        location: { lat: 37.4848, lng: -122.1484 }, // Menlo Park, CA (Facebook)
        photo: "https://pbs.twimg.com/profile_images/1257120238/jordan_400x400.jpg",
        description: "Criador do React no Facebook."
    },
    {
        name: "Lars Bak",
        language: "V8 / Dart",
        country: "Dinamarca",
        location: { lat: 56.1629, lng: 10.2039 }, // Aarhus, Denmark
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Lars_Bak_2009.jpg/800px-Lars_Bak_2009.jpg",
        description: "Co-criador do motor V8 JavaScript e da linguagem Dart."
    },
    {
        name: "Kasper Lund",
        language: "Dart",
        country: "Dinamarca",
        location: { lat: 56.1629, lng: 10.2039 }, // Aarhus, Denmark
        photo: "https://pbs.twimg.com/profile_images/1765763566/kasper_400x400.jpg",
        description: "Co-criador da linguagem Dart."
    },
    {
        name: "Graydon Hoare",
        language: "Rust",
        country: "Canadá",
        location: { lat: 49.2827, lng: -123.1207 }, // Vancouver, Canada
        photo: "https://avatars.githubusercontent.com/u/1466?v=4",
        description: "Criador da linguagem Rust."
    },
    {
        name: "Chris Lattner",
        language: "Swift / LLVM",
        country: "EUA",
        location: { lat: 37.3318, lng: -122.0312 }, // Cupertino, CA
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Chris_Lattner_at_WWDC_2016.jpg/800px-Chris_Lattner_at_WWDC_2016.jpg",
        description: "Criador do Swift e do projeto LLVM."
    },
    {
        name: "Martin Odersky",
        language: "Scala",
        country: "Alemanha",
        location: { lat: 46.5197, lng: 6.6323 }, // Lausanne, Switzerland (EPFL)
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Martin_Odersky_2011.jpg/800px-Martin_Odersky_2011.jpg",
        description: "Criador da linguagem Scala."
    },
    {
        name: "James Strachan",
        language: "Groovy",
        country: "Reino Unido",
        location: { lat: 51.5074, lng: -0.1278 }, // London, UK
        photo: "https://avatars.githubusercontent.com/u/130684?v=4",
        description: "Criador da linguagem Groovy."
    },
    {
        name: "Gavin King",
        language: "Ceylon",
        country: "Austrália",
        location: { lat: -37.8136, lng: 144.9631 }, // Melbourne, Australia
        photo: "https://avatars.githubusercontent.com/u/32576?v=4",
        description: "Criador do Hibernate e da linguagem Ceylon."
    },
    {
        name: "Andrey Breslav",
        language: "Kotlin",
        country: "Rússia",
        location: { lat: 59.9343, lng: 30.3351 }, // St. Petersburg, Russia
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Andrey_Breslav_at_KotlinConf_2018.jpg/800px-Andrey_Breslav_at_KotlinConf_2018.jpg",
        description: "Designer principal da linguagem Kotlin."
    },
    {
        name: "Slava Pestov",
        language: "Factor",
        country: "EUA",
        location: { lat: 37.7749, lng: -122.4194 }, // San Francisco, CA
        photo: "https://avatars.githubusercontent.com/u/20564?v=4",
        description: "Criador da linguagem Factor."
    },
    {
        name: "Larry Wall",
        language: "Perl",
        country: "EUA",
        location: { lat: 34.0522, lng: -118.2437 }, // Los Angeles, CA
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Larry_Wall_YAPC_2007.jpg/800px-Larry_Wall_YAPC_2007.jpg",
        description: "Criador da linguagem Perl."
    },
    {
        name: "John McCarthy",
        language: "Lisp",
        country: "EUA",
        location: { lat: 42.3601, lng: -71.0589 }, // Boston, MA (MIT)
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/John_McCarthy_Stanford.jpg/800px-John_McCarthy_Stanford.jpg",
        description: "Criador do Lisp e pioneiro da IA."
    },
    {
        name: "Niklaus Wirth",
        language: "Pascal",
        country: "Suíça",
        location: { lat: 47.3769, lng: 8.5417 }, // Zurich, Switzerland
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Niklaus_Wirth_2014.jpg/800px-Niklaus_Wirth_2014.jpg",
        description: "Criador do Pascal, Modula-2 e Oberon."
    },
    {
        name: "Jean Ichbiah",
        language: "Ada",
        country: "França",
        location: { lat: 48.8566, lng: 2.3522 }, // Paris, France
        photo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Jean_Ichbiah.jpg/220px-Jean_Ichbiah.jpg",
        description: "Designer principal da linguagem Ada."
    },
    {
        name: "Bertrand Meyer",
        language: "Eiffel",
        country: "França",
        location: { lat: 48.8566, lng: 2.3522 }, // Paris, France
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Bertrand_Meyer_recent.jpg/800px-Bertrand_Meyer_recent.jpg",
        description: "Criador da linguagem Eiffel."
    },
    {
        name: "Roberto Ierusalimschy",
        language: "Lua",
        country: "Brasil",
        location: { lat: -22.9068, lng: -43.1729 }, // Rio de Janeiro, Brazil
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Roberto_Ierusalimschy_2009.jpg/800px-Roberto_Ierusalimschy_2009.jpg",
        description: "Um dos criadores da linguagem Lua."
    },
    {
        name: "Luiz Henrique de Figueiredo",
        language: "Lua",
        country: "Brasil",
        location: { lat: -22.9068, lng: -43.1729 }, // Rio de Janeiro, Brazil
        photo: "https://www.inf.puc-rio.br/~lhf/lhf.jpg",
        description: "Co-criador da linguagem Lua."
    },
    {
        name: "Waldemar Celes",
        language: "Lua",
        country: "Brasil",
        location: { lat: -22.9068, lng: -43.1729 }, // Rio de Janeiro, Brazil
        photo: "https://www.inf.puc-rio.br/~celes/celes.jpg",
        description: "Co-criador da linguagem Lua."
    },
    {
        name: "Simon Peyton Jones",
        language: "Haskell",
        country: "Reino Unido",
        location: { lat: 52.2053, lng: 0.1218 }, // Cambridge, UK
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Simon_Peyton_Jones_2016.jpg/800px-Simon_Peyton_Jones_2016.jpg",
        description: "Um dos principais designers da linguagem Haskell."
    },
    {
        name: "Don Syme",
        language: "F#",
        country: "Austrália",
        location: { lat: 52.2053, lng: 0.1218 }, // Cambridge, UK (Microsoft Research)
        photo: "https://avatars.githubusercontent.com/u/102372?v=4",
        description: "Criador da linguagem F#."
    },
    {
        name: "Xavier Leroy",
        language: "OCaml",
        country: "França",
        location: { lat: 48.8566, lng: 2.3522 }, // Paris, France
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Xavier_Leroy_2012.jpg/800px-Xavier_Leroy_2012.jpg",
        description: "Arquiteto principal da linguagem OCaml."
    },
    {
        name: "Joe Armstrong",
        language: "Erlang",
        country: "Reino Unido",
        location: { lat: 59.3293, lng: 18.0686 }, // Stockholm, Sweden (Ericsson)
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Joe_Armstrong_Erlang_Factory_SF_2015.jpg/800px-Joe_Armstrong_Erlang_Factory_SF_2015.jpg",
        description: "Co-criador da linguagem Erlang."
    },
    {
        name: "Robert Griesemer",
        language: "Go",
        country: "Suíça",
        location: { lat: 47.3769, lng: 8.5417 }, // Zurich, Switzerland
        photo: "https://go.dev/images/gophers/biplane.svg", // Placeholder Gopher
        description: "Co-criador da linguagem Go."
    },
    {
        name: "Jeremy Ashkenas",
        language: "CoffeeScript",
        country: "EUA",
        location: { lat: 40.7128, lng: -74.0060 }, // New York, NY
        photo: "https://avatars.githubusercontent.com/u/19218?v=4",
        description: "Criador do CoffeeScript, Backbone.js e Underscore.js."
    },
    {
        name: "John Resig",
        language: "jQuery",
        country: "EUA",
        location: { lat: 42.3601, lng: -71.0589 }, // Boston, MA
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/John_Resig_2009.jpg/800px-John_Resig_2009.jpg",
        description: "Criador da biblioteca jQuery."
    },
    {
        name: "Misko Hevery",
        language: "AngularJS",
        country: "EUA",
        location: { lat: 37.3861, lng: -122.0839 }, // Mountain View, CA
        photo: "https://avatars.githubusercontent.com/u/111951?v=4",
        description: "Criador do AngularJS."
    },
    {
        name: "Guillermo Rauch",
        language: "Socket.io / Next.js",
        country: "Argentina",
        location: { lat: 37.7749, lng: -122.4194 }, // San Francisco, CA
        photo: "https://avatars.githubusercontent.com/u/13041?v=4",
        description: "Criador do Socket.io e CEO da Vercel (Next.js)."
    },
    {
        name: "Satoshi Nakamoto",
        language: "Bitcoin Script",
        country: "Desconhecido",
        location: { lat: 35.6762, lng: 139.6503 }, // Tokyo, Japan (Symbolic)
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png",
        description: "Criador anônimo do Bitcoin e sua linguagem de script."
    },
    {
        name: "Vitalik Buterin",
        language: "Solidity (Ethereum)",
        country: "Rússia / Canadá",
        location: { lat: 43.6532, lng: -79.3832 }, // Toronto, Canada
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Vitalik_Buterin_TechCrunch_London_2015_%28cropped%29.jpg/800px-Vitalik_Buterin_TechCrunch_London_2015_%28cropped%29.jpg",
        description: "Co-fundador do Ethereum e proponente dos smart contracts."
    },
    {
        name: "Gavin Wood",
        language: "Solidity",
        country: "Reino Unido",
        location: { lat: 51.5074, lng: -0.1278 }, // London, UK
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Gavin_Wood_Web3_Summit_2018.jpg/800px-Gavin_Wood_Web3_Summit_2018.jpg",
        description: "Criador da linguagem Solidity e co-fundador do Ethereum."
    },
    {
        name: "Dan Abramov",
        language: "Redux",
        country: "Rússia",
        location: { lat: 51.5074, lng: -0.1278 }, // London, UK
        photo: "https://avatars.githubusercontent.com/u/810438?v=4",
        description: "Co-criador do Redux e Create React App."
    },
    {
        name: "Rich Harris",
        language: "Svelte",
        country: "Reino Unido",
        location: { lat: 40.7128, lng: -74.0060 }, // New York, NY (Journalism)
        photo: "https://avatars.githubusercontent.com/u/1162160?v=4",
        description: "Criador do framework Svelte."
    },
    {
        name: "Taylor Otwell",
        language: "Laravel",
        country: "EUA",
        location: { lat: 34.7465, lng: -92.2896 }, // Little Rock, AR
        photo: "https://avatars.githubusercontent.com/u/463230?v=4",
        description: "Criador do framework Laravel (PHP)."
    },
    {
        name: "Fabien Potencier",
        language: "Symfony",
        country: "França",
        location: { lat: 50.6292, lng: 3.0573 }, // Lille, France
        photo: "https://avatars.githubusercontent.com/u/47313?v=4",
        description: "Criador do framework Symfony (PHP)."
    },
    {
        name: "DHH (David Heinemeier Hansson)",
        language: "Ruby on Rails",
        country: "Dinamarca",
        location: { lat: 41.8781, lng: -87.6298 }, // Chicago, IL
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/David_Heinemeier_Hansson_2014.jpg/800px-David_Heinemeier_Hansson_2014.jpg",
        description: "Criador do Ruby on Rails."
    },
    {
        name: "Django Team (Adrian Holovaty)",
        language: "Django",
        country: "EUA",
        location: { lat: 38.9784, lng: -95.2353 }, // Lawrence, KS
        photo: "https://avatars.githubusercontent.com/u/140370?v=4",
        description: "Co-criador do framework Django (Python)."
    },
    {
        name: "Armin Ronacher",
        language: "Flask",
        country: "Áustria",
        location: { lat: 48.2082, lng: 16.3738 }, // Vienna, Austria
        photo: "https://avatars.githubusercontent.com/u/1677?v=4",
        description: "Criador do framework Flask (Python)."
    },
    {
        name: "Tj Holowaychuk",
        language: "Express.js",
        country: "Canadá",
        location: { lat: 48.4284, lng: -123.3656 }, // Victoria, BC
        photo: "https://avatars.githubusercontent.com/u/25254?v=4",
        description: "Criador prolífico de ferramentas Node.js como Express e Koa."
    },
    {
        name: "Mike Bostock",
        language: "D3.js",
        country: "EUA",
        location: { lat: 37.7749, lng: -122.4194 }, // San Francisco, CA
        photo: "https://avatars.githubusercontent.com/u/230541?v=4",
        description: "Criador da biblioteca D3.js para visualização de dados."
    },
    {
        name: "Hadley Wickham",
        language: "R (Tidyverse)",
        country: "Nova Zelândia",
        location: { lat: 29.7604, lng: -95.3698 }, // Houston, TX
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Hadley-wickham2016.jpg/800px-Hadley-wickham2016.jpg",
        description: "Cientista chefe do RStudio e criador do Tidyverse."
    },
    {
        name: "Wes McKinney",
        language: "Pandas",
        country: "EUA",
        location: { lat: 40.7128, lng: -74.0060 }, // New York, NY
        photo: "https://avatars.githubusercontent.com/u/329591?v=4",
        description: "Criador da biblioteca Pandas para Python."
    },
    {
        name: "Travis Oliphant",
        language: "NumPy / SciPy",
        country: "EUA",
        location: { lat: 30.2672, lng: -97.7431 }, // Austin, TX
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Travis_Oliphant_2013.jpg/800px-Travis_Oliphant_2013.jpg",
        description: "Criador do NumPy e fundador da Anaconda."
    },
    {
        name: "Sebastian Bergmann",
        language: "PHPUnit",
        country: "Alemanha",
        location: { lat: 50.9375, lng: 6.9603 }, // Cologne, Germany
        photo: "https://avatars.githubusercontent.com/u/25218?v=4",
        description: "Criador do PHPUnit."
    },
    {
        name: "Kent Beck",
        language: "JUnit / TDD",
        country: "EUA",
        location: { lat: 42.8607, lng: -122.6742 }, // Medford, OR
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Kent_Beck_Mural.jpg/800px-Kent_Beck_Mural.jpg",
        description: "Criador do JUnit e pai do Extreme Programming (XP)."
    },
    {
        name: "Erich Gamma",
        language: "JUnit / VS Code",
        country: "Suíça",
        location: { lat: 47.3769, lng: 8.5417 }, // Zurich, Switzerland
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Erich_Gamma_at_JAOO_2008.jpg/800px-Erich_Gamma_at_JAOO_2008.jpg",
        description: "Um dos Gang of Four e líder do desenvolvimento do VS Code."
    },
    {
        name: "Chris Wanstrath",
        language: "GitHub",
        country: "EUA",
        location: { lat: 37.7749, lng: -122.4194 }, // San Francisco, CA
        photo: "https://avatars.githubusercontent.com/u/2?v=4",
        description: "Co-fundador do GitHub."
    },
    {
        name: "Tom Preston-Werner",
        language: "GitHub / Jekyll",
        country: "EUA",
        location: { lat: 37.7749, lng: -122.4194 }, // San Francisco, CA
        photo: "https://avatars.githubusercontent.com/u/1?v=4",
        description: "Co-fundador do GitHub e criador do Jekyll."
    },
    {
        name: "PJ Hyett",
        language: "GitHub",
        country: "EUA",
        location: { lat: 37.7749, lng: -122.4194 }, // San Francisco, CA
        photo: "https://avatars.githubusercontent.com/u/3?v=4",
        description: "Co-fundador do GitHub."
    },
    {
        name: "Mitchell Hashimoto",
        language: "Terraform / Vagrant",
        country: "EUA",
        location: { lat: 34.0522, lng: -118.2437 }, // Los Angeles, CA
        photo: "https://avatars.githubusercontent.com/u/1299?v=4",
        description: "Fundador da HashiCorp e criador do Vagrant e Terraform."
    },
    {
        name: "Solomon Hykes",
        language: "Docker",
        country: "França",
        location: { lat: 37.7749, lng: -122.4194 }, // San Francisco, CA (Docker HQ)
        photo: "https://avatars.githubusercontent.com/u/1060?v=4",
        description: "Criador do Docker."
    },
    {
        name: "Shay Banon",
        language: "Elasticsearch",
        country: "Israel",
        location: { lat: 32.0853, lng: 34.7818 }, // Tel Aviv, Israel
        photo: "https://avatars.githubusercontent.com/u/47582?v=4",
        description: "Criador do Elasticsearch."
    },
    {
        name: "Salvatore Sanfilippo",
        language: "Redis",
        country: "Itália",
        location: { lat: 37.5079, lng: 15.0830 }, // Catania, Italy
        photo: "https://avatars.githubusercontent.com/u/65216?v=4",
        description: "Criador do Redis."
    },
    {
        name: "Michael Stonebraker",
        language: "PostgreSQL",
        country: "EUA",
        location: { lat: 42.3601, lng: -71.0589 }, // Boston, MA (MIT)
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Michael_Stonebraker_2015.jpg/800px-Michael_Stonebraker_2015.jpg",
        description: "Pioneiro em banco de dados, co-criador do Ingres e Postgres."
    },
    {
        name: "D. Richard Hipp",
        language: "SQLite",
        country: "EUA",
        location: { lat: 35.2271, lng: -80.8431 }, // Charlotte, NC
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/D._Richard_Hipp_2018.jpg/800px-D._Richard_Hipp_2018.jpg",
        description: "Criador do SQLite."
    },
    {
        name: "Eliot Horowitz",
        language: "MongoDB",
        country: "EUA",
        location: { lat: 40.7128, lng: -74.0060 }, // New York, NY
        photo: "https://avatars.githubusercontent.com/u/10952?v=4",
        description: "Co-fundador e ex-CTO da MongoDB."
    },
    {
        name: "Lars Rasmussen",
        language: "Google Maps",
        country: "Dinamarca",
        location: { lat: 55.6761, lng: 12.5683 }, // Copenhagen, Denmark
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Lars_Rasmussen_2009.jpg/800px-Lars_Rasmussen_2009.jpg",
        description: "Co-criador do Google Maps."
    },
    {
        name: "Jens Eilstrup Rasmussen",
        language: "Google Maps",
        country: "Dinamarca",
        location: { lat: 55.6761, lng: 12.5683 }, // Copenhagen, Denmark
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Lars_Rasmussen_2009.jpg/800px-Lars_Rasmussen_2009.jpg", // Using brother's photo as placeholder or generic
        description: "Co-criador do Google Maps."
    },
    {
        name: "Paul Graham",
        language: "Lisp (Arc) / Y Combinator",
        country: "Reino Unido",
        location: { lat: 51.5074, lng: -0.1278 }, // London, UK
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Paul_Graham_2005.jpg/800px-Paul_Graham_2005.jpg",
        description: "Programador Lisp, ensaísta e co-fundador da Y Combinator."
    },
    {
        name: "John Carmack",
        language: "Game Dev (Doom/Quake)",
        country: "EUA",
        location: { lat: 32.7767, lng: -96.7970 }, // Dallas, TX
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/John_Carmack_GDC_2010.jpg/800px-John_Carmack_GDC_2010.jpg",
        description: "Lendário programador de jogos, pioneiro em gráficos 3D."
    },
    {
        name: "Tim Sweeney",
        language: "Unreal Engine",
        country: "EUA",
        location: { lat: 35.7796, lng: -78.6382 }, // Raleigh, NC
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Tim_Sweeney_GCAP_2012.jpg/800px-Tim_Sweeney_GCAP_2012.jpg",
        description: "Criador da Unreal Engine e fundador da Epic Games."
    },
    {
        name: "Markus Persson",
        language: "Minecraft (Java)",
        country: "Suécia",
        location: { lat: 59.3293, lng: 18.0686 }, // Stockholm, Sweden
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Markus_Persson_GDC_2011.jpg/800px-Markus_Persson_GDC_2011.jpg",
        description: "Criador do Minecraft (Notch)."
    }
];
