// Quotes Array
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Do what you love and you’ll never work a day in your life.", category: "Career" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Motivation" },
    { text: "Stay hungry, stay foolish.", category: "Life" },
    { text: "Happiness depends upon ourselves.", category: "Happiness" }
];

// Selecting Elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");
const addQuoteBtn = document.getElementById("addQuoteBtn");
const categorySelect = document.getElementById("categorySelect");

// Function to Show Random Quote
function showRandomQuote() {
    let selectedCategory = categorySelect.value;
    let filteredQuotes = selectedCategory === "all" 
        ? quotes 
        : quotes.filter(quote => quote.category === selectedCategory);

    if (filteredQuotes.length === 0) {
        quoteDisplay.textContent = "No quotes available for this category.";
        return;
    }

    let randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    quoteDisplay.textContent = `"${filteredQuotes[randomIndex].text}" - ${filteredQuotes[randomIndex].category}`;
}

// Function to Add a New Quote
function addQuote() {
    let text = newQuoteText.value.trim();
    let category = newQuoteCategory.value.trim();

    if (text === "" || category === "") {
        alert("Please enter both quote text and a category.");
        return;
    }

    quotes.push({ text, category });

    // Update the category dropdown if a new category is added
    if (![...categorySelect.options].some(option => option.value === category)) {
        let option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    }

    newQuoteText.value = "";
    newQuoteCategory.value = "";
    showRandomQuote();
}

// Populate Category Dropdown on Load
function populateCategories() {
    let categories = [...new Set(quotes.map(q => q.category))];
    categories.forEach(category => {
        let option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    populateCategories();
    newQuoteButton.addEventListener('click', showRandomQuote);
    addQuoteBtn.addEventListener('click', addQuote);
    categorySelect.addEventListener('change', showRandomQuote);
});

