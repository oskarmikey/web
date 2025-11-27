// --- Storage Functions ---
function getCalendarData() {
    // Retrieve data from localStorage and parse it. Returns an empty object if no data exists.
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
}

function saveCalendarData(dateKey, content) {
    const data = getCalendarData();
    data[dateKey] = content; // Store or overwrite the content for the specific date key
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    
    // Re-render the calendar or just update the specific cell
    renderCalendar(currentDate); 
}

// --- Day Click Handler (for input/edit) ---
function handleDayClick(event) {
    const dayCell = event.currentTarget;
    const dateKey = dayCell.getAttribute('data-date');
    const existingData = getCalendarData()[dateKey] || '';
    
    // Use the browser's prompt for simple input (you can use a custom modal for better UI)
    const newContent = prompt(`Enter note for ${dateKey}:`, existingData);
    
    if (newContent !== null) { // User didn't click 'Cancel'
        saveCalendarData(dateKey, newContent.trim());
    }
}

// --- Content Display Function ---
function addStoredContentToDay(dayCell) {
    const dateKey = dayCell.getAttribute('data-date');
    const data = getCalendarData();
    const content = data[dateKey];
    
    if (content) {
        // Create a dedicated element to show the stored info
        const contentEl = document.createElement('div');
        contentEl.classList.add('calendar-note');
        // Truncate long content for display in the small cell
        contentEl.textContent = content.substring(0, 30) + (content.length > 30 ? '...' : ''); 
        dayCell.appendChild(contentEl);
        
        // Add a class to style days with notes
        dayCell.classList.add('has-note');
    }
}