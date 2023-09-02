import dayjs from 'dayjs'
import {Period} from './period'

export  class BudgetService {

	totalAmount(start:Date,end:Date){
		
		let period = new Period(dayjs(start),dayjs(end))
		let budgets:any = this.getBudgets();
		if(budgets.length>0){
			let budget = budgets[0];
			let another = budget.createPeriod(budget);
			return period.overlayppingDays(another);
		}
		return 0;
		
	}
	
	getBudgets(){
		return undefined
	}
	
}
