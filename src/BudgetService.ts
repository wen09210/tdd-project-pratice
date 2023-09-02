import dayjs from 'dayjs'
import {Period} from './period'

export  class BudgetService {

	totalAmount(start:Date,end:Date){
		
		let period = new Period(dayjs(start),dayjs(end))
		let budgets:any = this.getBudgets();
		let totalAmount:any = 0;
		return  budgets.map((b:any)=>b.overlapingAmount(period))
		.reduce((x:any,y:any)=>x+y,0);
		
	}
	

	getBudgets(){
		return undefined
	}
	
}
