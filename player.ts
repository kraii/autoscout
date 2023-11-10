type PhysicalAttributes {
    acceleration: number
    agility: number
    balance: number
    jumping: number
    natFit: number
    pace: number
    stamina: number
    strength: number
}

type MentalAttributes {
    aggression: number
    anticipation: number
    bravery: number
    composure: number
    concentration: number
    decisions: number
    determination: number
    flair: number
    leadership: number
    offTheBall: number
    positioning: number
    teamwork: number
    vision: number
    workRate: number
}

type TechnicalAttributes {
    corners: number
    crossing: number
    dribbling: number
    finishing: number
    firstTouch: number
    freeKickTaking: number
    heading: number
    longShots: number
    throwIns: number
    marking: number
    passing: number
    penaltyTaking: number
    tackling: number
    technique: number
}

type GoalkeepingAttributes {
    aerialReach: number
    commandOfArea: number
    communication: number
    eccentricity: number
    handling: number
    kicking: number
    oneOnOnes: number
    punching: number
    rushingOut: number
    throwing: number
}

type Player {
    name: string
    position: string
    personality: string
    mediaHandling: string
    leftFoot: string
    rightFoot: string

    physical: PhysicalAttributes
    mental: MentalAttributes
    technical: TechnicalAttributes
    goalKeeping: GoalkeepingAttributes
}

export default Player