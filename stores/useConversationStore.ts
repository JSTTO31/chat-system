import type { User } from "./useUserStore"

type Message = {
    _id: Number,
    conversation: Number,
    text: String,
    from: Number,
    createdAt: string,
    updatedAt: string
}

export interface Conversation {
    _id: number,
    persons: User[],
    type: String,
    messages: Message[],
    createdAt: string,
    updatedAt: string
}




export const useConversationStore = defineStore('conversation', () => {
    const conversations = ref<Conversation[] | null>(null)
    const conversation = ref<Conversation | null>(null)

    async function fetchConversation(){
        try {
            const response = await useApiFetch('/conversations', {})
            const {data, error} = response;
            if(!error.value){
                conversations.value = data.value.conversations
                if(conversations.value && conversations.value.length > 0){
                    conversation.value = conversations.value[0]
                }
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


    return {fetchConversation, sendMessage, conversations, conversation}
})