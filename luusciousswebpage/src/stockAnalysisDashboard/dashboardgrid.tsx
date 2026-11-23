import { useEffect } from "react";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.css";
import { DashboardGridContent } from "./stockAnalysisDashboard";
import NumberStat from "./numberStat";
import LineChartContent from "./lineChartContent";



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
            </div>

        </div>
    );
}

export default DashboardGrid
