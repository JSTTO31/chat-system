<template>
     <v-card @click="conversation = convo" :variant="conversation && conversation._id == convo._id ? 'tonal' : 'elevated'" flat class="pa-4 border-b rounded-0">
        <div class="d-flex">
            <v-avatar size="50">
                <v-img :src="'https://source.unsplash.com/random/250x250/?person&' + convo._id"></v-img>
            </v-avatar>
            <div class="pl-5">
                <h4 class="text-black">{{ convo.persons[0].name }}</h4>
                <h6 class="font-weight-regular">
                    <v-icon color="success" size="10" class="mr-1">mdi-circle</v-icon>Online</h6>
            </div>
        </div>
        <span style="position: absolute;top: 15px; right: 15px;" class=" text-black text-caption">{{ Math.floor(Math.random() * 10) }}m</span>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{convo: Conversation}>()
const {conversation} = storeToRefs(useConversationStore())
const room = window.socket.emit('join_room', props.convo._id)


window.socket.on('message', ({room, text}) => {
    console.log(text);
})


</script>

<style scoped>

</style>