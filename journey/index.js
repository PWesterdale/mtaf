const { validateWithRules } = require("../validation");
/*
    TS was just for mindmapping


type ContentBlock = {
    type: string,
    props: {}
}

type Question = {
    id: string,
    type: string,
    props: {},
    validation: (value: string) => any
}

type JourneyStage = {
    id: string
    content: ContentBlock[]
    questions: Question[]
    prefetch: Promise<{}>[]
}

type Journey = {
    name: string,
    version: string,
    stages: JourneyStage[]
}

*/

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