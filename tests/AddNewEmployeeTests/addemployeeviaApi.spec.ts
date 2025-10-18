import { test, expect, request as playwrightRequest } from "@playwright/test";
import { faker } from "@faker-js/faker";

class EmployeeAPI {
  private apiContext;

  constructor(apiContext: any) {
    this.apiContext = apiContext;
  }

  async addEmployeeViaApi(firstName: string, lastName: string, employeeId: string) {
    const response = await this.apiContext.post("/web/index.php/api/v2/pim/employees", {
      data: { firstName, lastName, employeeId },
    });

    expect(response.ok(), `❌ Failed to add employee: ${await response.text()}`).toBeTruthy();

    const resJson = await response.json();
    const empNumber = resJson.data.empNumber;

    console.log(`✅ Employee added: ${firstName} ${lastName} (empNumber: ${empNumber})`);

    await this.deleteEmployeeViaApi(empNumber);
  }

  async deleteEmployeeViaApi(empNumber: string) {
    const response = await this.apiContext.delete("/web/index.php/api/v2/pim/employees", {
      data: { ids: [empNumber] },
    });

    expect(response.ok(), `❌ Failed to delete employee: ${await response.text()}`).toBeTruthy();
    console.log(`🗑️ Employee deleted successfully (empNumber: ${empNumber})`);
  }

  async addMultipleEmployees(count: number) {
    for (let i = 1; i <= count; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const employeeId = faker.string.alphanumeric(6).toUpperCase();

      console.log(`\n=== Creating Employee #${i} ===`);
      await this.addEmployeeViaApi(firstName, lastName, employeeId);
    }
  }
}

test("Add multiple employees via Playwright API", async ({ page, context }) => {
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  await page.fill('input[name="username"]', "Admin");
  await page.fill('input[name="password"]', "admin123");
  await page.click('button[type="submit"]');

  
  await page.waitForSelector('text=Dashboard', { timeout: 30000 });

 
  const storage = await context.storageState();


  const apiContext = await playwrightRequest.newContext({
    baseURL: "https://opensource-demo.orangehrmlive.com",
    storageState: storage,
  });

  const employeeApi = new EmployeeAPI(apiContext);

  
  await employeeApi.addMultipleEmployees(5);

  await apiContext.dispose();
});
