<template>
    <v-main class="text-white" id="main">
        <!-- <img id="image" class="w-100 h-100" crossorigin="anonymous"> -->
        <canvas id="canvas" class="bg-black w-100 h-100">
        </canvas>
        <div style="position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);" class="text-white">
            <div v-if="conversation" >
                <v-avatar size="250">
                    <v-img :src="'https://source.unsplash.com/random/250x250/?person&' + conversation._id"></v-img>
                </v-avatar>
                <h2 class="text-center mt-5">{{ conversation.persons[0].name }}</h2>
                <div v-if="!streaming">
                    <h4 class="text-center font-weight-regular" v-if="declined && isCaller">Call Declined</h4>
                    <h4 class="text-center font-weight-regular" v-else-if="declined">Stop calling</h4>
                    <h4 class="text-center font-weight-regular" v-else>Ringing</h4>
                </div>
                <div>
                    {{  }}
                </div>
            </div>
            <div v-else>
                <v-progress-circular indeterminate color="primary" size="75"></v-progress-circular>
            </div>
        </div>
        <v-card style="position: fixed;bottom: 80px;right: 10px;" class="rounded-lg" height="150" width="250">
            <video id="video" class="w-100"></video>
        </v-card>
        <v-card variant="tonal" style="position: fixed;bottom: 0px;" color="grey-darken-4" class="d-flex bg-transparent w-100 py-3 justify-center" v-if="declined && !streaming">
            <div class="d-flex flex-column">
                <v-btn size="large" icon="mdi-phone" class="mx-5" color="green-lighten-1" @click="redial"></v-btn>
                <span class="text-white text-center mt-3">Redial</span>
            </div>
            <div class="d-flex flex-column">
                <v-btn size="large" icon="mdi-close" class="mx-5" color="bg-grey-lighten-1" @click="decline"></v-btn>
                <span class="text-white text-center mt-3">Close</span>
            </div>
        </v-card>
        <v-card variant="tonal" style="position: fixed;bottom: 0px;" color="grey-darken-4" class="d-flex bg-transparent w-100 py-3 justify-center" v-else-if="isCaller || streaming">
            <v-btn icon="mdi-table-multiple" class="mx-2" color="grey-darken-4"></v-btn>
            <v-btn icon="mdi-account-plus" class="mx-2" color="grey-darken-4"></v-btn>
            <v-btn icon="mdi-video" class="mx-2" color="grey-darken-4"></v-btn>
            <v-btn icon="mdi-microphone" class="mx-2" color="grey-darken-4"></v-btn>
            <v-btn icon="mdi-phone-hangup" class="mx-2" color="error" @click="close"></v-btn>
        </v-card>
        <v-card variant="tonal" style="position: fixed;bottom: 0px;" color="grey-darken-4" class="d-flex bg-transparent w-100 py-3 justify-center" v-else>
            <div class="d-flex flex-column">
                <v-btn size="large" icon="mdi-phone" class="mx-5" color="success" @click="accept"></v-btn>
                <span class="text-white text-center mt-3">Answer</span>
            </div><div class="d-flex flex-column">
                <v-btn size="large" icon="mdi-phone-hangup" class="mx-5" color="error" @click="close"></v-btn>
                <span class="text-white text-center mt-3">Hang up</span>
            </div>
        </v-card>
        <v-btn  @click="fullscreen" icon="mdi-fullscreen" style="position: fixed;top: 15px;right: 25px;" color="white" variant="text" size="large"></v-btn>
    </v-main>
</template>

<script setup lang="ts">
import { Socket, io } from "socket.io-client";
const {conversation} = storeToRefs(useConversationStore())
const {user} = storeToRefs(useUserStore())
const route = useRoute()
const streaming = ref(false)
const declined = ref(false)
const room = route.params.call_id
const isCaller = ref(route.query.is_caller == 'true')
const callSocket =  io('http://localhost:3001').emit('join_room', room)
const conversationSocket = io('http://localhost:3001')

let callingInterval : NodeJS.Timeout | null = null
let timeStarted : Date | null = null
let currentTime : Date | null = null
let video : HTMLVideoElement | null = null
let canvas : HTMLCanvasElement | null = null
let main : HTMLElement | null = null
let context : CanvasRenderingContext2D | null = null 

callSocket.on("streaming", ({imageUrl}) => {
    console.log('streaming');
    
    const image = new Image()
    image.src = imageUrl
    context.drawImage(image, 0,0, canvas.width, canvas.height)
    
})

callSocket.on('declined', () => {
    declined.value = true
    stopCalling()
})

callSocket.on('call-start', () => {
    streaming.value = true
    timeStarted = new Date()
    setInterval(() => {
        currentTime = new Date()
    },1000)
})

conversationSocket.on('stop-calling', () => {
    declined.value = true
})



const accept = () => {
    if(callingInterval) clearInterval(callingInterval)
    callSocket.emit('call-start', room)
}

const redial = () => {
    declined.value = false
    isCaller.value = true
    callingInterval = setInterval(() => {
        conversationSocket.emit('calling', {room, person: user.value, conversation_id: conversation.value?._id})
    }, 2500)
}


const startCalling = () => {
    declined.value = false
    callingInterval = setInterval(() => {
        conversationSocket.emit('calling', {room, person: user.value, conversation_id: conversation.value?._id})
    }, 2500)
}

const stopCalling = () => {
    callSocket.emit('stop-calling', conversation.value?._id)
    if(callingInterval) clearInterval(callingInterval)
}

const decline = () => {
    if(!streaming.value){
        callSocket.emit('decline', ({room, person: user}))
    }

    window.close()
}

const fullscreen = () => {
    document.body.requestFullscreen
}

const close = () => {
    if(!isCaller){
        decline()
    }else{
        stopCalling()
    }
    window.close()
}

const receiveMessage = (event: MessageEvent) => {
    const message = event.data
    if(message.type == 'conversation'){
        const payload =  JSON.parse(message.payload)
        conversation.value = payload.conversation
        user.value = payload.person
        window.postMessage({type: 'conversation', received: true})
        conversationSocket.emit('join_room', conversation.value?._id)
        if(isCaller.value){
            startCalling()
        }
        removeEventListener('message', receiveMessage)
    }
}

onMounted(() => {
    main = document.getElementById("main")
    video  = document.getElementById("video") as HTMLVideoElement
    canvas = document.getElementById("canvas") as HTMLCanvasElement
    context = canvas.getContext("2d")
    canvas.style.width = window.innerWidth + 'px'
    canvas.style.height = window.innerHeight + 'px'
    
    let promise = navigator.mediaDevices.getUserMedia({video: true})
    promise.then((signal) => {
        if(video){
            video.srcObject = signal
            video.play()


        }
        
        // setInterval(() => {
        //     const context = canvas.getContext("2d")
        //     context?.drawImage(video, 0, 0, canvas.width, canvas.height)
        //     callSocket.emit("streaming", {room, imageUrl: canvas.toDataURL("image/jpg")})
        // }, 100)

    }).catch((err) => alert("error:" + err))
    
    window.addEventListener("message", receiveMessage)

})


window.onbeforeunload = () => {
    if(!isCaller.value){
        decline()
    }else{
        stopCalling()
    }
}

</script>

<style scoped>

</style>