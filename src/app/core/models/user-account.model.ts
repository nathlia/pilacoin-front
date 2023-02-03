export class UserAccount {    
    username?: string;
    password?: string;
    confirmPassword?: string;
    token?: string;
    is_admin?: boolean;

    constructor( username?: string, password?: string, token?: string, is_admin?: boolean) {
        this.username = username;
        this.password = password;
        this.token = token;
        this.is_admin = is_admin;
    }
}
