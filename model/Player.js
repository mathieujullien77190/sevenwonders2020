import { Wonder } from './Wonder'
import { getWonder } from '../data/wonders'
import { ReactiveVar } from 'meteor/reactive-var'


export class Player {

    constructor(config) {

        this.id = config.id
        this.pseudo = config.pseudo

        this.points = 0
        this.coins = 3
        this._wonder = new ReactiveVar([])
        this._choiceCards = new ReactiveVar([])
        this._myCards = new ReactiveVar([])
        this._wonderCards = new ReactiveVar([])
    }

    setWonder(id) {
        this._wonder.set(new Wonder(getWonder(id)))
    }

    setChoiceCards(cards) {
        this._choiceCards.set([...cards])
    }

    addCard(card) {
        this._myCards.set([...this.myCards, card])
    }

    addWonderCard(card) {
        this._wonderCards.set([...this.wonderCards, card])
    }

    get choiceCards() {
        return this._choiceCards.get()
    }

    get myCards() {
        return this._choiceCards.get()
    }

    get wonderCards() {
        return this._wonderCards.get()
    }

    get wonder() {
        return this._wonder.get()
    }

}

