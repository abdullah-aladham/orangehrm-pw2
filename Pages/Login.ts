import { Browser, chromium, expect, Page } from "@playwright/test";

// import Page from "@playwright/test";
class Login {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  elements = {
    username: () => this.page.locator("input[name='username']"),
    password: () => this.page.locator('input[name="password"]'),
    // inputalert:(page:Page)=>  this.page.getByRole('span', {name :'required'}),
    loginbutton: () => this.page.locator('button[type="submit"]'),
    inputErrmsg1st: () =>
      this.page.locator("span").getByText("Required").first(),
    inputErrmsg2nd: () =>
      this.page.locator("span").getByText("Required").last(),
    invalidcredentialsMsg: () => this.page.getByText("Invalid credentials"),
  };
  async login(username: string, password: string) {
    await this.elements.username().fill(username);
    await this.elements.password().fill(password);
    await this.elements.loginbutton().click();
  }
  async pageUrlAssertion() {
    await expect(this.page).toHaveURL(
      "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index",
    );
  }
  async InvalidCredentialsBoxAssertion() {
    await expect(this.elements.invalidcredentialsMsg()).toBeVisible();
  }
  async inputErrMsgAppearAssertion() {
    await expect(this.elements.inputErrmsg1st()).toBeVisible();
    await expect(this.elements.inputErrmsg2nd()).toBeVisible();
  }
  async login_with_blank_data() {
    await this.elements.loginbutton().click();
    await this.inputErrMsgAppearAssertion();
  }
}
export default Login;
