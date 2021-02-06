const { validateWithRules } = require("../validation");

function getJourneyPosition(clientData, journey) {
    let currentStage = 0;
    let valid = true;
    let state = {};
    while((currentStage < journey.stages.length) && valid) {
        const stageResult = validateWithRules(journey.stages[currentStage].questions.map((sq) => {
            return sq.validation(clientData[sq.id]);
        }));
        state = stageResult;
        valid = stageResult.isValid;
        if(valid) {
            currentStage++;
        }
    }
    return {
        stage : currentStage,
        state,
        isComplete : currentStage === journey.stages.length,
    }
}

module.exports.getJourneyPosition = getJourneyPosition;