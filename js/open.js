'use strict';
function initMap() {
    // Dingses place ID
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
            updateOpeningTimes(place.opening_hours);
        } else {
            console.error('Place details request failed with status: ' + status);
        }
    });
}

function updateOpeningTimes(openingHours) {
    if (!openingHours || !openingHours.weekday_text) {
        console.error('No opening hours available for this place.');
        return;
    }

    // Get today's day index (0 is Sunday, 1 is Monday, etc.)
    let today = new Date().getDay();
    let googleApiDayIndex = (today === 0) ? 6 : today + 1;

    // Update today's opening hours
    let todayOpeningTime = openingHours.weekday_text[googleApiDayIndex];
    let openingTimesElement = document.getElementById('today-opening-time');
    if (openingTimesElement) {
        if (todayOpeningTime.toLowerCase().includes('lukket') || todayOpeningTime.toLowerCase().includes('closed')) {
            openingTimesElement.textContent = 'Vi har lukket i dag.';
        } else {
            let openingTime = todayOpeningTime.split(': ')[1]; // Assuming format is "Monday: 9:00 AM – 5:00 PM"
            openingTimesElement.textContent = `Vi har åben i dag fra ${openingTime}.`;
        }
    } else {
        console.error('today-opening-time element not found.');
    }

    // Update the full week's opening hours if the element exists
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

// Initialize the map when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initMap);
// Initialize the map and fetch the opening times once the window loads
window.onload = initMap;

