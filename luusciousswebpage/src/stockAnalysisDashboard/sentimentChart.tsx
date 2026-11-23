import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

import { Doughnut } from 'react-chartjs-2'
import styled from 'styled-components'
import NumberStat from './numberStat'

// Register Chart.js components
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

interface SentimentChartProps {
    positive: number;
    negative: number;
    neutral: number;
    newsTextAnalysis: any;
}

const ChartLayout = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    gap: 10px;
`;

const ChartContainer = styled.div`
    flex: 6;
    min-width: 0;
    height: 160px;
    position: relative;
`;

const NewsAnalysis = styled.div`
    flex: 4;
    min-width: 0;
`;

export default function SentimentChart({
    newsTextAnalysis
}: SentimentChartProps) {

    const sentiment = newsTextAnalysis.data.sentiment

    const data = {
        labels: ['Positive', 'Negative', 'Neutral'],
        datasets: [
            {
                data: [sentiment.pos, sentiment.neg, sentiment.neu],
                backgroundColor: [
                    '#22C55E',
                    '#EF4444',
                    '#9CA3AF'
                ],
                borderWidth: 0,
                hoverOffset: 5
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    usePointStyle: true,
                    padding: 15,
                    font: {
                        size: 11
                    }
                }
            }
        }
    };

    return (
        <ChartLayout>
            <ChartContainer>
                <Doughnut
                    data={data}
                    options={options}
                />
            </ChartContainer>
            <NewsAnalysis>
                <div style={{marginBottom: '25px'}}>News Text Analysis</div>
                <div style={{height: '35px'}}>
                    <NumberStat value={newsTextAnalysis.metadata.sentencesAnalyzed}
                                label='Sentences Analyzed'>
                    </NumberStat>
                </div>
                <div style={{height: '35px'}}>
                    <NumberStat value={newsTextAnalysis.metadata.wordAnalyzed}
                                label='Word Analyzed'>
                    </NumberStat>
                </div>
            </NewsAnalysis>
        </ChartLayout>
    );
}
