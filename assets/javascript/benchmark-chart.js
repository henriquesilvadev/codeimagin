// Professional Dark Theme Benchmark Chart
// Monochromatic, dashboard-style visualization

(function () {
    'use strict';

    // Configuration
    const config = {
        width: 1000,
        height: 500,
        padding: { top: 40, right: 60, bottom: 60, left: 60 },
        colors: {
            grid: 'rgba(255, 255, 255, 0.1)', // Subtle grid for dark theme
            axis: 'var(--text-muted)',
            text: 'var(--text-secondary)',
            lineDefault: 'var(--text-muted)',
            lineActive: 'var(--accent-tertiary)',  // System Purple
            tooltipBg: 'var(--bg-primary)',
            tooltipBorder: 'var(--border-color)'
        }
    };

    // State
    let activeLanguage = null; // Single active language for professional focus
    let chartSvg, tooltip;

    // Wait for DOM and data
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBenchmark);
    } else {
        initBenchmark();
    }

    function initBenchmark() {
        if (typeof benchmarkData === 'undefined') {
            console.error('Benchmark data not loaded');
            return;
        }

        const container = document.getElementById('benchmarkChart');
        if (!container) return;

        // Set initial active language (e.g., Python)
        activeLanguage = benchmarkData.languages[0].name;

        // Render components
        renderSidebar();
        renderLineChart();
        createTooltip();
    }

    function renderSidebar() {
        const sidebarList = document.getElementById('benchmarkSidebarList');
        if (!sidebarList) return;

        sidebarList.innerHTML = '';

        benchmarkData.languages.forEach(lang => {
            const item = document.createElement('div');
            item.className = 'sidebar-item';
            item.textContent = lang.name; // Text only, no icons
            item.dataset.language = lang.name;

            if (lang.name === activeLanguage) {
                item.classList.add('active');
            }

            item.addEventListener('click', () => selectLanguage(lang.name));
            sidebarList.appendChild(item);
        });
    }

    function selectLanguage(langName) {
        activeLanguage = langName;

        // Update sidebar UI
        document.querySelectorAll('.sidebar-item').forEach(item => {
            if (item.dataset.language === langName) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update Chart UI (re-render to bring active line to front)
        renderLineChart();
    }

    function renderLineChart() {
        const container = document.getElementById('benchmarkChart');
        container.innerHTML = '';

        // Create SVG
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewBox', `0 0 ${config.width} ${config.height}`);
        svg.classList.add('line-chart-svg');
        chartSvg = svg;

        // Calculate chart dimensions
        const chartWidth = config.width - config.padding.left - config.padding.right;
        const chartHeight = config.height - config.padding.top - config.padding.bottom;

        // Create scales
        const years = benchmarkData.years;
        const xScale = (yearIndex) => config.padding.left + (yearIndex / (years.length - 1)) * chartWidth;

        const allValues = benchmarkData.languages.flatMap(lang =>
            years.map(year => lang.data[year])
        );
        const maxValue = Math.max(...allValues) * 1.1; // Add 10% headroom
        const minValue = 0; // Start from 0 for better context
        const yScale = (value) => config.padding.top + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;

        // Draw grid and axes
        drawGrid(svg, years, xScale, yScale, chartHeight, maxValue, minValue);
        drawAxes(svg, years, xScale, yScale, chartWidth, chartHeight);

        // Draw lines
        // First draw inactive lines (background)
        benchmarkData.languages.forEach(lang => {
            if (lang.name !== activeLanguage) {
                drawLine(svg, lang, years, xScale, yScale, false);
            }
        });

        // Then draw active line (foreground)
        const activeLangData = benchmarkData.languages.find(l => l.name === activeLanguage);
        if (activeLangData) {
            drawLine(svg, activeLangData, years, xScale, yScale, true);
        }

        container.appendChild(svg);
    }

    function drawGrid(svg, years, xScale, yScale, chartHeight, maxValue, minValue) {
        const gridGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        gridGroup.classList.add('grid');

        // Horizontal grid lines
        const ySteps = 5;
        for (let i = 0; i <= ySteps; i++) {
            const value = minValue + (maxValue - minValue) * (i / ySteps);
            const y = yScale(value);

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', config.padding.left);
            line.setAttribute('y1', y);
            line.setAttribute('x2', config.width - config.padding.right);
            line.setAttribute('y2', y);
            line.setAttribute('stroke', config.colors.grid);
            line.setAttribute('stroke-width', '1');
            line.setAttribute('stroke-dasharray', '4 4'); // Dashed grid
            gridGroup.appendChild(line);
        }

        svg.appendChild(gridGroup);
    }

    function drawAxes(svg, years, xScale, yScale, chartWidth, chartHeight) {
        const axesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');

        // X-axis labels
        years.forEach((year, index) => {
            const x = xScale(index);
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', x);
            text.setAttribute('y', config.height - config.padding.bottom + 25);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('fill', config.colors.text);
            text.setAttribute('font-size', '12');
            text.setAttribute('font-family', 'Inter, sans-serif');
            text.textContent = year;
            axesGroup.appendChild(text);
        });

        svg.appendChild(axesGroup);
    }

    function drawLine(svg, lang, years, xScale, yScale, isActive) {
        const lineGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        lineGroup.classList.add('language-line');

        // Create path
        let pathData = '';
        years.forEach((year, index) => {
            const x = xScale(index);
            const y = yScale(lang.data[year]);
            // Simple straight lines for professional look, or slight curve
            // Using straight lines for "data science" precision often better, but smooth is requested before.
            // Let's use Catmull-Rom or simple L for now. L is cleaner.
            pathData += index === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
        });

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', isActive ? config.colors.lineActive : config.colors.lineDefault);
        path.setAttribute('stroke-width', isActive ? '3' : '1.5');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        path.classList.add('line-path');
        if (isActive) path.classList.add('active');

        // Add hover interaction to inactive lines to make them active temporarily
        if (!isActive) {
            path.addEventListener('mouseenter', () => {
                path.setAttribute('stroke', 'var(--text-primary)'); // Highlight on hover
                path.setAttribute('stroke-width', '2');
            });
            path.addEventListener('mouseleave', () => {
                path.setAttribute('stroke', config.colors.lineDefault);
                path.setAttribute('stroke-width', '1.5');
            });
            // Click to select
            path.addEventListener('click', () => selectLanguage(lang.name));
            path.style.cursor = 'pointer';
        }

        lineGroup.appendChild(path);

        // Data points (only for active line or on hover? Let's show for active)
        if (isActive) {
            const pointsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            pointsGroup.classList.add('data-points-group');

            years.forEach((year, index) => {
                const x = xScale(index);
                const y = yScale(lang.data[year]);

                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', x);
                circle.setAttribute('cy', y);
                circle.setAttribute('r', '4');
                circle.setAttribute('fill', config.colors.lineActive); // Fill with active color
                circle.setAttribute('stroke', 'var(--bg-secondary)'); // Match bg
                circle.setAttribute('stroke-width', '2');
                circle.classList.add('data-point');

                // Tooltip
                circle.addEventListener('mouseenter', (e) => showTooltip(e, lang, year));
                circle.addEventListener('mouseleave', hideTooltip);

                pointsGroup.appendChild(circle);
            });
            lineGroup.appendChild(pointsGroup);
        }

        svg.appendChild(lineGroup);
    }

    function createTooltip() {
        tooltip = document.createElement('div');
        tooltip.className = 'chart-tooltip';
        document.body.appendChild(tooltip);
    }

    function showTooltip(event, lang, year) {
        const value = lang.data[year];
        tooltip.innerHTML = `
            <div class="tooltip-year">${year}</div>
            <div class="tooltip-value" style="color: ${config.colors.lineActive}">
                ${value.toFixed(1)}%
            </div>
            <div style="font-size: 0.8rem; color: #94a3b8; margin-top: 2px;">
                ${lang.name}
            </div>
        `;
        tooltip.style.display = 'block';
        tooltip.style.left = event.pageX + 15 + 'px';
        tooltip.style.top = event.pageY - 15 + 'px';
    }

    function hideTooltip() {
        if (tooltip) {
            tooltip.style.display = 'none';
        }
    }
})();
