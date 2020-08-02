#!/usr/bin/env node
const { printUsage, printError } = require("../src/printer");
const ERRORS = require("../src/errors");
const RESOURCE_TYPES = require("../src/resourceTypes");
const OPERATION_TYPES = require("../src/operationTypes");
const {
    getPlayerElo, getPlayerFullInfo, getPlayerHistory, getPlayerPersonalData, getPlayerRank,
} = require("../src/main");

const main = async () => {
    if (process.argv.length < 3) {
        printUsage();
        throw { err: ERRORS.ARGS };
    }

    const operation = process.argv[2];
    if (!Object.values(OPERATION_TYPES).includes(operation)) {
        printUsage();
        throw { err: ERRORS.INVALID_OPERATION };
    }

    if (operation === OPERATION_TYPES.GET) {
        if (process.argv.length < 5) {
            printUsage();
            throw { err: ERRORS.ARGS };
        }

        const resource = process.argv[3];
        const fide_num = parseInt(process.argv[4], 10);

        if (!Object.values(RESOURCE_TYPES.GET).includes(resource)) {
            printUsage();
            throw { err: ERRORS.INVALID_RESOURCE };
        }

        if (isNaN(fide_num)) {
            throw { err: ERRORS.INVALID_FIDE_NUM };
        }

        try {
            switch (resource) {
                case RESOURCE_TYPES.GET.INFO:
                    console.info(JSON.stringify(await getPlayerFullInfo(fide_num), null, 4));
                    break;
                case RESOURCE_TYPES.GET.PERSONAL_DATA:
                    console.info(JSON.stringify(await getPlayerPersonalData(fide_num), null, 4));
                    break;
                case RESOURCE_TYPES.GET.RANK:
                    console.info(JSON.stringify(await getPlayerRank(fide_num), null, 4));
                    break;
                case RESOURCE_TYPES.GET.ELO:
                    console.info(JSON.stringify(await getPlayerElo(fide_num), null, 4));
                    break;
                case RESOURCE_TYPES.GET.HISTORY:
                    console.info(JSON.stringify(await getPlayerHistory(fide_num), null, 4));
                    break;
                default:
                    throw "unknown error";
            }
        } catch (e) {
            throw { err: ERRORS.PLAYER_NOT_EXISTS };
        }
    } else if (operation === OPERATION_TYPES.API) {
        require("../src/api");
    }
};

try {
    main().catch((e) => {
        printError(e.err, e.msg);
        process.exit(e.err.code);
    });
} catch (e) {
    printError(e.err, e.msg);
    process.exit(e.err.code);
}
