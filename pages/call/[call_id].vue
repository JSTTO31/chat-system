<template>
    <v-main class="text-white bg-grey-darken-4" id="main" style="overflow:hidden">
        <img id="call-image" src="/blank.jpg" class="w-100 h-100 bg-grey-darken-4" style="border: none;outline:none" crossorigin="anonymous" />
        <canvas id="call-canvas" class="w-100 h-100 d-none">
        </canvas>
        <div style="position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);" class="text-white">
            <div v-if="conversation" >
                <v-avatar size="250">
                    <v-img :src="'https://source.unsplash.com/random/250x250/?person&' + conversation._id"></v-img>
                </v-avatar>
                <h2 class="text-center mt-5">{{ conversation.persons[0].name }}</h2>
                <div v-if="!streaming">
                    <h4 class="text-center font-weight-regular" v-if="declined && isCaller">Call Declined</h4>
                    <h4 class="text-center font-weight-regular" v-else-if="hangup">Call ended</h4>
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
        <v-card style="position: fixed;bottom: 80px;right: 10px;" class="rounded-lg bg-grey-darken-3" height="150" width="250">
            <div v-if="!settings.video && user" class="h-100 w-100 d-flex justify-center flex-column align-center">
                <v-avatar size="65">
                    <v-img :src="'https://source.unsplash.com/random/250x250/?person&' + user._id"></v-img>
                </v-avatar>
                <h5 class="text-center mt-4">{{user.name}} (You)</h5>
            </div>
            <video id="call-video" class="w-100"></video>
        </v-card>
        <v-card variant="tonal" style="position: fixed;bottom: 0px;" color="grey-darken-4" class="d-flex bg-transparent w-100 py-3 justify-center" v-if="(declined && !streaming) || hangup">
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
            <v-btn @click="settings.video = !settings.video" :icon="settings.video ? 'mdi-video' : 'mdi-video-off'" class="mx-2" color="grey-darken-4"></v-btn>
            <v-btn @click="settings.audio = !settings.audio" :icon="settings.audio ? 'mdi-microphone': 'mdi-microphone-off'" class="mx-2" color="grey-darken-4"></v-btn>
            <v-btn icon="mdi-phone-hangup" class="mx-2" color="error" @click="close"></v-btn>
        </v-card>
        <v-card variant="tonal" style="position: fixed;bottom: 0px;" color="grey-darken-4" class="d-flex bg-transparent w-100 py-3 justify-center" v-else>
            <div class="d-flex flex-column">
                <v-btn size="large" icon="mdi-phone" class="mx-5" color="success" @click="accept"></v-btn>
                <span class="text-white text-center mt-3">Answer</span>
            </div><div class="d-flex flex-column">
                <v-btn size="large" icon="mdi-phone-hangup" class="mx-5" color="error" @click="close"></v-btn>
                <span class="text-white text-center mt-3">Decline</span>
            </div>
        </v-card>
        <v-btn  @click="fullscreen" icon="mdi-fullscreen" style="position: fixed;top: 15px;right: 25px;" color="white" variant="text" size="large"></v-btn>
    </v-main>
</template>

<script setup lang="ts">
const {conversation} = storeToRefs(useConversationStore())
const {user} = storeToRefs(useUserStore())
const route = useRoute()
const room = route.params.call_id
const {streaming, close, settings, declined, callSocket, hangup, hangupFn, startCalling, decline, stopCalling, accept, fullscreen, redial, isCaller } = useCallEvents()
let video : HTMLVideoElement | null = null
let canvas : HTMLCanvasElement | null = null

// Receive post message from parent
const receiveMessage = (event: MessageEvent) => {
    const message = event.data
    if(message.type == 'conversation'){
        const payload =  JSON.parse(message.payload)
        conversation.value = payload.conversation
        user.value = payload.person
        window.postMessage({type: 'conversation', received: true})
        if(isCaller.value){
            startCalling()
        }else{
            callSocket.emit('call-received', room)
        }
        removeEventListener('message', receiveMessage)
    }
}

onMounted(() => {
    video  = document.getElementById("call-video") as HTMLVideoElement
    canvas = document.getElementById("call-canvas") as HTMLCanvasElement
    canvas.style.width = window.innerWidth + 'px'
    canvas.style.height = window.innerHeight + 'px'
    
    let promise = navigator.mediaDevices.getUserMedia({video: true, audio: true})
    promise.then((signal) => {
        if(video){
            video.srcObject = signal
            video.play()
        }

    }).catch((err) => alert("error:" + err))
    
    window.addEventListener("message", receiveMessage)
})

</script>

<style scoped>

</style>