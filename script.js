document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('autocomplete-input');
    const suggestions = document.getElementById('suggestions');

    input.addEventListener('input', () => {
        const query = input.value.toLowerCase();

        if (query) {
            fetch('/autocomplete')
                .then(response => response.json())
                .then(data => {
                    const filtered = data.filter(item => item.toLowerCase().startsWith(query));
                    displaySuggestions(filtered);
                })
                .catch(error => console.error('Error fetching data:', error));
        } else {
            suggestions.innerHTML = '';
        }
    });

    function displaySuggestions(items) {
        suggestions.innerHTML = '';
        items.forEach(item => {
            const suggestion = document.createElement('div');
            suggestion.textContent = item;
            suggestion.classList.add('suggestion-item');
            suggestions.appendChild(suggestion);
        });
    }
});
