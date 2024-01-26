<template>
    <div class="pa-2 d-flex align-center">
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
const text = ref('')
const $conversation = useConversationStore()
const {conversation} = storeToRefs($conversation)
const socket = window.socket
const sendMessage = () => {
    socket.emit('send-message', {room: conversation.value?._id, text: text.value})
    text.value = ''
}

</script>

<style scoped>

</style>