
document.addEventListener("DOMContentLoaded", function () {
    // Wait for the page to fully load before executing the script

    fetch('https://api.prolook.com/api/colors/prolook')
        // Fetch data from the Color API endpoint
        .then(response => response.json())
        // Parse the JSON response
        .then(data => {
            if (data.success) {
                // If API request is successful
                const colors = data.colors; // Extract colors array from API response
                const colorTable = document.getElementById('colorTable').getElementsByTagName('tbody')[0]; // Get the table body element
                const colorBox = document.getElementById('colorBox'); // Get the color box element
                const colorInfo = document.getElementById('colorInfo'); // Get the color information element

                colors.forEach(color => {
                    // Loop through each color object in the colors array
                    const row = colorTable.insertRow(); // Insert a new row in the color table
                    const nameCell = row.insertCell(0); // Insert a cell for color name in the new row
                    const buttonCell = row.insertCell(1); // Insert a cell for the button in the new row

                    nameCell.textContent = color.name; // Set the text content of the name cell to the color name

                    const button = document.createElement('button'); // Create a new button element
                    button.textContent = 'Preview'; // Set button text content
                    button.className = 'btn btn-primary'; // Set button classes

                    button.addEventListener('click', () => {
                        // Add click event listener to the preview button
                        colorBox.style.backgroundColor = `#${color.hex_code}`; // Set color box background color
                        colorInfo.innerHTML = `<span>Name: ${color.name}</span><span>Color Code: ${color.color_code}</span><span>Hex Code: ${color.hex_code}</span>`; // Update color information
                        colorInfo.style.color = parseInt(color.hex_code, 16) > 0xffffff / 2 ? 'black' : 'white'; // Set text color based on background brightness
                    });

                    buttonCell.className = 'text-right-align'; // Set class for button cell alignment
                    buttonCell.appendChild(button); // Append button to button cell

                });
            }
        })
        .catch(error => console.error('Error fetching the color data:', error)); // Log error if API request fails
});


