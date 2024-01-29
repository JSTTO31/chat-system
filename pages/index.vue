<template>
    <v-navigation-drawer width="65" color="black" class="pa-0 d-flex flex-column">
        <v-list nav class="d-flex flex-column h-100 pt-2 px-0 align-center">
            <v-avatar size="45" class="mt-2">
                <v-img :src="'https://source.unsplash.com/random/250x250/?person'"></v-img>
            </v-avatar>
            <v-spacer></v-spacer>
            <div class="w-100">
                <v-btn variant="text" block rounded="0" height="70" icon="mdi-view-dashboard-outline" @click=""></v-btn>
            </div>
            <div class="w-100">
                <v-btn variant="text" block rounded="0" height="70" icon="mdi-chat" @click=""></v-btn>
            </div>
            <div class="w-100">
                <v-btn variant="text" block rounded="0" height="70" icon="mdi-account-multiple" @click=""></v-btn>
            </div>
            <div class="w-100">
                <v-btn variant="text" block rounded="0" height="70" icon="mdi-inbox" @click=""></v-btn>
            </div>
            <v-spacer></v-spacer>
            <div class="w-100">
                <v-btn variant="text" block rounded="0" height="70" icon="mdi-logout" @click=""></v-btn>
            </div>
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