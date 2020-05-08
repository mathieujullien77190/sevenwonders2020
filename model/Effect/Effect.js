export class Effect {

    constructor(config) {

        this.type = config.type;
        this.apply = [...config.apply];
    }


    toJson() {
        return {
            type: this.type,
            apply: this.apply
        }
    }

}

