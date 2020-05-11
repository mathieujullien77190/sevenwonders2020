import { getPointsPlayer } from '../../actions/player'

Template.player_template.helpers({
    testPoints() {
        return getPointsPlayer(this.player, this.board)
    }
})
