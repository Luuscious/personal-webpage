//craps main data
let crapsUsername = ""

//Craps Game Settings
const startingMoney = 1000
const startingRounds = 0
const bets = {
    even: "EVEN",
    odd: "ODD"
}

//HTML Element IDs
const crapsUsernameInput = "craps-username-input"
const crapsRegistrationPane = "craps-registration-pane"
const crapsMainSection = "craps-main-section"
const crapsStatsUsername = "craps-stats-username"
const crapsStatsMoney = "craps-stats-money"
const crapsStatsRounds = "craps-stats-rounds"

//In-game variables
let currentMoney = startingMoney
let currentRounds = startingRounds
let currentBet = bets.even

function registerCrapsPlayer(){
		crapsUsername = document.getElementById(crapsUsernameInput).value

        //Username validation check
        let firstCharIsDigitRegex = /^[0-9]|[^a-zA-Z0-9_]/g
        if (crapsUsername.length < 5 || firstCharIsDigitRegex.test(crapsUsername)){
            alert("Username must be at least 5 characters long, alphanumeric only, no spaces and cannot start with a number")
        } else {
            removeRegistrationPane()
            showMainGameSection()
            setUpFirstRound()
        } 
	}

function removeRegistrationPane(){
            document.getElementById(crapsRegistrationPane).style.display = "none"
    } 

function showMainGameSection(){
            document.getElementById(crapsMainSection).style.display = "block"
    }

function setUpFirstRound(){
            document.getElementById(crapsStatsUsername).innerHTML = crapsUsername
            currentMoney = startingMoney
            currentRounds = startingRounds
            setMoney(currentMoney)
            setRounds(currentRounds)
            betEven()
    }

function setMoney(money){
            document.getElementById(crapsStatsMoney).innerHTML = money
    }

function setRounds(rounds){
            document.getElementById(crapsStatsRounds).innerHTML = rounds
    }

function betEven(){
            chooseBet(bets.even)
    }

function betOdd(){
            chooseBet(bets.odd)
    }


function chooseBet(bet){
            currentBet = bet
            document.getElementById(bet).style.backgroundColor = "red"
            const deSelectBet = bet == bets.even ? bets.odd : bets.even
            document.getElementById(deSelectBet).style.backgroundColor = "transparent"
    }