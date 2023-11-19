import parse from './parser.ts'
import {rate} from './rating.ts'
import getRolesForPosition, {Role, roleToString} from './roles.ts'
import {Player} from './player.ts'
import {allPass, concat, sortBy, sum} from 'ramda'
import Table from 'cli-table3'
import { round } from 'mathjs'

type RatedPlayer = {
    player: Player
    score: number
    roles: RatedRole[]
}

type RatedRole = {
    role: Role,
    score: number
}

function highestScore(roles: RatedRole[]): number {
    return roles.map((r) => r.score)
        .reduce((highest, currentValue) => Math.max(highest, currentValue))
}

function averageScore(roles: RatedRole[]): number {
    return round(sum(roles.map((r) => r.score)) / roles.length, 3)
}

function calculateScore(roles: RatedRole[], sortArg: string): number {
    if (sortArg === "avg") {
        return averageScore(roles)
    } else if (sortArg === "max") {
        return highestScore(roles)
    } else if(sortArg.startsWith('role:')) {
        const role = sortArg.split("role:")[1]
        return roles.find(rr => roleToString(rr.role) === role)?.score || 0
    }
    throw new Error(`Unknown sort argument ${sortArg}`)
}

export default async function rateCommand(filename: string, position: string, sortArg: string, filters: ((p: Player) => boolean)[]) {
    const players = await parse(filename)
    const roles = getRolesForPosition(position)
    const sortByRating = sortBy<RatedPlayer>((p) => p.score)

    const ratedPlayers: RatedPlayer[] = players
        .filter(allPass(filters))
        .map((p) => {
            const ratedRoles = roles.map((r) => {
                return {role: r, score: rate(p, r.weighting)}
            })
            return {
                player: p,
                score: calculateScore(ratedRoles, sortArg),
                roles: ratedRoles
            }
        })

    const table = new Table({
        head: concat(['Name', 'Age', 'Personality', 'Media Handling', 'Best Rating'], roles.map(r => roleToString(r))),
    });

    sortByRating(ratedPlayers).forEach((ratedPlayer => {
        const p = ratedPlayer.player
        table.push(concat([p.name, p.age, p.personality, p.mediaHandling, ratedPlayer.score], ratedPlayer.roles.map((r) => r.score)))
    }))
    
    console.table(table.toString())
}