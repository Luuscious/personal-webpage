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

    if (!canChangeBet) {
        return
    }

    currentBetAmount = betAmount

    document.getElementById(crapsUserBetAmount).innerHTML = "$" + betAmount
}

window.addEventListener("diceRolled", function(event) {

    const dice = event.detail.dice
    const total = event.detail.total

    processDiceRoll(dice, total)

    isRoundInProgress = false

})

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

        isRoundInProgress = true;
        canChangeBet = false;

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

    const roundResult = document.getElementById("craps-round-result")
    const nextRoundButton = document.getElementById("craps-next-round-button")

    if (!roundResult) {
        console.error("craps-round-result element not found!")
        return
    }

    console.log("Showing round result...")
    console.log("Player won:", playerWon)
    console.log("Bet amount:", currentBetAmount)

    if (currentMoney <= 0) {

        roundResult.textContent = "You are out of money"

        if (nextRoundButton) {
            nextRoundButton.style.display = "none"
        }

    } else if (playerWon) {

        roundResult.textContent = `You win +$${currentBetAmount}`

        if (nextRoundButton) {
            nextRoundButton.style.display = "flex"
        }

    } else {

        roundResult.textContent = `You lose -$${currentBetAmount}`

        if (nextRoundButton) {
            nextRoundButton.style.display = "flex"
        }
    }

    console.log("Round result text:", roundResult.textContent)

    showRoundFinishGrid()
}

function showRoundFinishGrid() {

    const bettingGrid = document.getElementById("craps-betting-grid")
    const roundFinishGrid = document.getElementById("craps-round-finish-grid")

    if (!bettingGrid || !roundFinishGrid) {
        console.error("Round grids not found!")
        return
    }

    bettingGrid.style.display = "none"
    roundFinishGrid.style.display = "grid"
}

function startNextRound() {

    const bettingGrid = document.getElementById("craps-betting-grid")
    const roundFinishGrid = document.getElementById("craps-round-finish-grid")
    const rollButton = document.getElementById("dice-container")

    if (!bettingGrid || !roundFinishGrid || !rollButton) {
        console.error("Could not start next round. Element not found!")
        return
    }

    // Unlock betting
    canChangeBet = true
    isRoundInProgress = false

    // Hide round finish grid
    roundFinishGrid.style.display = "none"

    // Show betting grid
    bettingGrid.style.display = "grid"

    // Show Roll Dice button again
    rollButton.style.display = "block"

    // Reset bet amount
    currentBetAmount = minimumBet
    setBetAmount(currentBetAmount)

    // Default to EVEN
    betEven()

    console.log("Next round started")
}

function exitCrapsGame() {

    // Show final game summary
    alert(
        "Game Over!\n\n" +
        "Total Money: $" + currentMoney + "\n" +
        "Rounds Played: " + currentRounds
    )

    // Close the main game section
    document.getElementById(crapsMainSection).style.display = "none"

    // Open registration pane
    document.getElementById(crapsRegistrationPane).style.display = "block"

    // Clear username
    crapsUsername = ""
    document.getElementById(crapsUsernameInput).value = ""

    // Reset game data
    currentMoney = startingMoney
    currentRounds = startingRounds
    currentBet = bets.even
    currentBetAmount = minimumBet

    // Reset game states
    canChangeBet = true
    isRoundInProgress = false

    // Reset displayed stats
    setMoney(currentMoney)
    setRounds(currentRounds)

    // Reset betting amount display
    document.getElementById(crapsUserBetAmount).innerHTML = "$" + minimumBet

    // Reset betting selection
    document.getElementById("EVEN").style.backgroundColor = "red"
    document.getElementById("ODD").style.backgroundColor = "transparent"

    // Hide round finish grid
    document.getElementById("craps-round-finish-grid").style.display = "none"

    // Show betting grid
    document.getElementById("craps-betting-grid").style.display = "grid"

    // Show Roll Dice button
    document.getElementById("dice-container").style.display = "block"

    console.log("Craps game completely reset.")
}
