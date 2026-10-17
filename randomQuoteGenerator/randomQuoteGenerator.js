
function getNewRandomQuote() {
   fetch('https://quotes.domi.my.id/api')
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const quoteText = data.quote
        const quoteAuthor = data.from

        document.getElementById('random-quote-text').innerHTML = quoteText
        document.getElementById('random-quote-author').innerHTML = quoteAuthor
    })
    .catch(error => {
        alert('There was a problem getting a new quote!')
    });
}

getNewRandomQuote();