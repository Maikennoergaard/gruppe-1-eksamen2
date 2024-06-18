document.addEventListener("DOMContentLoaded", function() {
    // Definerer URL'en til JSON-datafilen
    const url = "../json/data.json";
    
    // Henter data fra den angivne URL
    fetch(url)
        .then(response => response.json())  // Konverterer svaret til JSON
        .then(data => {
            // Henter listeelementerne fra DOM'en
            const sandwichList = document.getElementById('sandwichul');
            const sodtList = document.getElementById('sodtul');
            const drikkeList = document.getElementById('drikkeul');

            // Tilføjer den statiske tekst "Alle sandwich 89kr" først
            const staticItem = document.createElement('li');
            const staticText = document.createElement('h4');
            staticText.className = 'alefred';
            staticText.id = 'prismenu';
            staticText.textContent = 'Alle sandwich 89kr';
            staticItem.appendChild(staticText);
            sandwichList.appendChild(staticItem);

            // Ryd eksisterende listeelementer (undtagen den statiske tekst) for at undgå duplikering
            while (sandwichList.children.length > 1) {
                sandwichList.removeChild(sandwichList.lastChild);
            }
            sodtList.innerHTML = '';
            drikkeList.innerHTML = '';

            // Indlæser sandwich data
            data.sandwiches.forEach(item => {
                const listItem = createMenuItem(item.name, item.description, item.vegetarian);
                sandwichList.appendChild(listItem);
            });

            // Indlæser SØDT data
            data.sodt.forEach(item => {
                const listItem = createMenuItem(item.name, item.description);
                sodtList.appendChild(listItem);
            });

            // Indlæser DRIKKEVARER data
            data.drikkevarer.forEach(item => {
                if (item.name === "KAFFE") {
                    // Opretter et listeelement for kaffesektionen
                    const coffeeItem = document.createElement('li');
                    
                    // Opretter og tilføjer navnet
                    const itemName = document.createElement('h4');
                    itemName.className = 'menuitemname';
                    itemName.textContent = item.name;
                    coffeeItem.appendChild(itemName);

                    // Opretter og tilføjer hver kaffe beskrivelse
                    item.items.forEach(coffee => {
                        const coffeeDescription = document.createElement('p');
                        coffeeDescription.className = 'menuitemtxt';
                        coffeeDescription.textContent = coffee.description;
                        coffeeItem.appendChild(coffeeDescription);
                    });

                    drikkeList.appendChild(coffeeItem);
                } else if (item.name === "DINGSEVAND") {
                    // Håndterer DINGSEVAND specielt for at inkludere smag
                    const listItem = document.createElement('li');

                    // Opretter og tilføjer navnet
                    const itemName = document.createElement('h4');
                    itemName.className = 'menuitemname';
                    itemName.textContent = item.name;
                    listItem.appendChild(itemName);

                    // Opretter og tilføjer beskrivelsen
                    const itemDescription = document.createElement('p');
                    itemDescription.className = 'menuitemtxt';
                    itemDescription.textContent = item.description;
                    listItem.appendChild(itemDescription);

                    // Opretter og tilføjer smagen
                    const itemTaste = document.createElement('p');
                    itemTaste.className = 'menuitemtxt';
                    itemTaste.textContent = item.taste;
                    listItem.appendChild(itemTaste);

                    drikkeList.appendChild(listItem);
                } else {
                    const listItem = createMenuItem(item.name, item.description);
                    drikkeList.appendChild(listItem);
                }
            });
        })
        .catch(error => console.error('Fejl ved indlæsning af menu:', error));

    // Funktion til at oprette et menu element
    function createMenuItem(name, description, isVegetarian) {
        const listItem = document.createElement('li');
        
        // Opretter en container til navn og ikon
        const nameContainer = document.createElement('div');
        nameContainer.style.display = 'flex';
        nameContainer.style.alignItems = 'center';
        
        // Opretter og tilføjer navnet
        const itemName = document.createElement('h4');
        itemName.className = 'menuitemname';
        itemName.textContent = name;
        nameContainer.appendChild(itemName);
        
        // Tilføjer vegetar ikon hvis nødvendigt
        if (isVegetarian) {
            const vegetarianIcon = document.createElement('img');
            vegetarianIcon.className = 'bladicon';
            vegetarianIcon.src = '/img/icon/bladgroen.png';
            vegetarianIcon.alt = 'vegetar ikon';
            vegetarianIcon.style.marginLeft = '0.5em';
            nameContainer.appendChild(vegetarianIcon);
        }

        listItem.appendChild(nameContainer);

        // Hvis der er en beskrivelse, opretter og tilføjer den
        if (description) {
            const itemDescription = document.createElement('p');
            itemDescription.className = 'menuitemtxt';
            itemDescription.textContent = description;
            listItem.appendChild(itemDescription);
        }
        
        return listItem;
    }
});








