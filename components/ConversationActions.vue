<template>
    <div class="pa-2 d-flex align-center" id="actions">
        <v-text-field v-model="text" @keyup.enter="sendMessage()" rounded="xl" prepend-inner-icon="mdi-paperclip" single-line hide-details variant="solo-filled" flat label="Enter your message">
            <template #append-inner>
                <v-btn class="ml-2" icon="mdi-emoticon-outline" color="primary" variant="text"></v-btn>
                <v-btn class="ml-2" icon="mdi-microphone" color="primary" variant="text"></v-btn>
            </template>
        </v-text-field>
        <v-btn class="ml-3" icon="mdi-send" color="primary" variant="elevated" flat>
        </v-btn>
    </div>
</template>

<script setup lang="ts">
import { io } from "socket.io-client";
const text = ref('')
const $conversation = useConversationStore()
const {conversation} = storeToRefs($conversation)
const {user} = storeToRefs(useUserStore())
const socket = io('http://localhost:3001')
let action : HTMLElement | null = null;
const sendMessage = () => {
    if(conversation.value && user.value){
        socket.emit('send-message', {room: conversation.value?._id, message: {
            conversation: conversation.value._id,
            text: text.value,
            from: user.value._id
        }}) 
        
    }
    text.value = ''
}

watch(conversation, (current, old) => {
    if(old?._id != current?._id){
        if(old){
            socket.emit('leave_room', old._id)
        }

        socket.emit('join_room', current?._id)
    }
})

watch(text, () => {
    if(text.value){
        
    }
})


onMounted(() => {
    action = document.getElementById('actions')
})


</script>

<style scoped>

</style>