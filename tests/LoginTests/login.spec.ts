import { test, expect } from "@playwright/test";
import Login from "../../Pages/Login";
import * as fs from "fs";
import * as path from "path";
//valid_users.json file loading process
const datafile = path.join(__dirname, "../../fixtures/valid_users.json");
const valid_users = JSON.parse(fs.readFileSync(datafile, "utf-8"));
//invalid_users.json file loading process
const invalidData = path.join(__dirname, "../../fixtures/invalid_users.json");
const invalid_users = JSON.parse(fs.readFileSync(invalidData, "utf-8"));
// test.beforeAll(async({page})=>{

//     await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

// })
test("successfuly logs in", async ({ page }) => {
  const loginobj: Login = new Login(page);
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    { timeout: 10000 },
  );

  // await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
  await loginobj.login(valid_users[0].username, valid_users[0].password);
});
test("Fails to Login due to wrong password", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    { timeout: 10000 },
  );

  const loginobj: Login = new Login(page);

  await loginobj.login(invalid_users[1].username, invalid_users[1].password);
});
test("Fails to login due to wrong username", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    { timeout: 10000 },
  );

  const loginobj: Login = new Login(page);

  await loginobj.login(invalid_users[0].username, invalid_users[0].password);
});
test("tries to log in with blank data", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    { timeout: 10000 },
  );

  const loginobj: Login = new Login(page);

  await loginobj.login_with_blank_data();
});
