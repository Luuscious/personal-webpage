const stockAnalysisDashboardInput = 'stock-analysis-dashboard-input'

async function analyzeStock(){
    document.getElementById('stock-analysis-dashboard-data').innerHTML = ''

    const stockSymbolToAnalyze = document.getElementById(stockAnalysisDashboardInput).value

    if (stockSymbolToAnalyze.length == 0){
        alert("you must put in a ticker symbol before running the analysis")
        return
    }
    
    const url = 'http://127.0.0.1:5000/analyze-stock/' + stockSymbolToAnalyze

    const response = await fetch(url)
    if (!response.ok) {
        const error = await response.text();
        console.error('Backend error:', error);
        alert('There was a problem getting the analysis for your stock');
        return;
    }

    const data = await response.json()
    console.log(data)
    document.getElementById('stock-analysis-dashboard-data').innerHTML = JSON.stringify(data)
}