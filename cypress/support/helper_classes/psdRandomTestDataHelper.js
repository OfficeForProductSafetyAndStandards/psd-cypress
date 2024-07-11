
class PSDRandomTestDataHelper
{

    /**
     * Mathed to generate a random number with given number of digits
     * @param {*} digits 
     * @returns 
     */
    generateRandomNumber(digits) {
        if (digits <= 0) {
            throw new Error("Number of digits must be freater than zero");
        }

        const min = Math.pow(10, digits - 1);
        const max = Math.pow(10, digits) - 1;

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}

export default PSDRandomTestDataHelper;