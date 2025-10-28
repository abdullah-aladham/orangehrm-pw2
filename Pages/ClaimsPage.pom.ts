import { Page } from "@playwright/test";
import Employee from "../Entities/employee";

class claimsPage{
    readonly page:Page;
    constructor(page:Page){
        this.page=page;
    }
    elements ={
        configuration: ()=> this.page.locator('.oxd-topbar-body-nav-tab --parent'),
        events:()=>this.page.locator('.oxd-topbar-body-nav-tab-link').first(),
        expenseTypes:()=>this.page.locator(".oxd-topbar-body-nav-tab-link").last(),
        submitClaim:()=> this.page.locator('a').getByText("Submit Claim"),
        myClaims:()=> this.page.locator('a').getByText("My Claims"),
        more:()=>this.page.locator('li').getByText("More"),
        employeeClaims: ()=>this.page.locator('a').getByText('Employee Claims'),
        assignClaim:()=>this.page.locator('a').getByText('Assign Claim'),
        assignClaimBtn:()=>this.page.locator('button').getByText('Assign Claim'),
        submitClaimEmpSide:()=>this.page.locator('button').getByText('Submit Claim'),
        eventSelectinp:()=>this.page.locator('.oxd-select-text-input').first(),
        currencySelectInp :()=>this.page.locator('.oxd-select-text-input').last(),
        createClaim:()=>this.page.locator('button').getByText('Create'),
        
    }
}