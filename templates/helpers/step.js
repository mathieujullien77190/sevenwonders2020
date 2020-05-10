import { getStepCanBuild } from '../../actions/player'
const getTotalCost = ((step) => ((step.coinsCost > 0) ? 1 : 0) + step.ressourcesCost.length)

Template.step_template.helpers({
    costSize() {
        return this.step.ressourcesCost.length
    },
    free() {
        const nextStep = getStepCanBuild(this.player)
        return nextStep && this.step.id === nextStep.id && this.step.buyInfo && this.step.buyInfo.free
    },
    impossible() {
        const nextStep = getStepCanBuild(this.player)
        return nextStep && this.step.id === nextStep.id && this.step.buyInfo && !this.step.buyInfo.canHave
    },
    buy() {
        const nextStep = getStepCanBuild(this.player)
        return nextStep && this.step.id === nextStep.id && this.step.buyInfo && this.step.buyInfo.canHave && !this.step.buyInfo.free ? this.step.buyInfo.priceMini : null
    },
    hasCoinsCost() {
        return this.step.coinsCost > 0
    },
    hasMoreThanThreeCosts(){
        //var totalCost = ((this.step.coinsCost > 0) ? 1 : 0) + this.step.ressourcesCost.length
        return getTotalCost(this.step) > 3
    },
    hasMoreThanFiveCosts(){
        //var totalCost = ((this.step.coinsCost > 0) ? 1 : 0) + this.step.ressourcesCost.length
        return getTotalCost(this.step) > 5
    },
    getFirstResources(){
        let endingIndex = 0

        switch(getTotalCost(this.step)){
            case 4:  
            case 6:
            case 7:
                endingIndex = 2; break;
            default: endingIndex = 3; break;
        }
        
        endingIndex -= (this.step.coinsCost > 0) ? 1 : 0;

        return this.step.ressourcesCost.filter((filter, index)=> index < endingIndex)
    },
    getMiddleResources(){        
        let startingIndex = 0
            
        switch(getTotalCost(this.step)){
            case 4:  
            case 6:
            case 7:
                startingIndex = 2; break;
            default: startingIndex = 3; break;
        }
        startingIndex -= (this.step.coinsCost > 0) ? 1 : 0
        endingIndex = 5

        // Obtenir maximuml la 5ème ressource
        
        return this.step.ressourcesCost.filter((filter, index)=> index >= startingIndex && index < endingIndex)
    },
    getLastResources(){        
        let startingIndex = 0
            
        startingIndex = (this.step.coinsCost > 0) ? 4 : 5;
        
        return this.step.ressourcesCost.filter((filter, index)=> index >= startingIndex)
    }
});