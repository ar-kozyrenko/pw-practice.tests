import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { AuthResponse, LoginFields, LoginRequest, SignUpFields, SignUpRequest, User } from "./userTypes";

export class UserController{
    
    request: APIRequestContext
    
    constructor (request: APIRequestContext){
    this.request = request
    }

    //functions
    async userSignUp(userdata: SignUpFields){
     const signUpData: SignUpRequest = {
         user: userdata
     }
        const response = await this.request.post('https://conduit-api.learnwebdriverio.com/api/users', {
            data: signUpData
        }
        )
        expect(response.ok()).toBeTruthy();
        return response
}

async userLogin(userdata: LoginFields){
   const loginData: LoginRequest = {
        user: userdata
    }
   const response = await this.request.post("https://conduit-api.learnwebdriverio.com/api/users/login",
        { data: loginData }
    )
    expect(response.ok()).toBeTruthy() 
    return response
}
   
async getTokenFromResponse(response: APIResponse){
    const responseJson: AuthResponse = await response.json()
    const userToken = responseJson.user.token
    expect(userToken).toBeTruthy()
    console.log('Token is:', userToken)
    return userToken
   }





}




