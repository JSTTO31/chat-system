<template>
     <v-navigation-drawer width="375" color="grey-lighten-5">
            <v-layout class="h-100 w-100" style="overflow: visible">
                <v-app-bar flat class="px-2">
                        <v-text-field label="Search" v-model="search" prepend-inner-icon="mdi-magnify" density="compact" variant="solo-filled" flat hide-details single-line></v-text-field>
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