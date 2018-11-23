export interface UserDetail {
    firstName?: string,
    lastName?: string,
    password: string,
    email: string
}

export interface GoogleAuthResult {
    Zi:  {id_token: string }
}