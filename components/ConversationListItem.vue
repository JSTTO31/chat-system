<template>
     <v-list-item :to="{name: 'index-r-conversation_id', params: {conversation_id: convo._id}}" flat class="pa-4 border-b rounded-0">
        <div class="d-flex">
            <v-avatar size="65">
                <v-img :src="'https://source.unsplash.com/random/250x250/?person&' + convo._id"></v-img>
            </v-avatar>
            <div class="pl-5">
                <h4 class="text-black">{{ convo.persons[0].name }}</h4>
                <h6 class="font-weight-regular">
                    <v-icon color="success" size="10" class="mr-1">mdi-circle</v-icon>Online</h6>
                <div v-if="typing">
                    <typing-loading></typing-loading>
                </div>
                <v-card-title class="px-0 text-subtitle-2 font-weight-regular text-grey-darken-1" v-else-if="!typing &&convo.messages.length > 0">{{ convo.messages[convo.messages.length - 1].text }}</v-card-title>
                <v-card-title class="px-0 text-subtitle-2 font-weight-regular text-grey-darken-1" v-else>You have new swift</v-card-title>
            </div>
        </div>
        <span style="position: absolute;top: 15px; right: 15px;" class=" text-black text-caption">{{ Math.floor(Math.random() * 10) }}m</span>
    </v-list-item>
</template>

<script setup lang="ts">
import { io, Socket } from "socket.io-client";

const props = defineProps<{convo: Conversation}>()
const {conversation, conversations} = storeToRefs(useConversationStore())
const {user} = storeToRefs(useUserStore())
const socket = io('http://localhost:3001')
const room = socket.emit('join_room', props.convo._id)
const typing = ref(false)
room.on('message', ({room, message}) => {
    const findConversation = conversations.value?.find(item => item._id == room)

    if(findConversation){
        findConversation.messages.push(message)
        findConversation.updatedAt = new Date().toISOString()
    }
})


room.on('typing', ({room, person_id}) => {
    if(!user.value) return



    typing.value = person_id != user.value._id 
})

room.on('stop-typing', () => {
    typing.value = false
})



const selectConversation = ()=> {
    conversation.value = props.convo
}

onMounted(() => {
    if(conversations.value && props.convo._id == conversations.value[0]._id){
        selectConversation()
    }
})


</script>

<style scoped>

</style>