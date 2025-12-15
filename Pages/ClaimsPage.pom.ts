import { expect, Page } from "@playwright/test";
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
        viewDetails: ()=> this.page.locator('button').getByText('View Details'),
        createClaim:()=>this.page.locator('button').getByText('Create'),
        addExpensesbtn:()=>this.page.locator('button').getByText('Add').first(),
        expensetype:()=>this.page.locator('.oxd-select-text oxd-select-text--active'),
        date:()=>this.page.locator('.oxd-input oxd-input--active'),
        expenseAmount:()=>this.page.locator('.oxd-input oxd-input--active').last(),
        saveExpenseAmount:()=>this.page.locator('.oxd-button oxd-button--medium oxd-button--secondary orangehrm-left-space'),
        SavedAmountExpenseToast:()=>this.page.locator('.oxd-toast oxd-toast--success oxd-toast-container--toast'),
        SubmitClaimBtn:()=>this.page.locator('button').getByText('Submit'),
        CancelClaimBtn:()=>this.page.locator('button').getByText('Cancel'),
        ApproveClaimBtn:()=>this.page.locator('button').getByText('Approve'),
        
        RejectClaimBtn:()=>this.page.locator('button').getByText('Reject'),
        ApprovedClaimToastNotification:()=>this.page.locator('.oxd-toast oxd-toast--success oxd-toast-container--toast oxd-toast-list-enter-active oxd-toast-list-enter-to'),
        RejectedClaimToastNotification:()=>this.page.locator('.oxd-toast oxd-toast--success oxd-toast-container--toast')
    }


   async AdminResponseToClaim(response:string){
    if(response==="Approved"){
await this.elements.viewDetails().click();
await this.elements.ApproveClaimBtn().click();
await expect(this.elements.ApprovedClaimToastNotification()).toBeVisible();

    }
    else if(response==="Rejected"){
await this.elements.viewDetails().click();
await this.elements.RejectClaimBtn().click();
await expect(this.elements.RejectedClaimToastNotification()).toBeVisible();
    }
else{
    await this.elements.viewDetails().click();
}
    }


}
export default claimsPage;