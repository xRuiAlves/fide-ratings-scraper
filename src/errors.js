/**
 * Error types
 */
const ERRORS = Object.freeze({
    ARGS: {
        code: 1,
        description: "Insufficient arguments.",
    },
    INVALID_OPERATION: {
        code: 2,
        description: "Invalid operation.",
    },
    INVALID_RESOURCE: {
        code: 3,
        description: "Invalid resource.",
    },
    INVALID_FIDE_NUM: {
        code: 4,
        description: "Invalid fide number (should be an integer number).",
    },
    PLAYER_NOT_EXISTS: {
        code: 5,
        description: "The specified player does not exist.",
    },
    UNKNOWN_ERROR: {
        code: 6,
        description: "An unknown error has occured.",
    },
});

module.exports = ERRORS;
