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
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
const {conversation, conversations} = storeToRefs(useConversationStore())
const route = useRoute()
const router = useRouter()

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