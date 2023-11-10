import Player from "./player.ts";
import {file} from "bun";
import { JSDOM } from 'jsdom'
import {partialRight} from 'ramda';

export default async function parse(filename: string): Promise<Player[]> {

    const contents = await file(filename).text()

    const dom = new JSDOM(contents)
    const [header, ...rows] = dom.window.document.body.getElementsByTagName('tr')

    const headerKeys: Record<string, number> = {}

    for(let i = 0; i < header.cells.length; i++) {
        headerKeys[header.cells[i].textContent!!] = i
    }

    function getValue(column: string, row: HTMLTableRowElement): string {
        return row.cells[headerKeys[column]].textContent!!
    }

    function getValueN(column: string, row: HTMLTableRowElement): number {
        return Number(getValue(column, row))
    }

    const players: Partial<Player>[] = []

    for(let i = 0; i < rows.length; i++) {
        const v = partialRight(getValue, [rows[i]])
        const n = partialRight(getValueN, [rows[i]])
        players.push({
            name: v('Name'),
            position: v('Name'),
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
            // mental: {},
            // physical: {}
            // goalKeeping: {}
        })
    }
    return players as Player[]
}
