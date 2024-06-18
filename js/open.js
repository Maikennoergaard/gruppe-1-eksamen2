'use strict';

function initMap() {
    // Dingses sted-ID
    let placeId = 'ChIJqzgsLqM_TEYR4wcxdBG0Iyw';

    // Opret et kort for at initialisere PlacesService
    let map = new google.maps.Map(document.createElement('div'));

    // Opret instansen af PlacesService
    let service = new google.maps.places.PlacesService(map);

    // Anmod om detaljer for det angivne sted
    service.getDetails({
        placeId: placeId,
        fields: ['opening_hours']
    }, function (place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            // Hvis anmodningen lykkes, opdater åbningstiderne
            updateOpeningTimes(place.opening_hours);
        } else {
            // Hvis anmodningen fejler, log en fejlmeddelelse
            console.error('Anmodning om stedsdetaljer mislykkedes med status: ' + status);
        }
    });
}

function updateOpeningTimes(openingHours) {
    // Tjek om åbningstider er tilgængelige
    if (!openingHours || !openingHours.weekday_text) {
        console.error('Ingen åbningstider tilgængelige for dette sted.');
        return;
    }

    // Få dagens dagsindeks (0 er søndag, 1 er mandag, osv.)
    let today = new Date().getDay();
    let googleApiDayIndex = (today === 0) ? 6 : today - 1;

    // Opdater dagens åbningstider
    let todayOpeningTime = openingHours.weekday_text[googleApiDayIndex];
    let openingTimesElement = document.getElementById('today-opening-time');
    if (openingTimesElement) {
        // Tjek om stedet er lukket i dag
        if (todayOpeningTime.toLowerCase().includes('lukket') || todayOpeningTime.toLowerCase().includes('closed')) {
            openingTimesElement.textContent = 'VI HAR LUKKET I DAG.';
        } else {
            // Ekstraher åbningstiden fra teksten
            let openingTime = todayOpeningTime.split(': ')[1]; // Antager formatet er "Monday: 9:00 AM – 5:00 PM"
            openingTimesElement.textContent = `VI HAR ÅBENT IDAG FRA ${openingTime}.`;
        }
    } else {
        console.error('Elementet today-opening-time blev ikke fundet.');
    }

    // Opdater hele ugens åbningstider hvis elementet findes
    let timesList = document.getElementById('times-list');
    if (timesList) {
        timesList.innerHTML = '';
        openingHours.weekday_text.forEach(function(day) {
            var listItem = document.createElement('li');
            listItem.textContent = day;
            timesList.appendChild(listItem);
        });
    }
}

// Initialiser kortet når DOM'en er fuldt indlæst
document.addEventListener('DOMContentLoaded', initMap);
// Initialiser kortet og hent åbningstiderne når vinduet er indlæst
window.onload = initMap;

