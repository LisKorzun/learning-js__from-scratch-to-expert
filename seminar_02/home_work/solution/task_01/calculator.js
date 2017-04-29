/*
 * Makes calculations according to given attributes.
 * All attributes should be given in separated parenthesis, e.g.:
 * calculate(3)('+')(2);
 */

/**
 * Calculator
 * @param {Number} firstOperand - First number for calculation
 * @returns {Function}
 */
function calculate(firstOperand) {
    /**
     * @param {String} operator - Arithmetic operator, possible values: '+' / '-' / '/' / '*'
     * @returns {Function}
     */
    return function (operator) {
        /**
         * @param {Number} secondOperand - Second number for calculation
         * @returns {Number|NaN} - Result of calculation
         */
        return function (secondOperand) {
            if (operations[operator] && !isNaN(firstOperand) && !isNaN(secondOperand)) {
                return operations[operator](+firstOperand, +secondOperand);
            } else {
                console.error('Check your arguments: ', firstOperand, operator, secondOperand);
                return NaN;
            }
        };
    };
}

/**
 * Possible operations for calc function
 * @type {Object.<string, Function>} operations
 */
var operations = {
    '+': function (x, y) {
        return x + y;
    },
    '-': function (x, y) {
        return x - y;
    },
    '*': function (x, y) {
        return x * y;
    },
    '/': function (x, y) {
        return x / y;
    }
};

calculate(3)('+')(22);
calculate(10)('/')(2);
