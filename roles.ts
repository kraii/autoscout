import {PositionWeighting} from './rating.ts'

const AdvancedForward: PositionWeighting = {
    primaryAttributes: ['finishing', 'dribbling', 'firstTouch', 'technique', 'composure', 'offTheBall', 'acceleration'],
    secondaryAttributes: ['passing', 'decisions', 'anticipation', 'workRate', 'agility', 'balance', 'pace', 'stamina']
}

const InvertedWingerSupport: PositionWeighting = {
    primaryAttributes: ['crossing', 'dribbling', 'passing', 'technique', 'acceleration', 'agility'],
    secondaryAttributes: ['firstTouch', 'longShots', 'composure', 'decisions', 'offTheBall', 'vision', 'workRate', 'balance', 'passing', 'stamina']
}

const DefensiveMidfielderSupport: PositionWeighting = {
    primaryAttributes: ['tackling', 'anticipation', 'concentration', 'positioning', 'teamwork'],
    secondaryAttributes: ['firstTouch', 'marking', 'passing', 'aggression', 'composure', 'decisions', 'workRate', 'stamina', 'strength']
}

const DefensiveMidfielderDLPSupport: PositionWeighting = {
    primaryAttributes: ['firstTouch', 'passing', 'technique', 'composure', 'decisions', 'teamwork', 'vision'],
    secondaryAttributes: ['anticipation', 'offTheBall', 'positioning']
}

const roles: Record<string, PositionWeighting> = {
    'AF': AdvancedForward,
    'IW-S': InvertedWingerSupport,
    'DM-S': DefensiveMidfielderSupport,
    'DM-DLP-S': DefensiveMidfielderDLPSupport
}

export default function getWeightingForRole(role: string): PositionWeighting {
    const weighting = roles[role]
    if (weighting) {
        return weighting
    }
    throw Error(`Unknown role ${role}`)
}

