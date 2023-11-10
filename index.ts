import {hideBin} from "yargs/helpers";
import parse from './parser.ts'
import yargs from "yargs/yargs";
import {rate} from "./rating.ts";
import getWeightingForRole from './roles.ts'
import rateCommand from './rateCommand.ts'

yargs(hideBin(process.argv))
    .command('rate [file] [role]', 'Rate the players in the given file', (yargs) => {
        return yargs
            .positional('file', {
                type: 'string',
                demandOption: true,
                describe: 'Input data html file, exported from FM',
            }).positional('role', {
                type: 'string',
                demandOption: true,
                describe: 'Role, e.g DMd, DMs, AF',
            })
            .check(argv => {
                if (!argv.file) {
                    return 'file path is required'
                }
                if (!argv.role) {
                    return 'role is required'
                }
                return true
            })
    }, async ({file, role}) => {
        await rateCommand(file, role)
    })
    .parse()

