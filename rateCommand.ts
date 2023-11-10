import parse from './parser.ts'
import {rate} from './rating.ts'
import getWeightingForRole from './roles.ts'
import {Player} from './player.ts'
import {prop, sortBy} from 'ramda'

type RatedPlayer = {
    player: Player
    rating: number
}

export default async function rateCommand(filename: string, role: string) {
    const players = await parse(filename)
    const sortByRating = sortBy(prop('rating'))

    const ratedPlayers: RatedPlayer[] = players.map((p) => {
        const rating = rate(p, getWeightingForRole(role))
        return {
            player: p,
            rating
        }
    })
    sortByRating(ratedPlayers)
        .forEach(({player, rating}) => {
            console.log(`${rating}, ${player.name}, ${player.position}, ${player.age}, ${player.personality}, ${player.mediaHandling}`)
        })
}