import { test, expect } from "@playwright/test";
import Login from "../../Pages/Login";
import * as fs from "fs";
import * as path from "path";
import Employee from "../../Entities/employee";
import AdminPage from "../../Pages/AdminPage.pom";
import { faker } from "@faker-js/faker";
import addEmployeePage from "../../Pages/AddEmployee.pom";

//valid_users.json file loading process
const datafile = path.join(__dirname, "../../fixtures/valid_users.json");
const valid_users = JSON.parse(fs.readFileSync(datafile, "utf-8"));
// test.beforeAll(async({page})=>{

// })
test("Adds Employee Successfully", async ({ page }) => {
  const loginobj: Login = new Login(page);

  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    { timeout: 10000 },
  );
  await loginobj.login(valid_users[0].username, valid_users[0].password);

  let firstname = faker.person.firstName();
  let lastname = faker.person.lastName();
  let username = faker.internet.username();
  let password = faker.internet.password();
  let confirmpass = password;
  const emp: Employee = new Employee(firstname, lastname, username, password);
  const nvaigateobj: AdminPage = new AdminPage(page);
  const addemp: addEmployeePage = new addEmployeePage(page);
  await nvaigateobj.NavigatetoPIM();
  await addemp.AddNewEmployee(
    emp.firstname,
    emp.lastname,
    emp.password,
    emp.confirmpass,
  );
});
