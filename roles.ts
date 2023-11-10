import {PositionWeighting} from './rating.ts'

const AdvancedForward: PositionWeighting = {
    primaryAttributes: ['finishing', 'dribbling', 'firstTouch', 'technique', 'composure', 'offTheBall', 'acceleration'],
    secondaryAttributes: ['passing', 'decisions', 'anticipation', 'workRate', 'agility', 'balance', 'pace', 'stamina']
}

const DefensiveMidfielderSupport: PositionWeighting = {
    primaryAttributes: ['tackling', 'anticipation', 'concentration', 'positioning', 'teamwork'],
    secondaryAttributes: ['firstTouch', 'marking', 'passing', 'aggression', 'composure', 'decisions', 'workRate', 'stamina', 'strength']
}

const roles: Record<string, PositionWeighting> = {
    'AF': AdvancedForward,
    'DMs': DefensiveMidfielderSupport
}

export default function getWeightingForRole(role: string): PositionWeighting {
    const weighting = roles[role]
    if (weighting) {
        return weighting
    }
    throw Error(`Unknown role ${role}`)
}

