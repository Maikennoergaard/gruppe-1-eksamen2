'uses strict';

document.addEventListener("DOMContentLoaded", function() {
    fetch('menu.json')
        .then(response => response.json())
        .then(data => {
            const sandwichList = document.getElementById('sandwichul');

            // Clear existing list items to avoid duplication
            sandwichList.innerHTML = '';

            data.sandwiches.forEach(item => {
                // Create list item for each sandwich
                const listItem = document.createElement('li');

                // Create and append the name
                const itemName = document.createElement('h4');
                itemName.className = 'menuitemname';
                itemName.textContent = item.name;
                listItem.appendChild(itemName);

                // Create and append the description
                const itemDescription = document.createElement('p');
                itemDescription.className = 'menuitemtxt';
                itemDescription.textContent = item.description;
                listItem.appendChild(itemDescription);

                // Append the list item to the sandwich list
                sandwichList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error loading menu:', error));
});

