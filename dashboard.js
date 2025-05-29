// Simple chart initialization
function initCharts() {
    // Participation Chart (Doughnut)
    const participationCtx = document.getElementById('participationChart').getContext('2d');
    new Chart(participationCtx, {
        type: 'doughnut',
        data: {
            labels: ['Cricket', 'Football', 'Basketball', 'Tennis', 'Swimming', 'Badminton'],
            datasets: [{
                data: [1250, 890, 650, 420, 380, 750],
                backgroundColor: [
                    '#ff6b35',
                    '#1a659e',
                    '#f39c12',
                    '#27ae60',
                    '#3498db',
                    '#8e44ad'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Participants by Sport'
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Performance Chart (Bar)
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    new Chart(performanceCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
                label: 'Monthly Participation',
                data: [3200, 3450, 3100, 3800, 4340],
                backgroundColor: '#ff6b35',
                borderColor: '#ff6b35',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Participation Trends'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Simple button functions
function showExportMessage() {
    downloadChartData();
}

function downloadChartData() {
    // Get the chart data
    const chart = Chart.getChart('performanceChart');
    if (!chart) return;

    const labels = chart.data.labels;
    const data = chart.data.datasets[0].data;

    // Create CSV content
    let csvContent = "Month,Participation\n";
    for (let i = 0; i < labels.length; i++) {
        csvContent += `${labels[i]},${data[i]}\n`;
    }

    // Create blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", "monthly_participation_data.csv");
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize charts when page loads
document.addEventListener('DOMContentLoaded', function () {
    initCharts();
});