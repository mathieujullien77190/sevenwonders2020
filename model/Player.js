import { Wonder } from './Wonder'
import { getWonder } from '../data/wonders'
import { ReactiveVar } from 'meteor/reactive-var'


export class Player {

    constructor(config) {

        this.id = config.id
        this.pseudo = config.pseudo

        this.points = 0
        this.coins = 3
        this._wonder = []
        this._choiceCards = []
        this._myCards = []
        this._wonderCards = []
    }

    setWonder(id) {
        this._wonder = new Wonder(getWonder(id))
    }

    setChoiceCards(cards) {
        this._choiceCards = [...cards]
    }

    addCard(card) {
        this._myCards = [...this.myCards, card]
    }

    addWonderCard(card) {
        this._wonderCards = [...this.wonderCards, card]
    }

    get choiceCards() {
        return this._choiceCards
    }

    get myCards() {
        return this._myCards
    }

    get wonderCards() {
        return this._wonderCards
    }

    get wonder() {
        return this._wonder
    }

}

