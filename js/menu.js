document.addEventListener("DOMContentLoaded", function() {
    const url = "../json/data.json";
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const sandwichList = document.getElementById('sandwichul');
            const sodtList = document.getElementById('sodtul');
            const drikkeList = document.getElementById('drikkeul');

            // Clear existing list items to avoid duplication
            sandwichList.innerHTML = '';
            sodtList.innerHTML = '';
            drikkeList.innerHTML = '';

            // Load sandwich data
            data.sandwiches.forEach(item => {
                const listItem = createMenuItem(item.name, item.description, item.vegetarian);
                sandwichList.appendChild(listItem);
            });

            // Load SØDT data
            data.sodt.forEach(item => {
                const listItem = createMenuItem(item.name, item.description);
                sodtList.appendChild(listItem);
            });

            // Load DRIKKEVARER data
            data.drikkevarer.forEach(item => {
                if (item.name === "KAFFE") {
                    // Create a list item for the coffee section
                    const coffeeItem = document.createElement('li');
                    
                    // Create and append the name
                    const itemName = document.createElement('h4');
                    itemName.className = 'menuitemname';
                    itemName.textContent = item.name;
                    coffeeItem.appendChild(itemName);

                    // Create and append each coffee description
                    item.items.forEach(coffee => {
                        const coffeeDescription = document.createElement('p');
                        coffeeDescription.className = 'menuitemtxt';
                        coffeeDescription.textContent = coffee.description;
                        coffeeItem.appendChild(coffeeDescription);
                    });

                    drikkeList.appendChild(coffeeItem);
                } else {
                    const listItem = createMenuItem(item.name, item.description);
                    drikkeList.appendChild(listItem);
                }
            });
        })
        .catch(error => console.error('Error loading menu:', error));

    function createMenuItem(name, description, isVegetarian) {
        const listItem = document.createElement('li');
        
        // Create a container for name and icon
        const nameContainer = document.createElement('div');
        nameContainer.style.display = 'flex';
        nameContainer.style.alignItems = 'center';
        
        // Create and append the name
        const itemName = document.createElement('h4');
        itemName.className = 'menuitemname';
        itemName.textContent = name;
        nameContainer.appendChild(itemName);
        
        // Append vegetarian icon if necessary
        if (isVegetarian) {
            const vegetarianIcon = document.createElement('img');
            vegetarianIcon.className = 'bladicon';
            vegetarianIcon.src = '/img/icon/blad.webp';
            vegetarianIcon.alt = 'vegetar icon';
            vegetarianIcon.style.marginLeft = '0.5em';
            nameContainer.appendChild(vegetarianIcon);
        }

        listItem.appendChild(nameContainer);

        // If there is a description, create and append it
        if (description) {
            const itemDescription = document.createElement('p');
            itemDescription.className = 'menuitemtxt';
            itemDescription.textContent = description;
            listItem.appendChild(itemDescription);
        }
        
        return listItem;
    }
});







