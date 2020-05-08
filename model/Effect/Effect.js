export class Effect {

    constructor(config) {

        this.type = config.type;
        this.apply = [...config.apply];
    }

    isApplyLeft() {
        return this.apply.includes('left')
    }

    isApplyRight() {
        return this.apply.includes('right')
    }

    isApplyOwn() {
        return this.apply.includes('own')
    }

    toJson() {
        return {
            type: this.type,
            apply: this.apply
        }
    }

}

