import { Browser, chromium, Page } from "@playwright/test";

// import Page from "@playwright/test";
class Login {
readonly page:Page;
constructor(page:Page){
    this.page=page;
}

    elements={
        username: ()=>  this.page.locator("input[type='text']"),
        password: ()=>  this.page.locator('input[type="password"]'),
        // inputalert:(page:Page)=>  this.page.getByRole('span', {name :'required'}),
        loginbutton: ()=> this.page.locator('button[type="submit"]'),
    };
    async login(username:string,password:string){
       this.elements.username().fill(username);
       this.elements.password().fill(password);
        this.elements.loginbutton().click();
    }
     login_with_blank_data(){
       
        this.elements.loginbutton().click();

    }
}
export default Login;