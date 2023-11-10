import {sum} from "ramda"
import {Player, Attribute} from "./player"
import { round } from 'mathjs'

type PositionWeighting = {
    primaryAttributes: Attribute[]
    secondaryAttributes: Attribute[]
}
export const AdvancedForward: PositionWeighting = {
    primaryAttributes: ['finishing', 'dribbling', 'firstTouch', 'technique', 'composure', 'offTheBall', 'acceleration'],
    secondaryAttributes: ['passing', 'decisions', 'anticipation', 'workRate', 'agility', 'balance', 'pace', 'stamina' ]
}

function weight(player: Player, attributes: Attribute[], factor: number): number {
    return sum(attributes.map((attribute) => {

        const attributeValue = player.attributes[attribute]
        return factor * attributeValue
    }))
}

const maxAttributeValue = 20
export function rate(player: Player, {primaryAttributes, secondaryAttributes}: PositionWeighting): number {
    const primaryFactor = 1.5
    const secondaryFactor = 1

    const total = weight(player, primaryAttributes, primaryFactor)
        + weight(player, secondaryAttributes, secondaryFactor)
    const maximum =  primaryAttributes.length * primaryFactor * maxAttributeValue
        + secondaryAttributes.length * secondaryFactor * maxAttributeValue
    return round((total / maximum) * 20, 3)
}