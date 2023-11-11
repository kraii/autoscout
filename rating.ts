import {sum} from "ramda"
import {Player, Attribute} from "./player"
import { round } from 'mathjs'

export type RoleWeighting = {
    primaryAttributes: Attribute[]
    secondaryAttributes: Attribute[]
    primaryWeighting?: number
    secondaryWeighting?: number
}
function weight(player: Player, attributes: Attribute[], factor: number): number {
    return sum(attributes.map((attribute) => {

        const attributeValue = player.attributes[attribute]
        return factor * attributeValue
    }))
}

const maxAttributeValue = 20
export function rate(player: Player, {primaryAttributes, secondaryAttributes, ...weighting}: RoleWeighting): number {
    const primaryFactor = weighting.primaryWeighting || 1.5
    const secondaryFactor = weighting.secondaryWeighting || 1

    const total = weight(player, primaryAttributes, primaryFactor)
        + weight(player, secondaryAttributes, secondaryFactor)
    const maximum =  primaryAttributes.length * primaryFactor * maxAttributeValue
        + secondaryAttributes.length * secondaryFactor * maxAttributeValue
    return round((total / maximum) * 20, 3)
}
