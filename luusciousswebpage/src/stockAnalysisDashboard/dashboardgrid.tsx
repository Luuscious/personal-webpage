import { useEffect } from "react";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.css";
import { DashboardGridContent } from "./stockAnalysisDashboard";
import NumberStat from "./numberStat";
import LineChartContent from "./lineChartContent";
import NewsLinks from "./newsLinks";
import SentimentChart from "./sentimentChart";

function DashboardGrid({stockData}:{stockData: any}) {
    useEffect(() => {
        GridStack.init();
    }, []);
    
    return (
        <div>
            <div className="grid-stack">
                {/* First Row */}
                <div className="grid-stack-item" gs-w="3">
                    <DashboardGridContent className="grid-stack-item-content">
                        <NumberStat
                         value={stockData.basicInfo.marketCap}
                         label='Market Cap'
                         center={true}
                        ></NumberStat>
                    </DashboardGridContent> 
                </div>
                <div className="grid-stack-item" gs-w="3">
                    <DashboardGridContent className="grid-stack-item-content">
                        <NumberStat
                         value={stockData.basicInfo.fullTimeEmployees}
                         label='Employees'
                         center={true}
                         ></NumberStat>
                    </DashboardGridContent>
                </div>
                <div className="grid-stack-item" gs-w="3">
                    <DashboardGridContent className="grid-stack-item-content">
                        <NumberStat
                         value={stockData.basicInfo.totalRevenue}
                         label='Total Revenue'
                         center={true}
                         ></NumberStat>
                    </DashboardGridContent>
                </div>
                <div className="grid-stack-item" gs-w="3">
                    <DashboardGridContent className="grid-stack-item-content">
                        <NumberStat
                         value={stockData.basicInfo.trailingEps}
                         label='Earnings Per Share'
                         center={true}
                         ></NumberStat>
                    </DashboardGridContent>
                </div>

                {/* Second Row */}
                <div className="grid-stack-item" gs-w="10" gs-h="4">
                    <DashboardGridContent className="grid-stack-item-content">
                        <LineChartContent 
                            priceHistory={stockData.priceHistory}>
                        </LineChartContent>
                    </DashboardGridContent>
                </div>
                <div className="grid-stack-item" gs-w="2" gs-h="2">
                    <DashboardGridContent className="grid-stack-item-content">
                        <div>
                                <div style={{marginBottom: '10px'}}>Future Earnings</div>
                            {stockData.futureEarningsDates.map((nextDate: string) => (
                                <div key={nextDate} style={{ display: 'block' }}>
                                    {nextDate}
                                </div>
                            ))} 
                        </div>     
                    </DashboardGridContent>
                </div>

                {/* Third Row */}
                <div className="grid-stack-item" gs-w="6" gs-h="3">
                    <DashboardGridContent className="grid-stack-item-content">
                            <NewsLinks
                                newsLinks={stockData.newsArticles}
                                maxItems={5}
                                newsPageLink="https://your-news-page.com"
                            />
                    </DashboardGridContent>
                </div>

                {/* fourth Row */}
                <div className="grid-stack-item" gs-w="6" gs-h="3">
                    <DashboardGridContent className="grid-stack-item-content">
                        <SentimentChart
                            positive={65}
                            negative={20}
                            neutral={15}
                            newsTextAnalysis={stockData.newsTextAnalysis}
                        />
                    </DashboardGridContent>
                </div>

                {/* fourth Row */}
                <div className="grid-stack-item" gs-w="2" gs-h="2">
                    <DashboardGridContent className="grid-stack-item-content">
                        <a
                        href={stockData.wordCloudUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download="stock-news-wordcloud.png"
                    >
                        <img
                            src={stockData.wordCloudUrl}
                            alt="Stock news word cloud"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                cursor: 'pointer'
                            }}
                        />
                    </a>
                    </DashboardGridContent>
                </div>
            </div>

        </div>
    );
}

export default DashboardGrid
