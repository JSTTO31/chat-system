<template>
    <v-navigation-drawer width="65" color="primary" class="pa-0 d-flex flex-column">
        <v-list nav class="d-flex flex-column h-100">
            <v-menu>
                <template #activator="{props}">
                    <v-badge location="top left" dot color="success">
                        <v-avatar size="45" class="mt-auto" v-bind="props">
                            <v-img :src="'https://source.unsplash.com/random/120x120/?person'"></v-img>
                        </v-avatar>
                    </v-badge>
                </template>
                <v-card width="250">
                    <v-list>
                        <v-list-item prepend-icon="mdi-logout" @click="logout">Logout</v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
            <v-spacer></v-spacer>
            <v-btn rounded="lg" variant="text" size="50" class="my-2" icon="mdi-home" @click=""></v-btn>
            <v-btn rounded="lg" variant="text" size="50" class="my-2" icon="mdi-message" @click=""></v-btn>
            <v-btn rounded="lg" variant="text" size="50" class="my-2" icon="mdi-account-multiple" @click=""></v-btn>
            <v-btn rounded="lg" variant="text" size="50" class="my-2" icon="mdi-inbox" @click=""></v-btn>
            <v-btn rounded="lg" variant="text" size="50" class="my-2" icon="mdi-bell" @click=""></v-btn>
            <v-spacer></v-spacer>
            <v-btn rounded="lg" variant="text" size="50" class="my-2" icon="mdi-cog" @click=""></v-btn>
        </v-list>
    </v-navigation-drawer>
    <ConversationLists></ConversationLists>
    <ConversationDetails></ConversationDetails>
    <ConversationAppBar></ConversationAppBar>
    <v-main class="d-flex flex-column ">
        <ConversationContainer></ConversationContainer>
        <v-spacer></v-spacer>
        <v-divider></v-divider>
        <ConversationActions></ConversationActions>
    </v-main>
</template>

<script setup lang="ts">
useHead({
    title: 'SwiftChat | Home'
})
definePageMeta({
    middleware: ['auth']
})
const text = ref('')
const $conversation = useConversationStore()
const $user = useUserStore()
const router = useRouter()
const logout = () => {
    $user.logout()
    router.push({name: 'login'})
}


$conversation.fetchConversation()
</script>

<style scoped>

</style>