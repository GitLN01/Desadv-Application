document.addEventListener('DOMContentLoaded', () => {
    const visualization = document.getElementById('visualization');
    const pagination = document.getElementById('pagination');
    const itemsPerPage = 50; // Number of items to display per page

    loadAndDisplayData(1); // Load and display the first page of data

    function loadAndDisplayData(page) {
        const startIndex = (page - 1) * itemsPerPage + 1;
        const endIndex = startIndex + itemsPerPage - 1;

        // This generates the filename using the format A02XXXX
        const sequenceNumber = startIndex.toString().padStart(4, '0');
        const filename = `./DESADVdata/A02${sequenceNumber}.csv`;

        fetch(filename)
            .then(response => response.text())
            .then(csvData => {
                const parsedData = parseCSV(csvData);
                renderVisualization(parsedData);
                renderPagination(page);
            })
            .catch(error => {
                console.error('Error loading CSV data:', error);
            });
    }

    function parseCSV(csvData) {
        const lines = csvData.split('\n');
        const parsedData = lines.map(line => line.split(','));
        return parsedData;
    }

    function renderVisualization(data) {
        visualization.innerHTML = ''; // Clear existing visualization

        const table = document.createElement('table');
        data.forEach((rowData, rowIndex) => {
            const row = document.createElement('tr');
            rowData.forEach((cellData, cellIndex) => {
                const cell = rowIndex === 0 ? document.createElement('th') : document.createElement('td');
                cell.textContent = cellData;
                row.appendChild(cell);
            });
            table.appendChild(row);
        });
        visualization.appendChild(table);
    }

    function renderPagination(currentPage) {
        pagination.innerHTML = '';

        for (let page = 1; page <= 120; page++) { // Assuming 120 pages (6000 files / 50 items per page)
            const pageButton = document.createElement('button');
            pageButton.textContent = page;
            pageButton.addEventListener('click', () => {
                loadAndDisplayData(page);
            });
            if (page === currentPage) {
                pageButton.classList.add('active');
            }
            pagination.appendChild(pageButton);
        }
    }
});
