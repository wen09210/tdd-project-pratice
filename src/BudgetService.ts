import dayjs from 'dayjs'
export  class BudgetService {

	totalAmount(start:Date,end:Date){
		let budgets:any = this.getBudgets();
		let myEndDay = dayjs(end);
		let myStartDay = dayjs(start);
		if(budgets.length>0){
			let budget = budgets[0];
			return this.overlayppingDays(myStartDay,budget,myEndDay);
		}
		return 0;
		
	}
	overlayppingDays(myStartDay:any,budget:any,myEndDay:any){
		let Period =  new Period(myStartDay,myEndDay)
		if (myEndDay.isBefore(budget.firstDay())||myStartDay.isAfter(budget.lastDay())){
			return 0;
		}
	
		let overlayppingEnd = myEndDay.isBefore(budget.lastDay())?myEndDay:budget.lastDay();
		let overlayppingStart = myStartDay.isAfter(budget.firstDay())?myStartDay:budget.firstDay();
		return overlayppingEnd.diff(overlayppingStart,'day')+1
	}
	getBudgets(){
		return undefined
	}
	
}
