import {RoleWeighting} from './rating.ts'

const positions: Record<string, Position> = {
    'GK': {
        roles: [
            {name: 'GK', duty: 'D', weighting: {
                    primaryAttributes: ['aerialReach', 'commandOfArea', 'communication', 'handling', 'kicking', 'reflexes', 'concentration', 'positioning', 'agility'],
                    secondaryAttributes: ['oneOnOnes', 'throwing', 'anticipation', 'decisions']
                }}
        ]
    },
    'DM': {
        roles: [
            {
                name: 'DM', duty: 'S', weighting: {
                    primaryAttributes: ['tackling', 'anticipation', 'concentration', 'positioning', 'teamwork'],
                    secondaryAttributes: ['firstTouch', 'marking', 'passing', 'aggression', 'composure', 'decisions', 'workRate', 'stamina', 'strength']
                }
            },
            {
                name: 'DLP', duty: 'S', weighting: {
                    primaryAttributes: ['firstTouch', 'passing', 'technique', 'composure', 'decisions', 'teamwork', 'vision'],
                    secondaryAttributes: ['anticipation', 'offTheBall', 'positioning']
                }
            },
            {
                name: 'BWM', duty: 'S', weighting: {
                    primaryAttributes: ['tackling', 'aggression', 'anticipation', 'teamwork', 'workRate', 'stamina'],
                    secondaryAttributes: ['marking', 'passing', 'bravery', 'agility', 'pace', 'strength']
                }
            },
        ]
    },
    'CM': {
        roles: [
            {name: 'MEZ', duty: 'S', weighting: {
                    primaryAttributes: ['passing', 'technique', 'decisions', 'offTheBall', 'workRate', 'acceleration'],
                    secondaryAttributes: ['dribbling', 'firstTouch', 'longShots', 'tackling', 'anticipation', 'composure', 'vision', 'balance', 'stamina']
                }}
        ]
    },
    'W': {
        roles: [
            {name: 'IW', duty: 'S', weighting: {
                    primaryAttributes: ['crossing', 'dribbling', 'passing', 'technique', 'acceleration', 'agility'],
                    secondaryAttributes: ['firstTouch', 'longShots', 'composure', 'decisions', 'offTheBall', 'vision', 'workRate', 'balance', 'passing', 'stamina']
                }}
        ]
    },
    'ST': {
        roles: [
            {name: 'AF', duty: 'A', weighting: {
                    primaryAttributes: ['finishing', 'dribbling', 'firstTouch', 'technique', 'composure', 'offTheBall', 'acceleration'],
                    secondaryAttributes: ['passing', 'decisions', 'anticipation', 'workRate', 'agility', 'balance', 'pace', 'stamina']
                }}
        ]
    }
}

type Position = {
    roles: Role[]
}

export type Role = {
    name: string
    duty: 'D' | 'S' | 'A',
    weighting: RoleWeighting
}

export function roleToString(role: Role): string {
    return `${role.name}-${role.duty}`
}

export const availablePositions = Object.keys(positions)

export default function getRolesForPosition(positionName: string): Role[] {
    const position = positions[positionName]
    if (position) {
        return position.roles
    }
    throw Error(`Unknown position ${position}`)
}

