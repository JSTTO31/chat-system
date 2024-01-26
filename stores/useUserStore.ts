

export type User = {
    _id: number,
    name: string,
    email: String,
}


export const useUserStore = defineStore('user', () => {
    const users = ref<User[]>([])
    const selected_user = ref<User | null>(null)
    const user = ref<User | null>(null)
    const token = ref(null) 

    async function fetchUsers(){
        const response =  await useApiFetch('/users/', {})
        const {data,error} = response
        
        if(!error.value){
            //@ts-ignore
            users.value = data.value.users
            if(users.value.length > 0){
                selected_user.value = users.value[0]
            }
        }
        return response
    }

    async function logout(){
        user.value = null
        token.value = null
        localStorage.removeItem('userData')
    }
    
    async function login(credentials: {email: string, password: string}){
        try {
            const response = await useApiFetch('/users/login', {method: 'POST', body: {...credentials}})
            const {error, data} = response;
            if(!error.value){
                //@ts-ignore
                user.value = data.value.user
                //@ts-ignore
                token.value = data.value.token
                localStorage.setItem('userData', JSON.stringify({user: user.value, token: token.value}))
            }

            return response
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async function register(information: {name: string, email: string, password: string}){
        const response = await useApiFetch('/users/sign-up', {method: 'POST', body: {...information}})
        const {data,error} = response
        if(!error.value){
            //@ts-ignore
            user.value = data.value.user
            //@ts-ignore
            token.value = data.value.token
            localStorage.setItem('userData', JSON.stringify({user: user.value, token: token.value}))
        }
        return response
    }

    async function sendMessage(text: string){
        if(!selected_user.value || !text) return
        try {
            const response = await useApiFetch(`/users/${selected_user.value._id}/messages`, {method: 'POST', body: {text}})
            const {error, data} = response;
            console.log(error.value);
            
            return response
        } catch (error) {
            console.error(error)
            return error
        }
    }

    return {login, register, fetchUsers, logout, sendMessage, users, user, token, selected_user}
})