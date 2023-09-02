
export class Period  {
    start:any;
     end:any;
    constructor(start:any,end:any){
        this.start= start;
        this.end = end;
	}
	overlayppingDays(another:any){

		if(this.isInvalid() ||this.hasNoOverlap(another) ){return 0}	
		let overlayppingEnd = this.end.isBefore(another.end)
		?this.end
		:another.end;
		let overlayppingStart = this.start.isAfter(another.start)
		?this.start
		:another.start;
		return overlayppingEnd.diff(overlayppingStart,'day')+1;
	}
	hasNoOverlap(another:any){
		return this.start.isAfter(another.end)||this.end.isBefore(another.start)
	}
	isInvalid(){
		return this.start.isAfter(this.end)
	}
}