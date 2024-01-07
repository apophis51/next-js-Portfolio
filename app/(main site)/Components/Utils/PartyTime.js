export class EpochTime {
    constructor(){
        this.currentTime = new Date();
        this.currentEpoch = this.currentTime.getTime();
        this.oneDayInMilliseconds = 86400000; 
        this.EpochPlusOne = this.currentTime.getTime() + this.oneDayInMilliseconds;
    }
  }