// Craps Game Settings
const GAME_SETTINGS = {
    startingMoney: 500,
    startingRounds: 0,
    minimumBet: 100
}

const BETS = {
    EVEN: "EVEN",
    ODD: "ODD"
}

// Game State
const gameState = {
    username: "",
    money: GAME_SETTINGS.startingMoney,
    rounds: GAME_SETTINGS.startingRounds,
    bet: BETS.EVEN,
    betAmount: GAME_SETTINGS.minimumBet,
    canChangeBet: true,
    roundInProgress: false
}

//HTML Element IDs
const crapsUsernameInput = "craps-username-input"
const crapsRegistrationPane = "craps-registration-pane"
const crapsMainSection = "craps-main-section"
const crapsStatsUsername = "craps-stats-username"
const crapsStatsMoney = "craps-stats-money"
const crapsStatsRounds = "craps-stats-rounds"
const crapsUserBetAmount = "craps-user-bet-amount"

// DOM Elements
const crapsElements = {
    usernameInput: document.getElementById(crapsUsernameInput),
    registrationPane: document.getElementById(crapsRegistrationPane),
    mainSection: document.getElementById(crapsMainSection),
    statsUsername: document.getElementById(crapsStatsUsername),
    statsMoney: document.getElementById(crapsStatsMoney),
    statsRounds: document.getElementById(crapsStatsRounds),
    userBetAmount: document.getElementById(crapsUserBetAmount),

    rollButton: document.getElementById("dice-container"),
    bettingGrid: document.getElementById("craps-betting-grid"),
    roundFinishGrid: document.getElementById("craps-round-finish-grid"),
    roundResult: document.getElementById("craps-round-result"),
    nextRoundButton: document.getElementById("craps-next-round-button"),
    evenButton: document.getElementById("EVEN"),
    oddButton: document.getElementById("ODD")
}

