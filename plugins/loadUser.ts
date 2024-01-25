

export default defineNuxtPlugin({
    name: 'load-user',
    parallel: true,
    setup() {
        let userData = localStorage.getItem('userData')
        if(userData){
            const {user, token} = storeToRefs(useUserStore())
            userData = JSON.parse(userData)
            //@ts-ignore
            user.value = userData.user
            //@ts-ignore
            token.value = userData.token
        }
    }
})