// Programming Language Benchmark Chart
// Animated chart with year-based filtering

(function () {
    'use strict';

    // Wait for DOM and data to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBenchmark);
    } else {
        initBenchmark();
    }

    function initBenchmark() {
        // Check if benchmark data is available
        if (typeof benchmarkData === 'undefined') {
            console.error('Benchmark data not loaded');
            return;
        }

        const chartContainer = document.getElementById('benchmarkChart');
        if (!chartContainer) {
            console.error('Benchmark chart container not found');
            return;
        }

        // Current selected year (default to latest)
        let currentYear = benchmarkData.years[benchmarkData.years.length - 1];

        // Initialize the benchmark
        renderYearSelector();
        renderChart(currentYear);

        // Year selector rendering
        function renderYearSelector() {
            const controlsContainer = document.querySelector('.benchmark-controls');
            if (!controlsContainer) return;

            const yearSelector = document.createElement('div');
            yearSelector.className = 'year-selector';

            benchmarkData.years.forEach(year => {
                const btn = document.createElement('button');
                btn.className = 'year-btn';
                btn.textContent = year;
                btn.dataset.year = year;

                if (year === currentYear) {
                    btn.classList.add('active');
                }

                btn.addEventListener('click', () => {
                    currentYear = year;
                    updateActiveYear();
                    renderChart(year);
                });

                yearSelector.appendChild(btn);
            });

            controlsContainer.appendChild(yearSelector);
        }

        // Update active year button
        function updateActiveYear() {
            document.querySelectorAll('.year-btn').forEach(btn => {
                btn.classList.toggle('active', parseInt(btn.dataset.year) === currentYear);
            });
        }

        // Main chart rendering function
        function renderChart(year) {
            // Get data for selected year and sort by popularity
            const yearData = benchmarkData.languages
                .map(lang => ({
                    ...lang,
                    value: lang.data[year],
                    trend: calculateTrend(lang, year)
                }))
                .sort((a, b) => b.value - a.value);

            // Clear existing chart
            chartContainer.innerHTML = '';

            // Create chart bars container
            const barsContainer = document.createElement('div');
            barsContainer.className = 'chart-bars';

            // Find max value for scaling
            const maxValue = Math.max(...yearData.map(d => d.value));

            // Render each language bar
            yearData.forEach((lang, index) => {
                const barElement = createLanguageBar(lang, index + 1, maxValue);
                barsContainer.appendChild(barElement);

                // Stagger animation
                setTimeout(() => {
                    barElement.style.animationDelay = `${index * 0.1}s`;
                }, 10);
            });

            chartContainer.appendChild(barsContainer);
        }

        // Create individual language bar
        function createLanguageBar(lang, rank, maxValue) {
            const barWrapper = document.createElement('div');
            barWrapper.className = 'language-bar';

            // Calculate percentage width
            const percentage = (lang.value / maxValue) * 100;

            // Get lighter version of color for gradient
            const colorLight = lightenColor(lang.color, 20);

            barWrapper.innerHTML = `
        <div class="language-info">
          <span class="language-rank">#${rank}</span>
          <span class="language-icon">${lang.icon}</span>
          <span class="language-name">${lang.name}</span>
          ${renderTrendIndicator(lang.trend)}
          <span class="language-percentage">${lang.value.toFixed(2)}%</span>
        </div>
        <div class="bar-container">
          <div class="bar-fill" style="
            --bar-color: ${lang.color};
            --bar-color-light: ${colorLight};
            --bar-color-rgb: ${hexToRgb(lang.color)};
            width: ${percentage}%;
          "></div>
        </div>
      `;

            return barWrapper;
        }

        // Calculate trend compared to previous year
        function calculateTrend(lang, year) {
            const yearIndex = benchmarkData.years.indexOf(year);
            if (yearIndex === 0) return 'stable'; // First year, no comparison

            const previousYear = benchmarkData.years[yearIndex - 1];
            const currentValue = lang.data[year];
            const previousValue = lang.data[previousYear];

            const change = currentValue - previousValue;
            const changePercent = ((change / previousValue) * 100).toFixed(1);

            if (Math.abs(change) < 0.1) return { type: 'stable', value: 0 };
            if (change > 0) return { type: 'up', value: changePercent };
            return { type: 'down', value: Math.abs(changePercent) };
        }

        // Render trend indicator
        function renderTrendIndicator(trend) {
            if (trend === 'stable' || trend.type === 'stable') {
                return '<span class="trend-indicator trend-stable">━</span>';
            }

            if (trend.type === 'up') {
                return `<span class="trend-indicator trend-up">↑ ${trend.value}%</span>`;
            }

            if (trend.type === 'down') {
                return `<span class="trend-indicator trend-down">↓ ${trend.value}%</span>`;
            }

            return '';
        }

        // Utility: Lighten hex color
        function lightenColor(hex, percent) {
            const num = parseInt(hex.replace('#', ''), 16);
            const amt = Math.round(2.55 * percent);
            const R = (num >> 16) + amt;
            const G = (num >> 8 & 0x00FF) + amt;
            const B = (num & 0x0000FF) + amt;
            return '#' + (
                0x1000000 +
                (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
                (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
                (B < 255 ? (B < 1 ? 0 : B) : 255)
            ).toString(16).slice(1);
        }

        // Utility: Convert hex to RGB
        function hexToRgb(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result
                ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
                : '102, 126, 234';
        }
    }
})();
