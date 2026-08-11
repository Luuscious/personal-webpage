//HTML Element IDs
const crapsUsernameInput = "craps-username-input"
const crapsRegistrationPane = "craps-registration-pane"
const crapsMainSection = "craps-main-section"

function registerCrapsPlayer(){
		let crapsUsername = document.getElementById(crapsUsernameInput).value

        //Username validation check
        let firstCharIsDigitRegex = /^[0-9]|[^a-zA-Z0-9_]/g
        if (crapsUsername.length < 5 || firstCharIsDigitRegex.test(crapsUsername)){
            alert("Username must be at least 5 characters long, alphanumeric only, no spaces and cannot start with a number")
        } else {
            removeRegistrationPane()
            showMainGameSection()
        } 
	}

function removeRegistrationPane(){
            document.getElementById(crapsRegistrationPane).style.display = "none"
    } 

function showMainGameSection(){
            document.getElementById(crapsMainSection).style.display = "block"
    }