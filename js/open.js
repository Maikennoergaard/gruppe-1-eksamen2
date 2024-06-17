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

    let timesList = document.getElementById('times-list');
    timesList.innerHTML = '';

    openingHours.weekday_text.forEach(function (day) {
        var listItem = document.createElement('li');
        listItem.textContent = day;
        timesList.appendChild(listItem);
    });

    // Get today's day index (0 is Sunday, 1 is Monday, etc.)
    let today = new Date().getDay(); // Get JavaScript day index
    let googleApiDayIndex = (today === 0) ? 6 : today - 1; // Adjust for Google Places API

    let todayOpeningTime = openingHours.weekday_text[googleApiDayIndex];
    let openingTimesElement = document.getElementById('today-opening-time');

    // Check if the place is closed today
    if (todayOpeningTime.toLowerCase().includes('closed')) {
    openingTimesElement.textContent = 'Vi har lukket i dag.';
    } else {
    // Extract just the opening time from todayOpeningTime
    let openingTime = todayOpeningTime.split(': ')[1]; // Assuming format is "Monday: 9:00 AM – 5:00 PM"
    openingTimesElement.textContent = `Vi har åben i dag fra ${openingTime}.`;
    }

}


// Initialize the map and fetch the opening times once the window loads
window.onload = initMap;

