import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'; // 1
import Login from '../Pages/Login';


test.skip('should not have any automatically detectable accessibility issues',async({page})=>{
await page.goto('https://practicesoftwaretesting.com/');
const accessibilityRes=await new AxeBuilder({page}).analyze();
expect(accessibilityRes).toEqual([]);

})
test('Dashboard accessibilty issues',async ({page})=>{
    const loginpageobj:Login=new Login(page);
page.goto('/');
loginpageobj.login('Admin','admin123');
loginpageobj.pageUrlAssertion();
await page.goto('web/index.php/dashboard/index');
const accessibilityRes=await new AxeBuilder({page}).analyze();
console.log(accessibilityRes);
expect(accessibilityRes).toEqual([]);
})