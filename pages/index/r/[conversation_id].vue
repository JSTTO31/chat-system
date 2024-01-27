<template>
    <ConversationDetails></ConversationDetails>
    <ConversationAppBar></ConversationAppBar>
    <v-main class="d-flex flex-column">
        <ConversationContainer v-if="conversation"></ConversationContainer>
        <v-spacer></v-spacer>
        <v-divider></v-divider>
        <ConversationActions v-if="conversation"></ConversationActions>
    </v-main>
</template>

<script setup lang="ts">
import { io } from "socket.io-client";
import { computed, onMounted, onUnmounted, provide, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
const socket = io('http://localhost:3001')
const {conversation, conversations} = storeToRefs(useConversationStore())
const route = useRoute()
const router = useRouter()
const typing = ref(false)

socket.emit('join_room', route.params.conversation_id)
.on('typing', () => {
    typing.value = true
})
.on('stop-typing', () => {
    typing.value = false
})


provide("socket", socket)
provide("typing", typing)


onMounted(() => {
    if(conversations.value){
        const findConversation = conversations.value.find(item => item._id == route.params.conversation_id.toString())
        if(!findConversation){
            router.push("/")
        }else{
            conversation.value = findConversation
        }
    }
})

onUnmounted(() => {
    if(conversation.value){
        socket.emit('leave_room', route.params.conversation_id)
    }
})

onBeforeRouteUpdate((to, from, next) => {
    if(!conversations.value) return next('/')

    const findConversation = conversations.value.find(item => item._id == to.params.conversation_id.toString())
    if(!findConversation){
        return next('/')
    }else{
        conversation.value = findConversation
        return next()
    }
})


</script>

<style scoped>

</style>