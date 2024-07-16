<template>
    <v-app-bar class="border-b px-5" flat v-if="conversation">
        <v-avatar size="45" class="">
            <v-img :src="'https://avatar.iran.liara.run/public?number=' + conversation.persons[0]._id"></v-img>
        </v-avatar>
        <div class="d-flex flex-column pl-5">
            <h3>{{ conversation.persons[0].name }}</h3>
            <h6 class="font-weight-regular text-grey-darken-1">{{ conversation.persons[0].email }}</h6>
        </div>
        <v-spacer></v-spacer>
        <v-btn class="ml-2" variant="plain" icon="mdi-phone"></v-btn>
        <v-btn class="ml-2" variant="plain" icon="mdi-video" @click="$conversation.openCallWindow({conversation, caller: true, room:null})"></v-btn>
        <v-btn class="ml-2" variant="plain" icon="mdi-dots-horizontal-circle"></v-btn>
    </v-app-bar>
</template>

<script setup lang="ts">
const {conversation} = storeToRefs(useConversationStore())
const $conversation = useConversationStore()
</script>

<style scoped>

</style>