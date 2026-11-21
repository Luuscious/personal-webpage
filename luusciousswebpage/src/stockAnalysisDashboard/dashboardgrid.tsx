import React, { useEffect } from "react";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.css";
import { DashboardGridContent } from "./stockAnalysisDashboard";

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
                         <div>{stockData.basicInfo.marketCap}</div>
                         <div>Market cap</div>
                    </DashboardGridContent> 
                </div>
                <div className="grid-stack-item" gs-w="3">
                    <DashboardGridContent className="grid-stack-item-content">
                        <div>{stockData.basicInfo.fullTimeEmployees}</div>
                        <div>Employees</div>
                    </DashboardGridContent>
                </div>
                <div className="grid-stack-item" gs-w="3">
                    <DashboardGridContent className="grid-stack-item-content">
                        <div>{stockData.basicInfo.totalRevenue}</div>
                        <div>Total Revenue</div>
                    </DashboardGridContent>
                </div>
                <div className="grid-stack-item" gs-w="3">
                    <DashboardGridContent className="grid-stack-item-content">
                        <div>{stockData.basicInfo.trailingEps}</div>
                        <div>Earning Per Share</div>
                    </DashboardGridContent>
                </div>
            </div>

        </div>
    );
}

export default DashboardGrid
