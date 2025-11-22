// Programming Language Popularity Benchmark Data
// Data inspired by TIOBE Index and industry trends
// Percentages represent relative popularity/market share

const benchmarkData = {
    // Years available for filtering
    years: [2020, 2021, 2022, 2023, 2024, 2025],

    // Language data with yearly popularity percentages
    languages: [
        {
            name: "Python",
            color: "#3776ab",
            icon: "🐍",
            data: {
                2020: 12.21,
                2021: 13.58,
                2022: 15.74,
                2023: 18.04,
                2024: 20.17,
                2025: 21.90
            }
        },
        {
            name: "JavaScript",
            color: "#f7df1e",
            icon: "⚡",
            data: {
                2020: 8.56,
                2021: 9.03,
                2022: 9.71,
                2023: 10.32,
                2024: 10.89,
                2025: 11.24
            }
        },
        {
            name: "Java",
            color: "#007396",
            icon: "☕",
            data: {
                2020: 16.28,
                2021: 15.45,
                2022: 14.12,
                2023: 12.98,
                2024: 11.56,
                2025: 10.82
            }
        },
        {
            name: "C#",
            color: "#239120",
            icon: "🎯",
            data: {
                2020: 6.94,
                2021: 7.28,
                2022: 7.85,
                2023: 8.92,
                2024: 9.78,
                2025: 10.51
            }
        },
        {
            name: "C++",
            color: "#00599c",
            icon: "⚙️",
            data: {
                2020: 7.11,
                2021: 7.35,
                2022: 7.62,
                2023: 7.89,
                2024: 8.12,
                2025: 8.34
            }
        },
        {
            name: "C",
            color: "#555555",
            icon: "🔧",
            data: {
                2020: 15.95,
                2021: 14.32,
                2022: 13.44,
                2023: 12.08,
                2024: 10.98,
                2025: 10.23
            }
        },
        {
            name: "TypeScript",
            color: "#3178c6",
            icon: "📘",
            data: {
                2020: 2.34,
                2021: 3.12,
                2022: 4.55,
                2023: 5.89,
                2024: 7.23,
                2025: 8.45
            }
        },
        {
            name: "Go",
            color: "#00add8",
            icon: "🐹",
            data: {
                2020: 1.89,
                2021: 2.15,
                2022: 2.67,
                2023: 3.21,
                2024: 3.78,
                2025: 4.12
            }
        },
        {
            name: "Rust",
            color: "#ce422b",
            icon: "🦀",
            data: {
                2020: 0.78,
                2021: 1.12,
                2022: 1.67,
                2023: 2.34,
                2024: 3.12,
                2025: 3.89
            }
        },
        {
            name: "PHP",
            color: "#777bb4",
            icon: "🐘",
            data: {
                2020: 5.92,
                2021: 5.43,
                2022: 4.98,
                2023: 4.45,
                2024: 3.89,
                2025: 3.45
            }
        }
    ]
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = benchmarkData;
}
