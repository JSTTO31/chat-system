
export default defineNuxtRouteMiddleware((to, from) => {
    if(process.client){
        const {user} = storeToRefs(useUserStore())  
        const token = localStorage.getItem("userData") 
          
        if(user.value || token){
            return navigateTo('/')
        }
    }

})