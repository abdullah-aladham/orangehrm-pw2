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
test(' Employee applies for leave via API Req and admin approves it ',async({request,page})=>{
 const empleaveobj:EmployeeLeavePage=new EmployeeLeavePage(page); 

//  const loginobj: Login = new Login(page);
//   await page.goto(
//     "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
//     { timeout: 10000 },
//   );
const loginobj:Login=new Login(page);
     const adminpageobj:AdminPage=new AdminPage(page);
//  const empleaveobj:EmployeeLeavePage=new EmployeeLeavePage(page);
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await loginobj.login(valid_users[0].username, valid_users[0].password);
     await loginobj.pageUrlAssertion();
    
//     await adminpageobj.NavigatetoPIM();
//      const employeeLeavePage:EmployeeLeavePage=new EmployeeLeavePage(page);
//  await    employeeLeavePage.navigateToAddEntitlements();
await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/leave/addLeaveEntitlement");
   const response=await request.post(
     "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/leave/leave-entitlements"
,{
  data: {
    "empNumber": 173,
    "leaveTypeId": 4,
    "fromDate": "2025-01-01",
    "toDate": "2026-08-24",
    "entitlement": "25"
}
,headers:{ 'Content-Type': 'application/json'}
});  
 expect(response.ok()).toBeTruthy();       // status 200–299
  const responseBody = await response.json();
  console.log(responseBody);
// expect(response.status()).toBe(200);
const fromDate=faker.date.between({
 from: '2025-10-31', to: '2025-11-15'
}).toString();
const toDate=faker.date.between({
 from: '2025-11-16', to: '2025-12-10'
}).toString();

console.log(await response.json());
await loginobj.logout();
await loginobj.login(valid_users[1].username,valid_users[1].password);

// await adminpageobj.NavigatetoLeavePage();
await empleaveobj.navigatetoapplyquick();
await empleaveobj.ApplytoLeave(fromDate,toDate);
await expect(page.locator('div[class="oxd-toast oxd-toast--success oxd-toast-container--toast"]')).toBeVisible();
await loginobj.logout();
await loginobj.login(valid_users[0].username,valid_users[0].password);

await expect(loginobj.pageUrlAssertion());
await adminpageobj.NavigatetoLeavePage();
await adminpageobj.LeavePageAssertion();
await empleaveobj.approveLeave();
await expect(page.locator('div[class="oxd-toast oxd-toast--success oxd-toast-container--toast oxd-toast-list-enter-active oxd-toast-list-enter-to"]'))
.toBeVisible();



})