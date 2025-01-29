const quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Do what you can, with what you have, where you are.", category: "Inspiration" }
  ];
  
  // Populate categories dynamically
  function populateCategories() {
    const categorySet = new Set(quotes.map(q => q.category));
    const select = document.getElementById("categoryFilter");
    select.innerHTML = '<option value="all">All Categories</option>';
    categorySet.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      select.appendChild(option);
    });
  }
  
  // Show a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById("quoteDisplay").textContent = quotes[randomIndex].text;
  }
  
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  
  // Add new quote to the list
  function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value;
    const quoteCategory = document.getElementById("newQuoteCategory").value;
    if (quoteText && quoteCategory) {
      quotes.push({ text: quoteText, category: quoteCategory });
      localStorage.setItem("quotes", JSON.stringify(quotes));
      populateCategories();
    }
  }
  
  // Filter quotes by category
  function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const filteredQuotes = selectedCategory === "all" ? quotes : quotes.filter(q => q.category === selectedCategory);
    document.getElementById("quoteDisplay").textContent = filteredQuotes.length ? filteredQuotes[0].text : "No quotes available";
  }
  
  // Import JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      localStorage.setItem("quotes", JSON.stringify(quotes));
      populateCategories();
      alert("Quotes imported successfully!");
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Export JSON data
  function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "quotes.json";
    a.click();
  }
  
  // Load stored quotes and categories when page loads
  document.addEventListener("DOMContentLoaded", () => {
    showRandomQuote();
    populateCategories();
  });
  