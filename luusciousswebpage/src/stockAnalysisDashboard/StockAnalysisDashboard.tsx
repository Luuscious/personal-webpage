import { useState } from 'react'
// import './App.css'
import { analyzeStock } from "./stockAnalysisDashboard"

function stockAnalysisDashboard() {
const [stockData, setStockData] = useState()
const [stockSymbol, setStockSymbol] = useState('');

  async function runStockAnalysis() {
    const getStockData = await analyzeStock(stockSymbol)
    setStockData(getStockData)
  }

  return (
    <>
        <section id="center">
            <h1>Get started with Stock Analysis</h1>
            <div>
                <div id="stock-analysis-dashboard-title">STOCK ANALYSIS DASHBOARD</div>
                <div id="stock-analysis-dashboard-subtitle">
                    Put in a Stock symbol you would like to analyze(e.g MSFT)
                </div>
                <input
                value={stockSymbol}
                onChange={e => setStockSymbol(e.target.value)}
                ></input>
                <button className="stock-analysis-dashboard-button" onClick={() => runStockAnalysis()}
                >Analyze</button>
                <div>
                    {JSON.stringify(stockData)}
                </div>
            </div>
                
            {/* <button
                type="button"
                className="counter"
                onClick={() => setCount((count) => count + 1)}
                >
                Count is {count}
            </button> */}
        </section>
      <div className="ticks"></div>
    </>
  )
}

export default stockAnalysisDashboard
