class Employee {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  confirmpass: string;
  constructor(
    firstname: string,
    lastname: string,
    username: string,
    password: string,
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
    this.confirmpass = this.password;
  }
}
export default Employee;
