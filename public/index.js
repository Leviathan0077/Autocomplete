const search = document.getElementById('search');
const match = document.getElementById('match-list');

// Search states in JSON file
const searchStates = async searchText => {
    try {
        const res = await fetch('http://localhost:8001/data/states');
        const states = await res.json();

        // Get matches to current text input
        let matches = states.filter(state => {
            const regex = new RegExp(`^${searchText}`, 'gi');
            return state.name.match(regex) || state.abbr.match(regex);
        });

        if (searchText.length === 0) {
            matches = [];
            match.innerHTML = '';
        }

        outputHtml(matches);
    } catch (error) {
        console.error('Error fetching states:', error);
    }
};

// Show results in HTML
const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
            <div class="card card-body mb-1">
                <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
                <small>Lat: ${match.lat} / Long: ${match.long}</small><br>
                <small>Local Speciality: ${match.dish}</small><br>
                <small>Regional Dialects: ${match.dialects.join(', ')}</small><br>
                <small>Tourist Locations: ${match.tourist_locations.join(', ')}</small>
            </div>
        `).join('');

        match.innerHTML = html;
    } else {
        match.innerHTML = '<p>No matches found</p>';
    }
};

search.addEventListener('input', () => searchStates(search.value));
