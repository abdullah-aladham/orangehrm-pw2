import test,  {expect, Page } from '@playwright/test';
import Login from '../../Pages/Login';
import * as fs from "fs";
import * as path from "path";
import AdminPage from '../../Pages/AdminPage.pom';
import EmployeeLeavePage from '../../Pages/EmployeeLeavePage.pom';
import { faker } from '@faker-js/faker';
import Employee from '../../Entities/employee';
import AddEmployee from '../../Pages/AddEmployee.pom'
//valid_users.json file loading process
const datafile = path.join(__dirname, "../../fixtures/valid_users.json");
const valid_users = JSON.parse(fs.readFileSync(datafile, "utf-8"));
test(' Employee applies for leave via API Req and admin approves it ',async({page,page2})=>{
  const firstname=faker.person.firstName();
  const lastName =faker.person.lastName();
  const username=faker.internet.username();
  const password =faker.internet.password();
  // const confirmpass=password;
 const emp:Employee=new Employee(firstname,lastName,username,password);
 const addEmpObj:AddEmployee=new AddEmployee(page);
 const empleaveobj:EmployeeLeavePage=new EmployeeLeavePage(page); 


const loginobj:Login=new Login(page);
const adminpageobj:AdminPage=new AdminPage(page);
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await loginobj.login(valid_users[0].username, valid_users[0].password);
     await loginobj.pageUrlAssertion();
  
const fromDate=faker.date.between({
 from: '2025-10-31', to: '2025-11-15'
}).toString();
const toDate=faker.date.between({
 from: '2025-11-16', to: '2025-12-10'
}).toString();

// console.log(await response.json());
await loginobj.logout();




// await loginobj.login(emp.username,emp.password);
const emploginobj:Login =new Login(page2);
await empleaveobj.navigatetoapplyquick();
await empleaveobj.ApplytoLeave(fromDate,toDate);
await expect(page.locator('div[class="oxd-toast oxd-toast--success oxd-toast-container--toast"]')).toBeVisible();
// await loginobj.logout();
// await emploginobj.login();

await expect(emploginobj.pageUrlAssertion());
await adminpageobj.NavigatetoLeavePage();
await adminpageobj.LeavePageAssertion();
await empleaveobj.approveLeave();
await expect(page.locator('div[class="oxd-toast oxd-toast--success oxd-toast-container--toast oxd-toast-list-enter-active oxd-toast-list-enter-to"]'))
.toBeVisible();



})