import test, { chromium, expect, Page} from '@playwright/test';
import Login from '../Pages/Login';
import * as fs from "fs";
import * as path from "path";
import addEmployeePage from '../Pages/AddEmployee.pom';
import AdminPage from '../Pages/AdminPage.pom';
import claimsPage from '../Pages/ClaimsPage.pom';

const datafile = path.join(__dirname, "../fixtures/valid_users.json");
const valid_users = JSON.parse(fs.readFileSync(datafile, "utf-8"));
const claimsFile = path.join(__dirname, "../fixtures/claims.json");
const claims = JSON.parse(fs.readFileSync(claimsFile, "utf-8"));
 for(const claim of claims){
test(claim.Test_name,async()=>{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const   page1:Page=await context.newPage();
    const page2:Page=await context.newPage();
    const Claimobj:claimsPage=new claimsPage(page1)
    const loginobj:Login =new Login(page1);
    const empLogin:Login=new Login(page2);
    const addEmpObj:addEmployeePage =new addEmployeePage(page1);
    const adminpageobj:AdminPage=new AdminPage(page1);
    // await console.log(claim.Test_name);

await page1.goto('/');
await expect(page1).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
await page2.goto('/');
await expect(page2).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
await loginobj.login(valid_users[0].username,valid_users[0].password);
await loginobj.pageUrlAssertion();


await addEmpObj.AddNewEmployee(valid_users[1].firstname,valid_users[1].lastname,valid_users[1].username,valid_users[1].password);
await addEmpObj.AddedSuccessfulyAssertion();
await empLogin.login(valid_users[1].username,valid_users[1].password);
await empLogin.pageUrlAssertion();
await adminpageobj.NavigateToClaimsPage();
//Raya's Work is here 

await Claimobj.AdminResponseToClaim(claim.Admin_response);
})
 }