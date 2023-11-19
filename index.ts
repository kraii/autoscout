import {hideBin} from "yargs/helpers";
import yargs from "yargs/yargs";
import {availablePositions} from './roles.ts'
import rateCommand from './rateCommand.ts'

yargs(hideBin(process.argv))
    .command('rate [file] [position]', 'Rate the players in the given file', (yargs) => {
        return yargs
            .positional('file', {
                type: 'string',
                demandOption: true,
                describe: 'Input data html file, exported from FM',
            }).positional('position', {
                type: 'string',
                demandOption: true,
                describe: 'Position, e.g CB, DM, CM, ST',
            }).option('maxAge', {
                type: 'number'
            }).option('sort', {
                type: 'string',
                default: 'avg',
                description: 'Which score to sort by avg|max|role:DLP-S'
            })
            .check(argv => {
                if (!argv.file) {
                    return 'file path is required'
                }
                if (!argv.position) {
                    return 'role is required'
                }
                if(!(argv.sort === 'avg' || argv.sort === 'max' || argv.sort.startsWith('role:'))) {
                    return 'sort must be one of avg|max|role:[role] role e.g DLP-S'
                }
                return true
            })
    }, async ({file, position, maxAge, sort}) => {
        await rateCommand(file, position, sort, maxAge ? [(p) => p.age <= maxAge] : [])
    })
    .command('pos', 'print available positions', () => {
    }, () => {
        console.log(availablePositions.join(","))
    })
    .demandCommand()
    .parse()

