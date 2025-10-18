import { Page,expect } from "@playwright/test";
import Employee from '../Entities/employee';
import {faker} from '@faker-js/faker';
class addEmployeePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  elements = {
    PIM: () => this.page.getByText("PIM"),
    Addbtn: () => this.page.getByText("Add").last(),
    firstName: () => this.page.locator("input[name='firstName']"),
    // MiddleName:()=>this.page.locator("input[name='middleName'"),
    lastName: () => this.page.locator('input[name="lastName"]'),
    createLoginDetailsBtn: () =>
      this.page.locator(
        'span[class="oxd-switch-input oxd-switch-input--active --label-right"]',
      ),
    username: () => this.page.locator(".oxd-input").first(),
    password: () => this.page.locator("input[type='password']").first(),
    confirmpass: () => this.page.locator('input[type="password"]').last(),
    Savebtn: () => this.page.getByText("Save"),
  };
  async AddNewEmployee(
    firstName: string,
    lastName: string,
    username: string,
    password: string,
  ) {
   await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList");
    await this.elements.Addbtn().click();

    await this.elements.firstName().fill(firstName);
    //    await this.elements.MiddleName().fill(MiddleName);
    await this.elements.lastName().fill(lastName);
    await this.elements.createLoginDetailsBtn().click();
    await this.elements.username().fill(username);
    await this.elements.password().fill(password);
    await this.elements.confirmpass().fill(password);
    await this.elements.Savebtn().click();
  }
  async AddEmployeeInvalid(

  ){
    let firstName=faker.person.firstName();
    let lastName =faker.person.lastName();
    let username =faker.internet.username();
    let password=faker.internet.password();
    const emp:Employee =new Employee(firstName,lastName,username,password)
    await this.elements.Addbtn().click();

    await this.elements.firstName().fill(firstName);
    //    await this.elements.MiddleName().fill(MiddleName);
    await this.elements.lastName().fill(lastName);
    await this.elements.createLoginDetailsBtn().click();
    await this.elements.username().fill(username);
    await this.elements.password().fill(password);
    await this.elements.confirmpass().fill(password);
    await this.elements.Savebtn().click();
  }
}
export default addEmployeePage;
