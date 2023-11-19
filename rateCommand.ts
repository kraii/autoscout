import parse from './parser.ts'
import {rate} from './rating.ts'
import getRolesForPosition, {Role} from './roles.ts'
import {Player} from './player.ts'
import {allPass, concat, sortBy} from 'ramda'
import Table from 'cli-table3'

type RatedPlayer = {
    player: Player
    bestRoleRating: number
    roles: RatedRole[]
}

type RatedRole = {
    role: Role,
    score: number
}

function highestRating(roles: RatedRole[]): number {
    return roles.map((r) => r.score)
        .reduce((highest, currentValue) => Math.max(highest, currentValue))
}

export default async function rateCommand(filename: string, position: string, filters: ((p: Player) => boolean)[]) {
    const players = await parse(filename)
    const roles = getRolesForPosition(position)
    const sortByRating = sortBy<RatedPlayer>((p) => p.bestRoleRating)

    const ratedPlayers: RatedPlayer[] = players
        .filter(allPass(filters))
        .map((p) => {
            const ratedRoles = roles.map((r) => {
                return {role: r, score: rate(p, r.weighting)}
            })
            return {
                player: p,
                bestRoleRating: highestRating(ratedRoles),
                roles: ratedRoles
            }
        })

    const table = new Table({
        head: concat(['Name', 'Age', 'Personality', 'Media Handling', 'Best Rating'], roles.map(r => `${r.name}-${r.duty}`)),
    });

    sortByRating(ratedPlayers).forEach((ratedPlayer => {
        const p = ratedPlayer.player
        table.push(concat([p.name, p.age, p.personality, p.mediaHandling, ratedPlayer.bestRoleRating], ratedPlayer.roles.map((r) => r.score)))
    }))
    
    console.table(table.toString())
}