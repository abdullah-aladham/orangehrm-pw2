import {test,expect} from "@playwright/test";
import Login from "../../Pages/Login";
import * as fs from 'fs';
import * as path from 'path';

//valid_users.json file loading process
const datafile=path.join(__dirname,'../../fixtures/valid_users.json');
const valid_users = JSON.parse(fs.readFileSync(datafile, 'utf-8'));
test.beforeAll(async({page})=>{
        const loginobj:Login =new Login(page);

    await loginobj.login(valid_users.username,valid_users.password);
})
// test('Adds Employee Successfully',({page})=>{

// })