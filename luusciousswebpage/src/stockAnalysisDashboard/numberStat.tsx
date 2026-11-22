import styled from 'styled-components'
import { PrimaryColor } from './stockAnalysisDashboard'
import numabbr from 'numabbr'

const NumberDisplay = styled.div`
color: ${PrimaryColor};
font-size: 12px;
`

const LabelDisplay = styled.div`
font-weight: bold;
font-size:8px
`

const NumberStatContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    flex: 1;
`

function NumberStat({value, label, center = false}:{value: number, label: string, center?: boolean}) {
    return (
        <NumberStatContainer style={{alignItems: center ? 'center' : 'flex-start'}}>
            <NumberDisplay><div>{numabbr(value)}</div></NumberDisplay>
            <LabelDisplay><div>{label}</div></LabelDisplay>
        </NumberStatContainer>
    );
}

export default NumberStat
