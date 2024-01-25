import type { AsyncData } from "nuxt/dist/app/composables"

//@ts-ignore
export default async (url: string, options: Object) : Promise<AsyncData<DataT, ErrorT>> => {
    const {token} = storeToRefs(useUserStore())

    return useFetch('http://localhost:3001/api' + url, {
        headers: {
            accept: 'application/json',
            "Content-Type" : 'application/json',
            Authorization: `Bearer ${token.value}`
        },
        onResponseError({response}){
            if(response.status == 401){
                const {user, token} = storeToRefs(useUserStore())
                user.value = null
                token.value = null
                localStorage.removeItem('userData')
                location.reload()
            }
        },
        ...options
    })
}