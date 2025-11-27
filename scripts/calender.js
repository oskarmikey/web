// --- Configuration & Initialization ---
const calendarContainer = document.getElementById('calendar-grid');
const monthYearDisplay = document.getElementById('month-year-display');
let currentDate = new Date(); // Start with the current date

// --- Storage Key ---
const STORAGE_KEY = 'calendarData';

// --- Main Rendering Function ---
function renderCalendar(date) {
    // Clear the previous content
    calendarContainer.innerHTML = '';
    
    // Get the year and month number (0-indexed)
    const year = date.getFullYear();
    const month = date.getMonth(); 
    
    // Get the first day of the month (e.g., a Tuesday, a Sunday, etc.)
    const firstDay = new Date(year, month, 1).getDay(); 
    // Get the total number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate(); 
    
    // Update the header display
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    monthYearDisplay.textContent = `${monthNames[month]} ${year}`;
    
    // 1. Fill in blank spaces for the days before the 1st
    // Note: getDay() returns 0 for Sunday, 1 for Monday, etc.
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('calendar-day', 'empty');
        calendarContainer.appendChild(emptyCell);
    }
    
    // 2. Render the actual days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('calendar-day');
        dayCell.setAttribute('data-date', `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
        
        // Add the day number
        dayCell.innerHTML = `<span class="day-number">${day}</span>`;
        
        // Check for today's date
        const today = new Date();
        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
            dayCell.classList.add('today');
        }

        // Add the content display and set click handler for notes
        addStoredContentToDay(dayCell);
        dayCell.addEventListener('click', handleDayClick);

        calendarContainer.appendChild(dayCell);
    }
}

// --- Navigation Functions ---
function changeMonth(delta) {
    currentDate.setMonth(currentDate.getMonth() + delta);
    renderCalendar(currentDate);
}

// Attach event listeners to your (unseen) navigation buttons
document.getElementById('prev-month').addEventListener('click', () => changeMonth(-1));
document.getElementById('next-month').addEventListener('click', () => changeMonth(1));

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    // You should also initialize event listeners for navigation here
    renderCalendar(currentDate);
});