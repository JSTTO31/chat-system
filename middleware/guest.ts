
export default defineNuxtRouteMiddleware((to, from) => {
    if(process.client){
        const {user, token} = storeToRefs(useUserStore())  
          
        if(user.value || token.value){
            return navigateTo('/')
        }
    }

})