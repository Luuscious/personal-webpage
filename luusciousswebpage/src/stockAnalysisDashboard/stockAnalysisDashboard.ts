import styled from 'styled-components'


export async function analyzeStock(stockSymbolToAnalyze: string){
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
    console.log(data.wordCloudUrl);

    return data
}

export const PrimaryColor = '#7495a8'

export const VerticalAlignContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: table;
    
`

export const VerticalAlignContent = styled.div`
    display: table-cell;
    vertical-align: middle;
`

export const DashboardGridContainer = styled.div`
    width: 80%;
    margin: 0 auto;
    border: solid 1px red;
`

export const DashboardGridContent = styled.div`
    background-color: white;
    border-radius: 5px;
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    align-items: stretch;
`