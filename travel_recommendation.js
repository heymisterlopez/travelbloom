document.getElementById('searchButton').addEventListener('click', fetchRecommendations);
document.getElementById('clearButton').addEventListener('click', clearResults);

function fetchRecommendations() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
      const results = [];
      if (searchInput.includes('beach')) {
        results.push(...data.beaches);
      }
      if (searchInput.includes('temple')) {
        results.push(...data.temples);
      }
      data.countries.forEach(country => {
        if (searchInput.includes(country.name.toLowerCase())) {
          results.push(...country.cities);
        }
      });

      displayResults(results);
    })
    .catch(error => console.error('Error fetching data:', error));
}

function displayResults(results) {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = '';

  results.forEach(result => {
    const resultDiv = document.createElement('div');
    resultDiv.className = 'result';
    resultDiv.innerHTML = `
      <h3>${result.name}</h3>
      <img src="${result.imageUrl}" alt="${result.name}">
      <p>${result.description}</p>
    `;
    contentDiv.appendChild(resultDiv);
  });
}

function clearResults() {
  document.getElementById('content').innerHTML = '';
  document.getElementById('searchInput').value = '';
}
