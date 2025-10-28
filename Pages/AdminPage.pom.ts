import { th } from "@faker-js/faker";
import { Page, expect } from "@playwright/test";

class AdminPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  elements = {
    AdminPage: () => this.page.getByText(""),
    PIM: () => this.page.getByText("PIM"),
    Leave: () => this.page.getByText("Leave"),
    Time: () => this.page.getByText("Time"),
    Recruitemet: () => this.page.getByText("Recruitement"),
    MyInfo: () => this.page.getByText("My Info"),
    Performance: () => this.page.getByText("Performance"),
    Dashboard: () => this.page.getByText("Dashboard"),
    Directory: () => this.page.getByText("Directory"),
    Maintenance: () => this.page.getByText("Maintenance"),
    Claim: () => this.page.getByText("Claim"),
    Buzz: () => this.page.getByText("Buzz"),
  };
  async NavigatetoPIM() {
    await this.elements.PIM().click();
    await expect(this.page).toHaveURL(
      "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList",
    );
  }
  async NavigatetoLeavePage(){
    await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/leave/applyLeave");
   
  }
  async LeavePageAssertion(){
     await expect(this.page).toHaveURL(
      "https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewMyLeaveList"
    ); 
  }
  async NavigateToClaimsPage(){
   await this.elements.Claim().click();
   await expect(this.page).toHaveURL("/claim/viewAssignClaim")
  }
}
export default AdminPage;
