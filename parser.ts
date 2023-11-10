import Player from "./player.ts";
import {file} from "bun";
import {JSDOM} from 'jsdom'
import {partialRight} from 'ramda';

export default async function parse(filename: string): Promise<Player[]> {
    const contents = await file(filename).text()

    const dom = new JSDOM(contents)
    const [header, ...rows] = dom.window.document.body.getElementsByTagName('tr')

    const headerKeys: Record<string, number> = {}

    for (let i = 0; i < header.cells.length; i++) {
        headerKeys[header.cells[i].textContent!!] = i
    }

    function getValue(column: string, row: HTMLTableRowElement): string {
        return row.cells[headerKeys[column]]?.textContent || '-1'
    }

    function getValueN(column: string, row: HTMLTableRowElement): number {
        return Number(getValue(column, row))
    }

    function buildPlayer(v: (x1: string) => string, n: (x1: string) => number) {
        return {
            name: v('Name'),
            position: v('Position'),
            personality: v('Personality'),
            mediaHandling: v('Media Handling'),
            leftFoot: v('Left Foot'),
            rightFoot: v('Right Foot'),
            technical: {
                corners: n('Cor'),
                crossing: n('Cro'),
                dribbling: n('Dri'),
                finishing: n('Fin'),
                firstTouch: n('Fir'),
                freeKickTaking: n('Fre'),
                heading: n('Hea'),
                longShots: n('Lon'),
                marking: n('Mar'),
                passing: n('Pas'),
                penaltyTaking: n('Pen'),
                tackling: n('Tck'),
                technique: n('Tec'),
                throwIns: n('L Th')
            },
            mental: {
                aggression: n('Agg'),
                anticipation: n('Ant'),
                bravery: n('Bra'),
                composure: n('Com'),
                concentration: n('Cnt'),
                decisions: n('Dec'),
                flair: n('Fla'),
                determination: n('Det'),
                leadership: n('Ldr'),
                offTheBall: n('OtB'),
                positioning: n('Pos'),
                teamwork: n('Tea'),
                vision: n('Vis'),
                workRate: n('Wor')
            },
            physical: {
                acceleration: n('Acc'),
                agility: n('Agi'),
                balance: n('Bal'),
                jumping: n('Jum'),
                natFit: n('Nat'),
                pace: n('Pac'),
                stamina: n('Sta'),
                strength: n("Str")
            },
            goalKeeping: {
                aerialReach: n('Aer'),
                commandOfArea: n('Cmd'),
                communication: n('Com'),
                eccentricity: n('Ecc'),
                handling: n('Han'),
                kicking: n('Kic'),
                oneOnOnes: n('1v1'),
                punching: n('Pun'),
                rushingOut: n('TRO'),
                throwing: n('Thr')
            }
        };
    }

    const players: Player[] = []

    for (let i = 0; i < rows.length; i++) {
        const v = partialRight(getValue, [rows[i]])
        const n = partialRight(getValueN, [rows[i]])
        players.push(buildPlayer(v, n))
    }
    return players
}
