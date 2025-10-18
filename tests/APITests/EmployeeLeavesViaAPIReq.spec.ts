import test,  {expect, Page } from '@playwright/test';
import Login from '../../Pages/Login';
import * as fs from "fs";
import * as path from "path";
import AdminPage from '../../Pages/AdminPage.pom';
import EmployeeLeavePage from '../../Pages/EmployeeLeavePage.pom';
import { faker } from '@faker-js/faker';

//valid_users.json file loading process
const datafile = path.join(__dirname, "../../fixtures/valid_users.json");
const valid_users = JSON.parse(fs.readFileSync(datafile, "utf-8"));
test('Adds Employee via API Req',async({request,page})=>{
 const empleaveobj:EmployeeLeavePage=new EmployeeLeavePage(page); 

//  const loginobj: Login = new Login(page);
//   await page.goto(
//     "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
//     { timeout: 10000 },
//   );
const loginobj:Login=new Login(page);
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await loginobj.login(valid_users[0].username, valid_users[0].password);
     await loginobj.pageUrlAssertion();
     const adminpageobj:AdminPage=new AdminPage(page);
    adminpageobj.NavigatetoPIM();
     const employeeLeavePage:EmployeeLeavePage=new EmployeeLeavePage(page);
     employeeLeavePage.navigateToAddEntitlements();

   const response=await request.post(
     "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/leave/leave-entitlements"
,{
  data: {
     "empNumber":212,
     "leaveTypeId": 2,
     "fromDate": "2025-01-01",
     "toDate": "2025-12-31",
     "entitlement": "1"
  }}

);  

// expect(response.status()).toBe(200);
const fromDate=faker.date.between({
 from: '2025-01-01T00:00:00.000Z', to: '2025-12-31T00:00:00.000Z'
}).toString();
const toDate=faker.date.between({
 from: '2025-01-01T00:00:00.000Z', to: '2025-12-31T00:00:00.000Z'
}).toString();

console.log(await response.json());
await loginobj.logout();
await loginobj.login(valid_users[1].username,valid_users[1].password);
await adminpageobj.NavigatetoLeavePage();
await empleaveobj.ApplytoLeave(fromDate,toDate);
await expect(page.locator('div[class="oxd-toast oxd-toast--success oxd-toast-container--toast"]')).toBeVisible();
await loginobj.logout();
await loginobj.login(valid_users[0].username,valid_users[0].password);
await expect(loginobj.pageUrlAssertion());
await adminpageobj.NavigatetoLeavePage();
await empleaveobj.approveLeave();
await expect(page.locator('div[class="oxd-toast oxd-toast--success oxd-toast-container--toast oxd-toast-list-enter-active oxd-toast-list-enter-to"]'))
.toBeVisible();



})