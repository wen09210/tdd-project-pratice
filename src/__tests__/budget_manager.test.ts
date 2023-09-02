import{ BudgetService}  from '../BudgetService';
import dayjs = require('dayjs');


class period  {
    start;
     end;
    constructor(start,end){
        this.start= start;
        this.end = end;
    }
}

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
    it('period  overlap with budget last day', function () {
        givenBudgets([new Budgets(new Date(2023,7),31)]);
        totalAmountShouldBe(new Date(2023,7,30),new Date(2023,8,2),2)
    });
    it('period  overlap before budget first day', function () {
        givenBudgets([new Budgets(new Date(2023,7),31)]);
        totalAmountShouldBe(new Date(2023,6,31),new Date(2023,7,2),2)
    });
    function givenBudgets(budgets:any){
        getBudgets.mockReturnValueOnce( budgets)
    }
    function totalAmountShouldBe(start:Date,end:Date,expected:number){
        
        expect(budgetService.totalAmount(start,end)).toBe(expected);
    }
  
});