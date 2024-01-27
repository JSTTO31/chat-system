<template>
     <v-navigation-drawer width="350" class=" pt-10 d-flex flex-column" location="right" v-if="conversation">
        <div class="d-flex justify-center">
            <v-avatar size="185">
                <v-img :src="'https://source.unsplash.com/random/250x250/?person&' + conversation._id"></v-img>
            </v-avatar>
            <v-btn icon="mdi-dots-vertical" class="ml-n10"></v-btn>

        </div>
        <div class="my-3">
            <h2 class="text-center">{{ conversation.persons[0].name}}</h2>
            <h5 class="text-center font-weight-regular text-grey-darken-1">{{ conversation.persons[0].email}}</h5>
        </div>
        <v-list>
            <v-list-item append-icon="mdi-magnify" @click="">Search messages</v-list-item>
            <v-list-item append-icon="mdi-chevron-down" @click="">Media</v-list-item>
        </v-list>
        <v-container>
            <v-row>
                <v-col v-for="n in 12" :key="n" cols="3" class="pa-1">
                    <v-card class="w-100 rounded-lg" height="78" flat>
                        <v-img class="w-100" :src="'https://source.unsplash.com/random/250x250/?images&' + n"></v-img>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-spacer></v-spacer>
        <div class="pa-2">
            <v-btn variant="tonal" color="error" block class="text-capitalize" prepend-icon="mdi-cancel">Block this account</v-btn>
        </div>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
const {conversation} = storeToRefs(useConversationStore())
</script>

<style scoped>

</style>