function registerCrapsPlayer(){
		gameState.username = crapsElements.usernameInput.value

        //Username validation check
        let firstCharIsDigitRegex = /^[0-9]|[^a-zA-Z0-9_]/g
        if (gameState.username.length < 5 || firstCharIsDigitRegex.test(gameState.username)){
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
            crapsElements.statsUsername.textContent = gameState.username
            gameState.money = GAME_SETTINGS.startingMoney
            gameState.rounds = GAME_SETTINGS.startingRounds
            gameState.betAmount = GAME_SETTINGS.minimumBet
            setMoney(gameState.money)
            setRounds(gameState.rounds)
            betEven()
            setBetAmount(gameState.betAmount)
    }

function setMoney(money){
            crapsElements.statsMoney.innerHTML = money
    }

function setRounds(rounds){
            crapsElements.statsRounds.innerHTML = rounds    }

function betEven(){
            chooseBet(BETS.EVEN)
    }

function betOdd(){
            chooseBet(BETS.ODD)
    }


 function chooseBet(bet) {

    if (gameState.roundInProgress) {
        return
    }

    gameState.bet = bet

    const selectedButton = bet === BETS.EVEN
        ? crapsElements.evenButton
        : crapsElements.oddButton

    const otherButton = bet === BETS.EVEN
        ? crapsElements.oddButton
        : crapsElements.evenButton

    selectedButton.style.backgroundColor = "red"
    otherButton.style.backgroundColor = "transparent"
}

function increaseBet(){

    if (gameState.roundInProgress) {
        return
    }

    const newBetAmount = Math.min(
        gameState.betAmount + GAME_SETTINGS.minimumBet,
        gameState.money
    )

    setBetAmount(newBetAmount)
}

function decreaseBet(){

    if (gameState.roundInProgress) {
        return
    }

    const newBetAmount = Math.max(
        gameState.betAmount - GAME_SETTINGS.minimumBet,
        GAME_SETTINGS.minimumBet
    )

    setBetAmount(newBetAmount)
}

function setBetAmount(betAmount){

    if (!gameState.canChangeBet) {
        return
    }

    gameState.betAmount = betAmount

    document.getElementById(crapsUserBetAmount).innerHTML = "$" + betAmount
}

window.addEventListener("diceRolled", function(event){

    const { dice, total } = event.detail

    processDiceRoll(dice, total)

    gameState.roundInProgress = false
})

function processDiceRoll(dice, total){

    console.log("Dice:", dice)
    console.log("Total:", total)

    // Determine winning bet
    const winningBet = total % 2 === 0
        ? BETS.EVEN
        : BETS.ODD

    // Determine win/loss
    const playerWon = gameState.bet === winningBet

    if (playerWon) {
        gameState.money += gameState.betAmount
    } else {
        gameState.money -= gameState.betAmount
    }

    // Increase round count
    gameState.rounds++

    // Update displayed stats
    setMoney(gameState.money)
    setRounds(gameState.rounds)

    // Show win/loss
    showRoundResult(playerWon)
}

function rollGameDice() {
    console.log("Roll Dice button clicked!");

    // Prevent another roll while this round is processing
    if (gameState.roundInProgress) {
        return;
    }

    const rollButton = crapsElements.rollButton;

    if (typeof window.roll3DDice === "function") {
        console.log("3D dice function found!");

        gameState.roundInProgress = true;
        gameState.canChangeBet = false;

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

function showRoundResult(playerWon){

    const roundResult = crapsElements.roundResult
    const nextRoundButton = crapsElements.nextRoundButton

    if (!roundResult) {
        console.error("craps-round-result element not found!")
        return
    }

    if (gameState.money <= 0) {

        roundResult.textContent = "You are out of money"
        nextRoundButton.style.display = "none"

    } else if (playerWon) {

        roundResult.textContent = `You win +$${gameState.betAmount}`
        nextRoundButton.style.display = "flex"

    } else {

        roundResult.textContent = `You lose -$${gameState.betAmount}`
        nextRoundButton.style.display = "flex"
    }

    showRoundFinishGrid()
}

function showRoundFinishGrid(){

    crapsElements.bettingGrid.style.display = "none"
    crapsElements.roundFinishGrid.style.display = "grid"
}

function startNextRound(){

    // Unlock betting
    gameState.canChangeBet = true
    gameState.roundInProgress = false

    // Reset bet
    gameState.betAmount = GAME_SETTINGS.minimumBet
    setBetAmount(gameState.betAmount)

    // Default to EVEN
    betEven()

    // Switch back to betting UI
    crapsElements.roundFinishGrid.style.display = "none"
    crapsElements.bettingGrid.style.display = "grid"
    crapsElements.rollButton.style.display = "block"
}

function exitCrapsGame(){

    // Show final game summary
    alert(
        "Game Over!\n\n" +
        "Total Money: $" + gameState.money + "\n" +
        "Rounds Played: " + gameState.rounds
    )

    // Reset game state
    gameState.username = ""
    gameState.money = GAME_SETTINGS.startingMoney
    gameState.rounds = GAME_SETTINGS.startingRounds
    gameState.bet = BETS.EVEN
    gameState.betAmount = GAME_SETTINGS.minimumBet
    gameState.canChangeBet = true
    gameState.roundInProgress = false

    // Reset registration
    crapsElements.usernameInput.value = ""

    // Reset displayed stats
    setMoney(gameState.money)
    setRounds(gameState.rounds)

    // Reset betting UI
    crapsElements.userBetAmount.textContent = "$" + GAME_SETTINGS.minimumBet
    crapsElements.evenButton.style.backgroundColor = "red"
    crapsElements.oddButton.style.backgroundColor = "transparent"

    // Reset round UI
    crapsElements.roundFinishGrid.style.display = "none"
    crapsElements.bettingGrid.style.display = "grid"
    crapsElements.rollButton.style.display = "block"

    // Return to registration screen
    crapsElements.mainSection.style.display = "none"
    crapsElements.registrationPane.style.display = "block"
}