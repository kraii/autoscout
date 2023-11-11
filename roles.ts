import {RoleWeighting} from './rating.ts'

const AdvancedForward: RoleWeighting = {
    primaryAttributes: ['finishing', 'dribbling', 'firstTouch', 'technique', 'composure', 'offTheBall', 'acceleration'],
    secondaryAttributes: ['passing', 'decisions', 'anticipation', 'workRate', 'agility', 'balance', 'pace', 'stamina']
}

const InvertedWingerSupport: RoleWeighting = {
    primaryAttributes: ['crossing', 'dribbling', 'passing', 'technique', 'acceleration', 'agility'],
    secondaryAttributes: ['firstTouch', 'longShots', 'composure', 'decisions', 'offTheBall', 'vision', 'workRate', 'balance', 'passing', 'stamina']
}

const Mezzala: RoleWeighting = {
    primaryAttributes: ['passing', 'technique', 'decisions', 'offTheBall', 'workRate', 'acceleration'],
    secondaryAttributes: ['dribbling', 'firstTouch', 'longShots', 'tackling', 'anticipation', 'composure', 'vision', 'balance', 'stamina']
}

const DefensiveMidfielderSupport: RoleWeighting = {
    primaryAttributes: ['tackling', 'anticipation', 'concentration', 'positioning', 'teamwork'],
    secondaryAttributes: ['firstTouch', 'marking', 'passing', 'aggression', 'composure', 'decisions', 'workRate', 'stamina', 'strength']
}

const DefensiveMidfielderDLPSupport: RoleWeighting = {
    primaryAttributes: ['firstTouch', 'passing', 'technique', 'composure', 'decisions', 'teamwork', 'vision'],
    secondaryAttributes: ['anticipation', 'offTheBall', 'positioning']
}

const Goalkeeper: RoleWeighting = {
    primaryAttributes: ['aerialReach', 'commandOfArea', 'communication', 'handling', 'kicking', 'reflexes', 'concentration', 'positioning', 'agility'],
    secondaryAttributes: ['oneOnOnes', 'throwing', 'anticipation', 'decisions']
}

const roles: Record<string, RoleWeighting> = {
    'AF': AdvancedForward,
    'IW-S': InvertedWingerSupport,
    'MEZ': Mezzala,
    'DM-S': DefensiveMidfielderSupport,
    'DM-DLP-S': DefensiveMidfielderDLPSupport,
    'GK': Goalkeeper
}

export default function getWeightingForRole(role: string): RoleWeighting {
    const weighting = roles[role]
    if (weighting) {
        return weighting
    }
    throw Error(`Unknown role ${role}`)
}

