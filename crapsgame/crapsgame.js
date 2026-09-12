//craps main data
let crapsUsername = ""

//Craps Game Settings
const startingMoney = 500
const startingRounds = 0
const bets = {
    even: "EVEN",
    odd: "ODD"
}
const minimumBet = 100

//HTML Element IDs
const crapsUsernameInput = "craps-username-input"
const crapsRegistrationPane = "craps-registration-pane"
const crapsMainSection = "craps-main-section"
const crapsStatsUsername = "craps-stats-username"
const crapsStatsMoney = "craps-stats-money"
const crapsStatsRounds = "craps-stats-rounds"
const crapsUserBetAmount = "craps-user-bet-amount"

//In-game variables
let currentMoney = startingMoney
let currentRounds = startingRounds
let currentBet = bets.even
let currentBetAmount = minimumBet
let canChangeBet = true
let isRoundInProgress = false

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
    document.getElementById(crapsMainSection).style.display = "block";

    // Give the browser a moment to calculate the new dimensions
    requestAnimationFrame(() => {
        if (typeof window.resizeDiceRenderer === "function") {
            window.resizeDiceRenderer();
        }
    });
}

function setUpFirstRound(){
            document.getElementById(crapsStatsUsername).innerHTML = crapsUsername
            currentMoney = startingMoney
            currentRounds = startingRounds
            currentBetAmount = minimumBet
            setMoney(currentMoney)
            setRounds(currentRounds)
            betEven()
            setBetAmount(currentBetAmount)
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


function chooseBet(bet) {

    if (isRoundInProgress) {
        return;
    }

    currentBet = bet

    document.getElementById(bet).style.backgroundColor = "red"

    const deSelectBet = bet == bets.even ? bets.odd : bets.even

    document.getElementById(deSelectBet).style.backgroundColor = "transparent"
}

function increaseBet(){

    if (isRoundInProgress) {
        return;
    }

    setBetAmount(Math.min(currentBetAmount + minimumBet, currentMoney))
}

function decreaseBet(){

    if (isRoundInProgress) {
        return;
    }

    setBetAmount(Math.max(currentBetAmount - minimumBet, minimumBet))
}

function setBetAmount(betAmount){
    if(canChangeBet){
        currentBetAmount = betAmount
    document.getElementById(crapsUserBetAmount).innerHTML = "$" + betAmount
    }
}

window.addEventListener("diceRolled", function(event) {

    const dice = event.detail.dice;
    const total = event.detail.total;

    // Process win/loss and update money
    processDiceRoll(dice, total);

    // Round is finished
    isRoundInProgress = false;

    // Bring Roll Dice button back
    const rollButton = document.getElementById("dice-container");

    if (rollButton) {
        rollButton.style.display = "block";
    }
});

function processDiceRoll(dice, total) {

    const die1 = dice[0]
    const die2 = dice[1]

    console.log("Die 1:", die1)
    console.log("Die 2:", die2)
    console.log("Total:", total)

    // Determine winning bet
    const winningBet = total % 2 === 0 ? bets.even : bets.odd;

    console.log("Winning bet:", winningBet);
    console.log("Player bet:", currentBet);
    console.log("Bet amount:", currentBetAmount);

    // Determine win/loss
    const playerWon = currentBet === winningBet;

    if (playerWon) {
        currentMoney += currentBetAmount;

        console.log("YOU WON!");
    } else {
        currentMoney -= currentBetAmount;

        console.log("YOU LOST!");
    }

    // Increase round count
    currentRounds++;

    // Update displayed stats
    setMoney(currentMoney);
    setRounds(currentRounds);

    // Show win/loss
    showRoundResult(playerWon);
}

function rollGameDice() {
    console.log("Roll Dice button clicked!");

    // Prevent another roll while this round is processing
    if (isRoundInProgress) {
        return;
    }

    const rollButton = document.getElementById("dice-container");

    if (typeof window.roll3DDice === "function") {
        console.log("3D dice function found!");

        // Lock the round
        isRoundInProgress = true;

        // Hide Roll Dice button
        rollButton.style.display = "none";

        // Roll the dice
        window.roll3DDice();

    } else {
        console.error("3D dice have not loaded yet.");
    }
}

const rollDiceButton = document.getElementById("dice-container");

if (rollDiceButton) {
    rollDiceButton.addEventListener("click", rollGameDice);
} else {
    console.error("Roll Dice button not found!");
}

function showRoundResult(playerWon) {

    const result = document.getElementById("dice-result")
    const roundResult = document.getElementById("craps-round-result")

    if (!result || !roundResult) {
        return
    }

    if (playerWon) {
        roundResult.innerHTML = `YOU WON! +$${currentBetAmount}`
    } else {
        roundResult.innerHTML = `YOU LOST! -$${currentBetAmount}`
    }

    result.style.display = "block"
}
