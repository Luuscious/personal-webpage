import { useState } from 'react'
// import './App.css'
import { analyzeStock,
         VerticalAlignContainer,
         VerticalAlignContent,
         DashboardGridContainer
        } from "./stockAnalysisDashboard"
import { DNA } from 'react-loader-spinner'
import './stockAnalysisDashboard.css'
import DashboardGrid from './dashboardgrid'


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
            <VerticalAlignContainer>
                <VerticalAlignContent>
                    <DashboardGridContainer>
                        <div>
                            <div onClick={() => goBack()}>Back</div>
                            <div>
                                <DashboardGrid
                                    stockData={stockData}
                                ></DashboardGrid>
                                {/* {JSON.stringify(stockData)} */}
                            </div>
                        </div>
                    </DashboardGridContainer>
                </VerticalAlignContent>
            </VerticalAlignContainer>
        )
    }

  return (
    <VerticalAlignContainer>
        <VerticalAlignContent>
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
        </VerticalAlignContent>
    </VerticalAlignContainer>
  )
}

export default stockAnalysisDashboard
