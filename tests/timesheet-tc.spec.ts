import test, { chromium, expect, Page} from '@playwright/test';

test('Admin adds Employee and then add their time sheet and admin approves it',async()=>{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const adminbwPage:Page =await context.newPage();
    const empbwPage:Page =await context.newPage();
    

})