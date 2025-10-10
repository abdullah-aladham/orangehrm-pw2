import { Page } from "@playwright/test";
class addEmployeePage{
    readonly page:Page;
    constructor(page:Page){
        this.page=page;
    }
elements={
        PIM:    ()=>this.page.getByText('PIM'),
        Addbtn: ()=>this.page.getByText('Add'),
        firstName: ()=>  this.page.locator("input").getByPlaceholder("First Name"),
        // MiddleName:()=>this.page.locator("input[name='middleName'"),
        lastName:()=>this.page.locator('input').getByPlaceholder("Last Name"),
        createLoginDetailsBtn:()=>this.page.locator('input[type="radio"]'),
        username:()=>this.page.locator('.oxd-input').first(),
        password:()=>this.page.locator("input[class='oxd-input oxd-input--active'").nth(1),
        confirmpass: ()=>this.page.locator('.oxd-input').last(),
        Savebtn:    ()=>this.page.getByText('Save'),
    };
   async AddNewEmployee(firstName:string,lastName:string,username:string,password:string){
       await this.elements.firstName().fill(firstName);
    //    await this.elements.MiddleName().fill(MiddleName);
       await this.elements.lastName().fill(lastName);
       await this.elements.username().fill(username);
       await this.elements.password().fill(password);
       await this.elements.confirmpass().fill(password);
       await this.elements.Savebtn().click();
    }
    




}
export default addEmployeePage;