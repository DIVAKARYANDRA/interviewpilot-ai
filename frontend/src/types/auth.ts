export interface RegisterRequest {

    name:string;

    email:string;

    password:string;

    experience:number;

    current_company:string;

    target_company:string;

    target_role:string;

}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}