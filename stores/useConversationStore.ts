import type { Socket } from "socket.io-client"
import type { User } from "./useUserStore"

type Options = {
    conversation: Conversation,
    caller: boolean,
    room: string | null  
}

type Message = {
    _id: string,
    conversation: Number,
    text: String,
    from: Number,
    createdAt: string,
    updatedAt: string
}

export interface Conversation {
    _id: string,
    persons: User[],
    type: String,
    messages: Message[],
    createdAt: string,
    updatedAt: string,
    callStatus: string | null
}

export const useConversationStore = defineStore('conversation', () => {
    const {user} = storeToRefs(useUserStore())
    const conversations = ref<Conversation[] | null>(null)
    const conversation = ref<Conversation | null>(null)
    const room = ref<Socket | null>(null)
    const someoneCalling = computed(() => conversations.value && conversations.value.some(item => item.callStatus == 'someone-calling'))
    const windowCall : Ref<Window | null> = ref(null)

    async function fetchConversation(){
        try {
            const response = await useApiFetch('/conversations', {})
            const {data, error} = response;
            if(!error.value){
                conversations.value = data.value.conversations.slice(0, 5).map((item: Conversation) => ({...item, callStatus: null}))
            }
            return response
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async function getConversationById(id: string){
        try {
            const response = await useApiFetch(`/conversations/${id}`, {method: 'POST'})
            const {error, data} = response;
            if(!error.value){
                data.value.conversation.callStatus = null
                conversation.value = data.value.conversation
            }
            
            return response
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async function sendMessage(text: string){
        if(!conversation.value || !text) return
        try {
            const response = await useApiFetch(`/conversations/${conversation.value._id}/send-message`, {method: 'POST', body: {text}})
            const {error, data} = response;
            if(!error.value){
                conversation.value.messages.push(data.value.message as Message)
                conversation.value.updatedAt = new Date().toISOString()
            }
            
            return response
        } catch (error) {
            console.error(error)
            return error
        }
    }

    const openCallWindow = ({conversation, caller, room} : Options) => {
        if(windowCall.value){
            if(windowCall.value.closed){
                windowCall.value = null
                openCallWindow({conversation, caller, room})
            }else{
                windowCall.value.focus()
            }
        }else{
            const router = useRouter()
            const routeData = router.resolve({name: 'call-call_id', params: {call_id: room ? room : useRandomAlphanumeric(25)}, query: {is_caller: caller.toString(), conversation_id: conversation._id}})
            windowCall.value = window.open(routeData.href, '_blank', 'width=1250,height=750')
            setTimeout(() => {
                if(windowCall.value){
                    const message = {type: 'conversation', payload: JSON.stringify({conversation: conversation, person: user.value})}
                    windowCall.value.postMessage(message, 'http://localhost:3000')
                }
            }, 2000)
        }
    }


    function setCallStatus(convo_id: string, status: string){
        if(conversations.value){
            conversations.value = conversations.value.map(item => item._id == convo_id ? ({...item, callStatus: status}) : item)
        }
    }


    function unsetWindowCall(){
        windowCall.value = null
        if(conversations.value){
            conversations.value = conversations.value.map(item => ({...item, callStatus: null}))
        }
    }

    return {fetchConversation, sendMessage, getConversationById, setCallStatus, openCallWindow, unsetWindowCall, someoneCalling, conversations, conversation, room}
})