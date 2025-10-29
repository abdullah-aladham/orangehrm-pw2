import { expect, Page } from "@playwright/test"
// import {faker}from '@faker-js/faker'
class EmployeeLeavePage{
    readonly page:Page;
    
    constructor(page:Page){
        this.page=page;
    }

    elements= {
        ApplyPageNavbtn: ()=> this.page.locator('a[class="oxd-topbar-body-nav-tab-item"]').first(),
        MyLeavePageNavbtn: ()=> this.page.locator('a[class="oxd-topbar-body-nav-tab-item"]').nth(1),
        EntitlementsSpan: ()=> this.page.locator('span[class="oxd-topbar-body-nav-tab-item"]').nth(2),
        AddEntitlementNavbtn:()=>this.page.locator('a[class="oxd-topbar-body-nav-tab-link"]').first(),
        EmployeeEntitlementsbtn:()=>this.page.locator("span[class='oxd-topbar-body-nav-tab-link']").nth(3),
        MyEntitlements:()=> this.page.locator('a[class="oxd-topbar-body-nav-tab-link"]').last(),
        MoreNavSpan: ()=> this.page.locator('span[class="oxd-topbar-body-nav-tab-item"]').last(),

        LeaveTypeSelectInput : ()=> this.page.locator('div[class="oxd-select-text oxd-select-text--active"]'),
        LeaveTypeoption: ()=>this.page.locator('div[class="oxd-select-option"]'),
        FromDateInput: ()=>this.page.locator('input[class="oxd-input oxd-input--active"]').nth(1),
        ToDateInput: ()=>this.page.locator('input[class="oxd-input oxd-input--active"]').last(),
        applybtn:()=>this.page.locator('button[class="oxd-button oxd-button--medium oxd-button--secondary orangehrm-left-space"]'),
        approveLeavebtn: ()=> this.page.locator('button[class="oxd-button oxd-button--medium oxd-button--label-success oxd-table-cell-action-space"'),
        rejectLeavebtn:()=>this.page.locator('button[class="oxd-button oxd-button--medium oxd-button--label-danger oxd-table-cell-action-space"]'),
        applyLeaveShortcut: ()=>this.page.locator('button[title="Apply Leave"]'),
    }

    async navigatetoapplyquick(){
        this.elements.applyLeaveShortcut().click();
    }
   async  navigateToAddEntitlements(){
        await this.elements.EntitlementsSpan().click();
       await  this.elements.AddEntitlementNavbtn().click();
    }
    async NavigatetoApplyPage(){
        await this.elements.ApplyPageNavbtn();
        await expect(this.page).toHaveURL(
            "https://opensource-demo.orangehrmlive.com/web/index.php/leave/applyLeave"
        );
    } 
    async ApplytoLeave(fromDate:string,toDate:string){
        this.elements.LeaveTypeSelectInput().click();
        this.elements.LeaveTypeoption().click();
        this.elements.FromDateInput().fill(fromDate);
        this.elements.ToDateInput().fill(toDate);
        this.elements.applybtn().click();


    }
    async approveLeave(){
        this.elements.approveLeavebtn().click();
    }
}
export default EmployeeLeavePage;