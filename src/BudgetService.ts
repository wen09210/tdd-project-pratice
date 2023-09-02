import dayjs from 'dayjs'

export class Period  {
    start:any;
     end:any;
    constructor(start:any,end:any){
        this.start= start;
        this.end = end;
	}
	overlayppingDays(budget:any){
		if (this.start.isAfter(budget.lastDay())||this.end.isBefore(budget.firstDay())){
			return 0;
		}
	
		let overlayppingEnd = this.end.isBefore(budget.lastDay())
		?this.end
		:budget.lastDay();
		let overlayppingStart = this.start.isAfter(budget.firstDay())
		?this.start
		:budget.firstDay();
		return overlayppingEnd.diff(overlayppingStart,'day')+1;
	}
}
export  class BudgetService {

	totalAmount(start:Date,end:Date){
		
		let myEndDay = dayjs(end);
		let myStartDay = dayjs(start);
		let budgets:any = this.getBudgets();
		if(budgets.length>0){
			let budget = budgets[0];
			let period = new Period(myStartDay,myEndDay)
			return period.overlayppingDays(budget);
		}
		return 0;
		
	}

    
	
	getBudgets(){
		return undefined
	}
	
}
