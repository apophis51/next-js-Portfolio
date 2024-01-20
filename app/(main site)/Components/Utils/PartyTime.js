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
    }
}