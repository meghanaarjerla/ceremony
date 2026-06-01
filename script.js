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

// Download calendar file with reminder
function downloadCalendarFile() {
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
BEGIN:VALARM
TRIGGER:-PT24H
ACTION:DISPLAY
DESCRIPTION:Reminder: Seemantham Ceremony - Prabhasree & Bhanuchandar
END:VALARM
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
    
    alert('Event saved! The .ics file has been downloaded. You can import it to your calendar application (Google Calendar, Outlook, Apple Calendar, etc.).');
}

// Add Google Calendar reminder
function addToGoogleCalendar() {
    const eventTitle = encodeURIComponent('Seemantham Ceremony - Prabhasree & Bhanuchandar');
    const eventDescription = encodeURIComponent('Join us to welcome our little one!');
    const eventLocation = encodeURIComponent('VR Function Hall, Chanukya Nagar, Chinnamushidiwada, Pendurthi, Visakhapatnam');
    
    // Format: YYYYMMDDTHHMM00Z (UTC time, but we'll use local)
    const startTime = '20260705T100000';
    const endTime = '20260705T120000';
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startTime}/${endTime}&details=${eventDescription}&location=${eventLocation}`;
    
    window.open(googleCalendarUrl, '_blank');
}

// Add to Outlook Calendar with reminder
function addToOutlookCalendar() {
    const eventTitle = encodeURIComponent('Seemantham Ceremony - Prabhasree & Bhanuchandar');
    const eventDescription = encodeURIComponent('Join us to welcome our little one!');
    const eventLocation = encodeURIComponent('VR Function Hall, Chanukya Nagar, Chinnamushidiwada, Pendurthi, Visakhapatnam');
    
    const outlookUrl = `https://outlook.office.com/calendar/0/deeplink/compose?subject=${eventTitle}&body=${eventDescription}&location=${eventLocation}&startTime=2026-07-05T10:00:00&endTime=2026-07-05T12:00:00`;
    
    window.open(outlookUrl, '_blank');
}

// Set local browser reminder with notification
function setLocalReminder() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                // Calculate milliseconds until event
                const now = new Date().getTime();
                const eventDateTime = new Date('2026-07-05T10:00:00').getTime();
                const timeUntilEvent = eventDateTime - now;
                
                if (timeUntilEvent > 0) {
                    // Set reminder for 24 hours before event
                    const reminderTime = timeUntilEvent - (24 * 60 * 60 * 1000);
                    
                    if (reminderTime > 0) {
                        setTimeout(() => {
                            new Notification('Seemantham Ceremony Reminder! 🎉', {
                                body: 'The event is coming up tomorrow at 10:00 AM. See you there!',
                                icon: '📅',
                                tag: 'ceremony-reminder',
                                badge: '🎊'
                            });
                        }, reminderTime);
                        
                        alert('✅ Reminder set! You will receive a notification 24 hours before the event.');
                    } else {
                        alert('⏰ The event is happening soon! You won\'t receive an advance reminder.');
                    }
                }
            } else if (permission === 'denied') {
                alert('❌ Notification permission denied. Please enable notifications in your browser settings.');
            }
        });
    } else {
        alert('⚠️ Your browser does not support notifications.');
    }
}

// Modal management
function showSaveDateModal() {
    const modal = document.getElementById('saveDateModal');
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('saveDateModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('saveDateModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Save event to calendar - navigates directly to Google Calendar and sets browser reminder
function saveToCalendar() {
    // Add to Google Calendar
    addToGoogleCalendar();
    
    // Also set a local browser reminder
    setLocalReminder();
}

// Initialize countdown on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCountdown();
    // Update countdown every second
    setInterval(updateCountdown, 1000);
});
