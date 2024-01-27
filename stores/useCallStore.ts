import type { Conversation } from "./useConversationStore"

type Options = {
    conversation: Conversation,
    caller: boolean,
    room: string | null  
}


export const useCallStore = defineStore('call', () => {
    const {user} = storeToRefs(useUserStore())
    const tab : Ref<Window | null> = ref(null)
    const router = useRouter()
    const someoneCalling = computed(() => !!tab.value)

    function onCloseWindow(){
        if(tab.value && tab.value.closed){
            tab.value = null
            removeEventListener('close', onCloseWindow)
        }
    }

    const setCall = ({conversation, caller, room} : Options) => {
        const routeData = router.resolve({name: 'call-call_id', params: {call_id: room ? room : useRandomAlphanumeric(25)}, query: {is_caller: caller.toString()}})
        tab.value = window.open(routeData.href, '_blank', 'width=1250,height=750')
        setTimeout(() => {
            if(tab.value && !tab.value.closed){
                const message = {type: 'conversation', payload: JSON.stringify({conversation: conversation, person: user.value})}
                tab.value.postMessage(message, 'http://localhost:3000')
            }
        }, 2000)
        tab.value?.addEventListener('unload', onCloseWindow)


    }

    const callStart = (options : Options) => {
        if(tab.value){
            if(tab.value.closed){
                setCall(options)
            }else{
                tab.value.focus()
            }
            return
        }
        setCall(options)
    }
    return {callStart, someoneCalling, tab}

})