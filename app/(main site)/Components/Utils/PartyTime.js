/**
 * Represents a time in Epoch format.
 * @class
 */
export class EpochTime {
    /**
     * Represents the PartyTime class.
     * @constructor
     */
    constructor() {
        this.currentTime = new Date();
        this.currentEpoch = this.currentTime.getTime();
        /**
         * An integer representing the number of milliseconds that has passed since the beginning of 1970.
         * @type {number}
         */
        this.oneDayInMilliseconds = 86400000;

        this.EpochPlusOne = this.currentTime.getTime() + this.oneDayInMilliseconds;


        this.standard_UTC_Format = this.currentTime.toISOString();
        this.fiveDaysBeforeUTC = new Date(this.currentTime - this.oneDayInMilliseconds * 5).toISOString();
    }



    /**
     * Calculates the number of days elapsed between the provided date in standard UTC format and the current date.
     * 
     * @param {string} standard_UTC_Format - A date string in standard UTC format.
     * @returns {number} The number of days elapsed as a negative integer.
     */
    calculate_days_elapsed_with_standard_UTC_String(standard_UTC_Format) {
        let oldDate = new Date(standard_UTC_Format);
        let newDate = new Date()

        return Math.floor((oldDate.getTime() - newDate.getTime()) / this.oneDayInMilliseconds);
    }


}

//testing
// const time = (new EpochTime())
// console.log(time)
// const newEpochTime = new EpochTime()
// console.log(time.fiveDaysBeforeUTC)

// console.log(newEpochTime.calculate_days_elapsed_with_standard_UTC_String(time.fiveDaysBeforeUTC))