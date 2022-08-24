import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': 'ebf536e3-3303-498b-b5bb-6080ca866d8c'
    }
  }
)


export const authDAL = {
    getAuthData(){
        return instance.get('/auth/me')
    },
    logOut(){
        return instance.delete('/auth/login')
    },
    logIn(authData: { email: string, password: string, rememberMe: boolean, captcha: string} ){
        return instance.post('/auth/login', {...authData})
    },
    getCaptcha(){
        return instance.get('/security/get-captcha-url')
    }
}