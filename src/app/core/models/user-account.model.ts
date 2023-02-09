export class UserAccount {    
    username?: any;
    password?: any;
    confirmPassword?: any;
    token?: any;
    is_admin?: any;

    constructor( username?: string, password?: string, token?: string, is_admin?: boolean) {
        this.username = username;
        this.password = password;
        this.token = token;
        this.is_admin = is_admin;
    }
}
