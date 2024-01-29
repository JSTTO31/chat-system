<template>
    <div class="pa-2 d-flex align-center" id="actions">
        <v-text-field  ref="textField" v-model="text" @keyup.enter="sendMessage()" rounded="xl" single-line hide-details variant="solo-filled" flat label="Enter your message">
            <template #append-inner>
                <v-btn class="ml-2" icon="mdi-emoticon-outline" color="primary" variant="text"></v-btn>
                <v-btn class="ml-2" icon="mdi-microphone" color="primary" variant="text"></v-btn>
            </template>
        </v-text-field>
        <v-btn @click="sendMessage()" class="ml-3" icon="mdi-send" color="primary" variant="elevated" flat>
        </v-btn>
    </div>
</template>

<script setup lang="ts">
const text = ref('')
const $conversation = useConversationStore()
const {conversation, room} = storeToRefs($conversation)
const {user} = storeToRefs(useUserStore())
let textField = ref();
let typing_timeout : NodeJS.Timeout | null = null

const sendMessage = () => {
    if(conversation.value && user.value && room.value){
        room.value.emit('send-message', {room: conversation.value?._id, message: {
            conversation: conversation.value._id,
            text: text.value,
            from: user.value._id
        }}) 
    }
    text.value = ''
}

watch(text, (current) => {
    if(room.value){
        if(!current){
            room.value.emit("stop-typing",{room: conversation.value?._id, person_id: user.value?._id})
        }else{
            room.value.emit("typing", {room: conversation.value?._id, person_id: user.value?._id})
            if(typing_timeout) clearTimeout(typing_timeout)
            typing_timeout = setTimeout(() => {
                if(room.value){
                    room.value.emit("stop-typing",{room: conversation.value?._id, person_id: user.value?._id})
                }
            }, 2500)

        }
    }
})


onMounted(() => {
    if(textField.value){
        textField.value.focus()
    }
})


</script>

<style scoped>

</style>