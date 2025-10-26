import test from '@playwright/test';
import Login from '../Pages/Login';
import * as fs from "fs";
import * as path from "path";
import addEmployeePage from '../Pages/AddEmployee.pom';
import AdminPage from '../Pages/AdminPage.pom';

const datafile = path.join(__dirname, "../../fixtures/valid_users.json");
const valid_users = JSON.parse(fs.readFileSync(datafile, "utf-8"));
for(claim in claims.length()){
test('Claims Test case',async({page1,page2})=>{
    const loginobj:Login =new Login(page1);
    const addEmpObj:addEmployeePage =new addEmployeePage(page1);
    
await page1.goto('/');
await loginobj.login(valid_users[0].username,valid_users[0].password);
await loginobj.pageUrlAssertion();
await addEmpObj.AddNewEmployee(valid_users[1].firstname,valid_users[1].lastname,valid_users[1].username,valid_users[1].password);


})
}