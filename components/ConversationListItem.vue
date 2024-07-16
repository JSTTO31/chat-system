<template>
     <v-list-item :to="{name: 'index-r-conversation_id', params: {conversation_id: convo._id}}" flat class="py-4 border-b rounded-0">
        <div class="d-flex">
            <v-avatar size="55">
                <v-img :src="'https://avatar.iran.liara.run/public?number=' + convo.persons[0]._id" />
            </v-avatar>
            <div class="pl-5">
                <h4 class="text-black">{{ convo.persons[0].name }}</h4>
                <!-- <h6 class="font-weight-regular">
                    <v-icon color="success" size="10" class="mr-1">mdi-circle</v-icon>Online</h6> -->
                <div v-if="convo.callStatus">
                    <div class="d-flex align-center" v-if="someoneCalling">
                        <v-icon icon="mdi-video" class="mr-1" color="success"></v-icon>
                        is calling you
                    </div>
                    <div class="d-flex align-center" v-else>
                        <v-icon icon="mdi-video" class="mr-1" color="success"></v-icon>
                        Ongoing call
                    </div>
                </div>
                <div v-else>
                    <typing-loading class="mt-n1 ml-n2" v-if="typing"></typing-loading>
                    <v-card-title class="px-0 pt-1 text-subtitle-2 font-weight-regular text-grey-darken-1" v-else-if="!typing &&convo.messages.length > 0">{{ convo.messages[convo.messages.length - 1].text }}</v-card-title>
                    <v-card-title class="px-0 pt-1 text-subtitle-2 font-weight-regular text-grey-darken-1" v-else>You have new swift</v-card-title>
                </div>
            </div>
        </div>
        <span style="position: absolute;top: 15px; right: 15px;" class=" text-black text-caption">{{ Math.floor(Math.random() * 10) }}m</span>
    </v-list-item>
</template>

<script setup lang="ts">
import { io } from "socket.io-client";
const config = useRuntimeConfig()
const props = defineProps<{convo: Conversation}>()
const {conversation, conversations, room: roomStore, someoneCalling,} = storeToRefs(useConversationStore())
const $conversation = useConversationStore()
const {user} = storeToRefs(useUserStore())
const socket = io(config.public.backend_url as string)
const room = socket.emit('join_room', props.convo._id)
const typing = ref(false)

room.on('message', ({room, message}) => {
    const findConversation = conversations.value?.find(item => item._id == room)

    if(findConversation){
        findConversation.messages.push(message)
        findConversation.updatedAt = new Date().toISOString()
    }
})
.on('typing', ({room, person_id}) => {
    if(!user.value) return
    typing.value = person_id != user.value._id 
})
.on('stop-typing', () => {
    typing.value = false
})
.on('call-start', () => {
    $conversation.setCallStatus(props.convo._id, 'ongoing')
})
.on('calling', ({room, person}) => {
        $conversation.openCallWindow({conversation: props.convo, caller: false, room})
        $conversation.setCallStatus(props.convo._id, 'someone-calling')
})
.on('calling-stop', (room) => {
    $conversation.unsetWindowCall()
})


const selectConversation = ()=> {
    conversation.value = props.convo
    roomStore.value = room
}

onMounted(() => {
    if(conversations.value && props.convo._id == conversations.value[0]._id){
        selectConversation()
    }
})


</script>

<style scoped>

</style>