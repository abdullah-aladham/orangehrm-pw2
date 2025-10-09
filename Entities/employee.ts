class Employee{
    id:string
     firstname:string;
     lastname:string;
     username:string;
    password:string;
    confirmpass:string;
    constructor(id:string,firstname:string,lastname:string,username:string,password:string){
        this.id=id;
        this.firstname=firstname;
        this.lastname=lastname;
        this.username=username;
        this.password=password;
        this.confirmpass=this.password;

    }
    AddNewEmployee(){

    }
    SearchForEmployee(){

    }
    EditEmployee(){}
    DeleteEmployee(){}
}