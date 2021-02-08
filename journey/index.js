const { validate, compressValidationResults } = require("../validation");

function validateScreen(screen, clientData) {
    const validationResults = screen.components.filter(c => c.validation && c.validation.length)
    .map((c) => validate(c.validation, clientData[c.id]))
    return compressValidationResults(validationResults)
}

function findNextScreen(screen, clientData) {
    if(screen.successors.length === 1) {
        return screen.successors[0].id
    }
    const validSuccessors = screen.successors.filter(
        (successor) => {
            const checks = compressValidationResults(
                successor.qualifiers.map(
                    (q) => validate(q.checks, clientData[q.key])
                )
            );
            return checks.isValid;
        }
    )
    return validSuccessors[0].id;
}

function getJourneyPosition(clientData, journey) {
    let currentScreen = journey.screens.find(j => j.id === journey.startsAt);
    let valid = true;
    
    while(valid && !currentScreen.terminates) {
        const isScreenValid = validateScreen(currentScreen, clientData);
        valid = isScreenValid.isValid;
        if(valid){
            const nextScreenId = findNextScreen(currentScreen, clientData);
            currentScreen = journey.screens.find(j => j.id === nextScreenId);
        }
    }
    return currentScreen;
}

module.exports.getJourneyPosition = getJourneyPosition;