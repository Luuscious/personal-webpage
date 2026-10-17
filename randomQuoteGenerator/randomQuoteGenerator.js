const randomQuoteGeneratorElement = document.getElementById('random-quote-generator')

const colors = [
    // 1. Soft & Feminine
    ["#F5E6D3", "#B76E79"],
    // 2. Quiet Luxury
    ["#FAF3E0", "#B08D57"],
    // 3. Sage & Cream
    ["#F4F1E8", "#70856A"],
    // 4. Lavender Dream
    ["#EDE4F5", "#957DAD"],
    // 5. Tech Blue
    ["#DCEBFA", "#4169A1"],
    // 6. Modern Monochrome
    ["#242424", "#BFC3C7"],
    // 7. Chocolate & Caramel
    ["#38251D", "#B98252"],
    // 8. Peach Glow
    ["#FCE4D6", "#E68A73"],
    // 9. Forest Luxury
    ["#183D32", "#66816A"],
    // 10. Fresh & Modern
    ["#DDF3F5", "#75B7A4"],
    // 11. Burgundy Elegance
    ["#4A1528", "#B86F7A"],
    // 12. Butter & Apricot
    ["#FFF1C9", "#E8A66A"],
    // 13. Midnight & Gold
    ["#101820", "#D4AF37"],
    // 14. Ocean Breeze
    ["#D6F1F5", "#287D8E"],
    // 15. Blush & Plum
    ["#F7DDE2", "#754668"],
    // 16. Terracotta & Sand
    ["#E2725B", "#EAD2AC"],
    // 17. Emerald & Mint
    ["#064E3B", "#A7F3D0"],
    // 18. Sunset Glow
    ["#FFB36B", "#D95D83"],
    // 19. Ice Blue & Silver
    ["#EAF4F4", "#829CA7"],
    // 20. Mocha & Ivory
    ["#6F4E37", "#FFF8E7"]
];

function getNewRandomQuote() {
   fetch('https://quotes.domi.my.id/api')
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const colorCombos = colors[
            Math.floor(Math.random() * colors.length)
        ]
        randomQuoteGeneratorElement.style.background =  `linear-gradient(135deg, ${colorCombos[0]}, ${colorCombos[1]})`
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