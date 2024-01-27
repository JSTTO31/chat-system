<template>
    <div style="height: 610px;overflow-y: auto;" id="container">
        <div v-if="conversation" class="px-5 pt-10">
            <div class="d-flex align-center flex-column">
                <v-avatar size="150">
                    <v-img :src="'https://source.unsplash.com/random/250x250/?person&' + conversation._id"></v-img>
                </v-avatar>
                <h2 class="mt-5">{{  conversation.persons[0].name }}</h2>
                <h4 class="font-weight-regular">You're friend in swift chat</h4>
            </div>
           <div class="pt-10">
            <div class="d-flex" v-for="message, index in conversation.messages">
                <div class="w-75 d-flex justify-start mb-2" v-if="user && message.from != user._id">
                    <span class="pa-2 bg-grey-lighten-2 rounded-lg px-4" >{{ message.text }}</span>
                </div>
                <v-spacer></v-spacer>
                <div class="w-75 d-flex justify-end mb-2" v-if="user && message.from == user._id">
                    <span class="pa-2 bg-primary rounded-lg px-4" >{{ message.text }}</span>
                </div>
            </div>
           </div>
        </div>
        <div class="d-flex align-center pl-5" v-if="conversation && isTyping">
            <v-avatar size="25">
                <v-img :src="'https://source.unsplash.com/random/250x250/?person&' + conversation._id"></v-img>
            </v-avatar>
            <typing-loading></typing-loading>
        </div>
    </div>
</template>

<script setup lang="ts">
const {conversation} = storeToRefs(useConversationStore())
const {user} = storeToRefs(useUserStore())
let main : HTMLElement | null = null
let timer : null | NodeJS.Timeout = null
const isTyping = inject('typing') as Ref<string>
let delay_show : NodeJS.Timeout | null = null
watch(() => conversation.value?.messages.length, () => {
    if(main){
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
            if(main)
            main.scrollTo(0,main.scrollHeight)
        }, 200);
    }
})

watch(isTyping, (current) => {
    if(current){
        if(delay_show) clearTimeout(delay_show)
        delay_show = setTimeout(() => {
            if(main){
                main.scrollTo(0, main.scrollHeight)
            }
        }, 500);
    }
})



onMounted(() => {
    main = document.getElementById('container')
    if(main){
        main.scrollTo(0, main.scrollHeight)
    }
})
</script>

<style scoped>

</style>