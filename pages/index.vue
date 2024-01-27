<template>
    <v-navigation-drawer width="65" color="black" class="pa-0 d-flex flex-column">
        <v-list nav class="d-flex flex-column h-100 pt-2">
            <v-avatar size="50" class="mt-auto ml-n1">
                <v-img src="/twitter.png"></v-img>
            </v-avatar>
            <div class="my-5"></div>
            <v-btn variant="text" size="50" class="my-2" icon="mdi-view-dashboard-outline" @click=""></v-btn>
            <v-btn variant="text" size="50" class="my-2" icon="mdi-chat" @click=""></v-btn>
            <v-btn variant="text" size="50" class="my-2" icon="mdi-account-multiple" @click=""></v-btn>
            <v-btn variant="text" size="50" class="my-2" icon="mdi-inbox" @click=""></v-btn>
            <v-btn variant="text" size="50" class="my-2" icon="mdi-cog" @click=""></v-btn>
            <v-btn variant="text" size="50" class="my-2" icon="mdi-logout" @click=""></v-btn>
            
            <v-spacer></v-spacer>
        </v-list>
    </v-navigation-drawer>
    <ConversationLists></ConversationLists>
    <NuxtPage :keepalive="true"></NuxtPage>
</template>

<script setup lang="ts">
useHead({
    title: 'SwiftChat | Home'
})
definePageMeta({
    middleware: ['auth']
})
const $conversation = useConversationStore()
const {conversations} = storeToRefs($conversation)
const $user = useUserStore()
const router = useRouter()
const logout = () => {
    $user.logout()
    router.push({name: 'login'})
}


$conversation.fetchConversation().then(() => {
    if(conversations.value && conversations.value?.length > 0){
        router.push({name: 'index-r-conversation_id', params: {conversation_id: conversations.value[0]._id}})
    }
})
</script>

<style scoped>

</style>