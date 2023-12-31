import{ BudgetService}  from '../BudgetService';
import dayjs = require('dayjs');
import { Period } from '../period';




class Budgets {
    yearMonth:Date;
    amount:number;
    constructor(yearMonth:Date,amount:number) {
        this.yearMonth=yearMonth;
        this.amount= amount;
        
    }
    firstDay(){
        return dayjs(this.yearMonth + "01")
    }
    lastDay(){
        return this.firstDay().endOf('month')
    }
    createPeriod() {
		return new Period(this.firstDay(),this.lastDay())
    }
    days(){
		return this.firstDay().daysInMonth();
    }
    dailyAmount(){
		return this.amount/this.days();
    }
    overlapingAmount(period:any){
		return this.dailyAmount() * period.overlayppingDays(this.createPeriod());
	}
}
describe('total amount between period',  ()=> {
    let budgetService: BudgetService;
    let getBudgets:any;
    
    beforeEach(() => {
        budgetService = new BudgetService();
        getBudgets =jest.fn();
        budgetService.getBudgets=getBudgets
    });

    it('no budgets', function () {
        givenBudgets([])
        totalAmountShouldBe(new Date(2023,7,31),new Date(2023,8,2),0)
    });
    it('period inside budget month', function () {
        givenBudgets([new Budgets(new Date(2023,7),31)]);
        totalAmountShouldBe(new Date(2023,7,1),new Date(2023,7,31),31)
    });
    it('period no overlap before budget first day', function () {
        givenBudgets([new Budgets(new Date(2023,7),31)]);
        totalAmountShouldBe(new Date(2023,6,1),new Date(2023,6,31),0)
    });
    it('period no overlap after budget last day', function () {
        givenBudgets([new Budgets(new Date(2023,7),31)]);
        totalAmountShouldBe(new Date(2023,8,1),new Date(2023,8,31),0)
    });
    it('period  overlap with budget first day', function () {
        givenBudgets([new Budgets(new Date(2023,7),31)]);
        totalAmountShouldBe(new Date(2023,6,31),new Date(2023,7,2),2)
    });
    it('period  overlap with budget last day', function () {
        givenBudgets([new Budgets(new Date(2023,7),31)]);
        totalAmountShouldBe(new Date(2023,7,29),new Date(2023,8,2),3)
    });

    it('invalid period', function () {
        givenBudgets([new Budgets(new Date(2023,7),31)]);
        totalAmountShouldBe(new Date(2023,9,29),new Date(2023,8,2),0)
    });

    it('daily amount is 10', function () {
        givenBudgets([new Budgets(new Date(2023,7),310)]);
        totalAmountShouldBe(new Date(2023,7,29),new Date(2023,8,2),30)
    });
    it('multiple budgets', function () {
        givenBudgets([
            new Budgets(new Date(2023,6),3100),
            new Budgets(new Date(2023,7),310),
            new Budgets(new Date(2023,8),30),
            ]);
        totalAmountShouldBe(new Date(2023,6,30),new Date(2023,8,1),200+310+1)
    });
    
    function givenBudgets(budgets:any){
        getBudgets.mockReturnValueOnce( budgets)
    }
    function totalAmountShouldBe(start:Date,end:Date,expected:number){
        
        expect(budgetService.totalAmount(start,end)).toBe(expected);
    }
  
});