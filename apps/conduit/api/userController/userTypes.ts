export type User = {
    email?: string
    token?: string
    username?: string
}

export type AuthResponse = {
    user: User
}

export type SignUpFields = {
email?: string
password?: string
username?: string
}

export type SignUpRequest = {
    user: SignUpFields
}


export type LoginFields = {
email?: string
password?: string
}


export type LoginRequest = {
    user: {
        email?: string
        password?: string
    }
}