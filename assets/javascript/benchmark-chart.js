// Modern Line Chart for Programming Language Benchmark
// Data science style temporal visualization

(function () {
    'use strict';

    // Configuration
    const config = {
        width: 1000,
        height: 500,
        padding: { top: 40, right: 120, bottom: 60, left: 60 },
        colors: {
            grid: 'rgba(148, 163, 184, 0.1)',
            axis: 'rgba(148, 163, 184, 0.3)',
            text: '#94a3b8',
            tooltip: 'rgba(15, 23, 42, 0.95)'
        }
    };

    let visibleLanguages = new Set();
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
        if (!container) {
            console.error('Benchmark chart container not found');
            return;
        }

        // Initialize all languages as visible
        benchmarkData.languages.forEach(lang => visibleLanguages.add(lang.name));

        // Render components
        renderLegend();
        renderLineChart();
        createTooltip();
    }

    function renderLegend() {
        const legendContainer = document.querySelector('.benchmark-legend');
        if (!legendContainer) return;

        legendContainer.innerHTML = '';

        benchmarkData.languages.forEach(lang => {
            const item = document.createElement('div');
            item.className = 'legend-item';
            item.dataset.language = lang.name;

            item.innerHTML = `
                <div class="legend-color" style="background: ${lang.color};"></div>
                <span class="legend-icon">${lang.icon}</span>
                <span class="legend-name">${lang.name}</span>
            `;

            item.addEventListener('click', () => toggleLanguage(lang.name));
            legendContainer.appendChild(item);
        });
    }

    function toggleLanguage(langName) {
        if (visibleLanguages.has(langName)) {
            visibleLanguages.delete(langName);
        } else {
            visibleLanguages.add(langName);
        }

        // Update legend visual state
        document.querySelectorAll('.legend-item').forEach(item => {
            const isVisible = visibleLanguages.has(item.dataset.language);
            item.classList.toggle('inactive', !isVisible);
        });

        // Re-render chart
        renderLineChart();
    }

    function renderLineChart() {
        const container = document.getElementById('benchmarkChart');
        container.innerHTML = '';

        // Create SVG
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', config.height);
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
        const maxValue = Math.max(...allValues);
        const minValue = Math.min(...allValues);
        const yScale = (value) => config.padding.top + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;

        // Draw grid
        drawGrid(svg, years, xScale, yScale, chartHeight, maxValue, minValue);

        // Draw axes
        drawAxes(svg, years, xScale, yScale, chartWidth, chartHeight);

        // Draw lines for each language
        benchmarkData.languages.forEach(lang => {
            if (visibleLanguages.has(lang.name)) {
                drawLine(svg, lang, years, xScale, yScale);
            }
        });

        container.appendChild(svg);
    }

    function drawGrid(svg, years, xScale, yScale, chartHeight, maxValue, minValue) {
        const gridGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        gridGroup.classList.add('grid');

        // Horizontal grid lines (Y-axis)
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
            gridGroup.appendChild(line);
        }

        // Vertical grid lines (X-axis)
        years.forEach((year, index) => {
            const x = xScale(index);
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x);
            line.setAttribute('y1', config.padding.top);
            line.setAttribute('x2', x);
            line.setAttribute('y2', config.height - config.padding.bottom);
            line.setAttribute('stroke', config.colors.grid);
            line.setAttribute('stroke-width', '1');
            gridGroup.appendChild(line);
        });

        svg.appendChild(gridGroup);
    }

    function drawAxes(svg, years, xScale, yScale, chartWidth, chartHeight) {
        const axesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        axesGroup.classList.add('axes');

        // X-axis
        const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        xAxis.setAttribute('x1', config.padding.left);
        xAxis.setAttribute('y1', config.height - config.padding.bottom);
        xAxis.setAttribute('x2', config.width - config.padding.right);
        xAxis.setAttribute('y2', config.height - config.padding.bottom);
        xAxis.setAttribute('stroke', config.colors.axis);
        xAxis.setAttribute('stroke-width', '2');
        axesGroup.appendChild(xAxis);

        // Y-axis
        const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        yAxis.setAttribute('x1', config.padding.left);
        yAxis.setAttribute('y1', config.padding.top);
        yAxis.setAttribute('x2', config.padding.left);
        yAxis.setAttribute('y2', config.height - config.padding.bottom);
        yAxis.setAttribute('stroke', config.colors.axis);
        yAxis.setAttribute('stroke-width', '2');
        axesGroup.appendChild(yAxis);

        // X-axis labels (years)
        years.forEach((year, index) => {
            const x = xScale(index);
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', x);
            text.setAttribute('y', config.height - config.padding.bottom + 25);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('fill', config.colors.text);
            text.setAttribute('font-size', '14');
            text.setAttribute('font-weight', '500');
            text.textContent = year;
            axesGroup.appendChild(text);
        });

        svg.appendChild(axesGroup);
    }

    function drawLine(svg, lang, years, xScale, yScale) {
        const lineGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        lineGroup.classList.add('language-line');
        lineGroup.dataset.language = lang.name;

        // Create path for line
        let pathData = '';
        years.forEach((year, index) => {
            const x = xScale(index);
            const y = yScale(lang.data[year]);
            pathData += index === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
        });

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', lang.color);
        path.setAttribute('stroke-width', '3');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        path.classList.add('line-path');
        lineGroup.appendChild(path);

        // Add data points
        years.forEach((year, index) => {
            const x = xScale(index);
            const y = yScale(lang.data[year]);

            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', x);
            circle.setAttribute('cy', y);
            circle.setAttribute('r', '5');
            circle.setAttribute('fill', lang.color);
            circle.setAttribute('stroke', '#0f172a');
            circle.setAttribute('stroke-width', '2');
            circle.classList.add('data-point');

            // Tooltip on hover
            circle.addEventListener('mouseenter', (e) => showTooltip(e, lang, year));
            circle.addEventListener('mouseleave', hideTooltip);

            lineGroup.appendChild(circle);
        });

        svg.appendChild(lineGroup);

        // Animate line drawing
        const pathLength = path.getTotalLength();
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;
        path.style.animation = 'drawLine 1.5s ease-out forwards';
    }

    function createTooltip() {
        tooltip = document.createElement('div');
        tooltip.className = 'chart-tooltip';
        document.body.appendChild(tooltip);
    }

    function showTooltip(event, lang, year) {
        const value = lang.data[year];
        tooltip.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 4px;">
                ${lang.icon} ${lang.name}
            </div>
            <div style="font-size: 12px; color: #94a3b8;">
                ${year}: <span style="color: ${lang.color}; font-weight: 600;">${value.toFixed(2)}%</span>
            </div>
        `;
        tooltip.style.display = 'block';
        tooltip.style.left = event.pageX + 15 + 'px';
        tooltip.style.top = event.pageY - 10 + 'px';
    }

    function hideTooltip() {
        if (tooltip) {
            tooltip.style.display = 'none';
        }
    }
})();
