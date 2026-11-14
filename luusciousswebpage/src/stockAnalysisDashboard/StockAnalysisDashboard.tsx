// import { useState } from 'react'
// import './App.css'

function stockAnalysisDashboard() {
//   const [count, setCount] = useState(0)

  async function runStockAnalysis() {
    alert("function called!")
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
                <input id="stock-analysis-dashboard-input" type="text"></input>
                <button className="stock-analysis-dashboard-button" onClick={() => runStockAnalysis()}
                >Analyze</button>
                <div id="stock-analysis-dashboard-data"></div>
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
