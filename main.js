document.addEventListener('DOMContentLoaded', () => {
    const checkButton = document.getElementById('checkButton');
    const websiteUrlInput = document.getElementById('websiteUrl');
    const resultDiv = document.getElementById('result');
    
    checkButton.addEventListener('click', async () => {
        const websiteUrl = websiteUrlInput.value;
        if (websiteUrl.trim() === '') {
            alert('Please enter a website URL.');
            return;
        }
        
        const url = `https://domain-da-pa-check.p.rapidapi.com/?target=${websiteUrl}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '5fb4b13ba9mshbf642a318c81514p142c6bjsn9b3bacfd22d5',
                'X-RapidAPI-Host': 'domain-da-pa-check.p.rapidapi.com'
            }
        };
        
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            
            if (data.result === "success") {
                const { target, da_score, pa_score, spam_score, total_backlinks } = data.body;
                resultDiv.innerHTML = `
                    <h2>Result for <a href="${target}">${target}</a></h2>
                    <p>DA Score: ${da_score}</p>
                    <p>PA Score: ${pa_score}</p>
                    <p>Spam Score: ${spam_score}</p>
                    <p>Total Backlinks: ${total_backlinks}</p>
                `;
            } else {
                resultDiv.innerHTML = '<h2>Error:</h2><p>Failed to retrieve data for the specified website.</p>';
            }
        } catch (error) {
            console.error(error);
            resultDiv.innerHTML = '<h2>Error:</h2><p>Failed to fetch data from the API.</p>';
        }
    });
});
