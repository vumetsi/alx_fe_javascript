// Select elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

// Initialize quotes array (it will be filled from local storage or JSON)
let quotes = JSON.parse(localStorage.getItem("quotes")) || [];

// Function to save quotes to localStorage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to load quotes from JSON on first launch
function loadQuotesFromFile() {
    if (quotes.length === 0) { // Load only if localStorage is empty
        fetch("data/quotes.json")
            .then(response => response.json())
            .then(data => {
                quotes = data;
                saveQuotes();
                populateCategories();
            })
            .catch(error => console.error("Error loading quotes:", error));
    }
}

// Function to display a random quote
function showRandomQuote() {
    if (quotes.length === 0) {
        quoteDisplay.innerHTML = "No quotes available.";
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p>"${selectedQuote.text}"</p><span>- ${selectedQuote.category}</span>`;
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value.trim();
    const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (newQuoteText === "" || newQuoteCategory === "") {
        alert("Please enter both a quote and category.");
        return;
    }

    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    saveQuotes();
    populateCategories(); // Update categories if a new one is added
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
}

// Function to populate category dropdown
function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

    const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];
    uniqueCategories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Function to filter quotes by category
function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    localStorage.setItem("selectedCategory", selectedCategory);

    const filteredQuotes = (selectedCategory === "all")
        ? quotes
        : quotes.filter(quote => quote.category === sele

