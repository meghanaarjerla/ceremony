// Event date and time: July 5, 2026 at 10:00 AM
const eventDate = new Date('2026-07-05T10:00:00').getTime();

// Update countdown every second
function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = eventDate - now;

    if (timeRemaining > 0) {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}

// Open Google Maps with venue location
function openGoogleMaps() {
    // VR Function Hall, Chanukya Nagar, Chinnamushidiwada, Pendurthi
    // Using coordinates for Pendurthi, Visakhapatnam
    const latitude = '17.7892';
    const longitude = '83.3055';
    const venueName = 'VR Function Hall, Chanukya Nagar, Chinnamushidiwada, Pendurthi';
    
    const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(venueName)}/@${latitude},${longitude},15z`;
    
    window.open(mapsUrl, '_blank');
}

// Save event to calendar (creates a downloadable .ics file)
function saveToCalendar() {
    const eventTitle = 'Seemantham Ceremony - Prabhasree & Bhanuchandar';
    const eventDate = '20260705';
    const eventTime = '100000';
    const eventEndTime = '120000'; // 2 hours event
    const eventDescription = 'Join us to welcome our little one!';
    const eventLocation = 'VR Function Hall, Chanukya Nagar, Chinnamushidiwada, Pendurthi, Visakhapatnam';
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Seemantham Ceremony//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:seemantham-ceremony-2026@ceremony.local
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${eventDate}T${eventTime}
DTEND:${eventDate}T${eventEndTime}
SUMMARY:${eventTitle}
DESCRIPTION:${eventDescription}
LOCATION:${eventLocation}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;

    // Create blob and download
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'Seemantham-Ceremony-2026.ics');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show confirmation message
    alert('Event saved! The .ics file has been downloaded. You can import it to your calendar application.');
}

// Initialize countdown on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCountdown();
    // Update countdown every second
    setInterval(updateCountdown, 1000);
});
