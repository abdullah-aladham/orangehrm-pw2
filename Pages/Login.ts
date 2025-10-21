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
    userprofilebtn: ()=>this.page.locator('i[class="oxd-icon bi-caret-down-fill oxd-userdropdown-icon"]'),
    logoutbtn : ()=> this.page.getByRole('menuitem', { name: 'Logout' })
  };
  async pageUrlAssertion() {
    await expect(this.page).toHaveURL(
      "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index",
    );
  }
  async login(username: string, password: string) {
    
    await this.elements.username().fill(username);
    await this.elements.password().fill(password);
    await this.elements.loginbutton().click();
    // await this.pageUrlAssertion();
  }
  // async pageUrlAssertion() {
  //   await expect(this.page).toHaveURL(
  //     "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index",
  //   );
  // }
  async InvalidCredentialsBoxAssertion() {
    await expect(this.elements.invalidcredentialsMsg()).toBeVisible();
  }

  async inputErrMsgAppearAssertion() {
    await expect(this.elements.inputErrmsg1st()).toBeVisible();
    await expect(this.elements.inputErrmsg2nd()).toBeVisible();
    // await this.InvalidCredentialsBoxAssertion();
  }
  async login_with_blank_data() {
    await this.elements.loginbutton().click();
    await this.inputErrMsgAppearAssertion();
  }
  async logout(){
    this.elements.userprofilebtn().click();
    this.elements.logoutbtn().click();
  }
}
export default Login;
