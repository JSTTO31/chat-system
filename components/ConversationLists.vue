<template>
     <v-navigation-drawer width="375" color="grey-lighten-5">
            <v-layout class="h-100 w-100" style="overflow: visible">
                <v-app-bar flat class="px-2" height="140">
                    <div class="h-100 pa-2 pt-5 d-flex w-100 flex-column">
                        <h1 class="mb-2">Messages (25)</h1>
                        <div>
                            <v-text-field label="Search" rounded="xl" v-model="search" prepend-inner-icon="mdi-magnify" variant="solo-filled" flat hide-details single-line></v-text-field>
                        </div>
                    </div>
                </v-app-bar>
                <v-main style="overflow-y: auto;" id="main">
                    <div v-if="conversations">
                       <conversation-list-item v-for="convo in filtered" :key="convo._id" :convo="convo"></conversation-list-item>
                    </div>
                </v-main>
            </v-layout>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
const {conversations, conversation} = storeToRefs(useConversationStore())
const search = ref('')
//@ts-ignore
const filtered = computed(() => conversations.value?.filter(item => !search.value || item.persons[0].name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)))



</script>

<style scoped>


</style>