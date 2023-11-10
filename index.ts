import {hideBin} from "yargs/helpers";
import parse from './parser.ts'
import yargs from "yargs/yargs";
import {AdvancedForward, rate} from "./rating.ts";

yargs(hideBin(process.argv))
    .command('rate [file]', 'Rate the players in the given file', (yargs) => {
        return yargs
            .positional('file', {
                type: 'string',
                demandOption: true,
                describe: 'Input data html file, exported from FM',
            }).check(argv => {
                if (!argv.file) {
                    return 'file path is required'
                }
                return true
            })
    }, async (argv) => {
        const players = await parse(argv.file)

        players.forEach((p) => {
            const rating = rate(p, AdvancedForward)
            console.log(`${p.name}, ${p.position}, ${rating}`)
        })
    })
    .parse()

