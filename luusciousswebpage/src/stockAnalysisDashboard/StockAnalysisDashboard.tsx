import { useState } from 'react'
// import './App.css'
import { analyzeStock } from "./stockAnalysisDashboard"
import { DNA } from 'react-loader-spinner'


function stockAnalysisDashboard() {
const [stockData, setStockData] = useState()
const [stockSymbol, setStockSymbol] = useState('');
const [isLoading, setIsLoading] = useState(false)
const [gotData, setGotData] = useState(false)

function goBack(){
    setGotData(false)
    setIsLoading(false)
}

    async function runStockAnalysis() {
        setIsLoading(true)
        const gotStockData = await analyzeStock(stockSymbol)
        if (gotStockData){
            setStockData(gotStockData)
            setGotData(true)
            setIsLoading(false)
        }  else{
            goBack()
        }  
    }

    if (gotData) {
        return (
            <div>
                <div onClick={() => goBack()}>Back</div>
                <div>{JSON.stringify(stockData)}</div>
            </div>
        )
    }

  return (
    <>
        <section id="center">
            <h1>Get started with Stock Analysis</h1>
            <div>
                <div id="stock-analysis-dashboard-title">STOCK ANALYSIS DASHBOARD</div>
                {isLoading ? (
                    <div>
                        <DNA
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                            />
                    </div>
                ) : (
                    <div>
                        <div id="stock-analysis-dashboard-subtitle">
                            Put in a Stock symbol you would like to analyze(e.g MSFT)
                        </div>
                
                        <input
                        value={stockSymbol}
                        onChange={e => setStockSymbol(e.target.value)}
                        ></input>
                        <button className="stock-analysis-dashboard-button" onClick={() => runStockAnalysis()}
                        >Analyze</button>
                    </div>
                )}
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
