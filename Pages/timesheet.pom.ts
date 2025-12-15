import { Page } from "@playwright/test";

class TimeSheetPage{
 readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
      elements={
        empSearchBox: () => this.page.locator('input[placeholder="Type for hints..."]'),
        searchBtn: () => this.page.locator('button[type="submit"]'),
        prevWeekBtn:()=>this.page.locator('.--prev'),
        timePeriodInput: () => this.page.locator('input[class="oxd-input oxd-input--active"]'),
        nextWeekBtn:()=>this.page.locator('.--next'),
        CreateTimeSheetBtn :() => this.page.getByText('Create Timesheet'),
        EditTimeSheetBtn:()=>this.page.getByText('Edit'),
        SubmitTimeSheetBtn:()=>this.page.getByText('Submit'),
        ViewTimeSheet: ()=>this.page.locator('button[class="oxd-button oxd-button--medium oxd-button--text oxd-table-cell-action-space"]'),
        RejectTimeSheet: ()=>this.page.getByText('Reject'),
        ApproveTimeSheet:()=>this.page.getByText('Approve'),
        CommentTextArea:()=>this.page.locator('textarea[placeholder="Type here ..."]'),
        TimeSheet_Edit_Project_field: ()=>this.page.locator('input[placeholder="Type for hints..."]'),
        TimeSheet_Edit_Activity:()=>this.page.locator('div[class="oxd-select-text--after"]'),
        CancelEdits: ()=> this.page.locator('button[class="oxd-button--ghost"]').first(),
        ResetEdits: ()=> this.page.locator('button[class="oxd-button--ghost"]').last(),
        SaveEdits: ()=>this.page.locator('button[class="oxd-button--secondary"]')

      }
}
export default TimeSheetPage;