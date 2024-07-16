import { Socket, io } from "socket.io-client";



export default () => {
    const {user} = storeToRefs(useUserStore())
    const route = useRoute()
    const config = useRuntimeConfig()
    const conversationId = route.query.conversation_id
    const callId = route.params.call_id
    const conversationSocket = io(config.public.backend_url as string).emit('join_room', conversationId) 
    const callSocket : Socket = io(config.public.backend_url as string).emit('join_room', callId) 
    const streaming = ref(false)
    const declined = ref(false)
    const hangup = ref(false)
    const isCaller = ref(route.query.is_caller == 'true')
    const settings = reactive({
        video: true,
        audio: true,
    })
    const timer = computed(() => {
        if(currentTime && timeStarted){
            //@ts-ignore
            let miliseconds : any  =  timeStarted - currentTime
            let minutes : any = (miliseconds / 60).toLocaleString('en-US', {minimumIntegerDigits: 2})
            miliseconds = (miliseconds % 60).toLocaleString('en-US', {minimumIntegerDigits: 2})
            
            return minutes + ':' +  miliseconds
        }

        return '00:00'
    })

    let timeStarted : Date | null = null 
    let currentTime : Date | null = null
    let callingInterval : null | NodeJS.Timeout = null
    let streamingInterval : null | NodeJS.Timeout = null

    callSocket.on("call-streaming", ({imageUrl}) => {
        currentTime = new Date()
        const image : null | HTMLImageElement = document.getElementById('call-image') as HTMLImageElement
        if(image){
            image.src = imageUrl
        }
    })

    callSocket.on('call-hangup', () => {
        hangup.value = true
        stopStreaming()
    })
    
    callSocket.on("call-received", () => {
        stopCalling()
    })
    
    callSocket.on('call-declined', () => {
        declined.value = true
        stopCalling()
    })
    
    callSocket.on('call-start', () => {
        streaming.value = true
        timeStarted = new Date()
        startStreaming()

    })


    const redial = () => {
        declined.value = false
        hangup.value = false
        isCaller.value = true
        callingInterval = setInterval(() => {
            conversationSocket.emit('calling', {person: user.value, room: callId, conversationRoom: conversationId})
        }, 2500)
    }

    const startStreaming = () => {
        const canvas : HTMLCanvasElement | null = document.getElementById('call-canvas') as HTMLCanvasElement
        const video : null | HTMLVideoElement = document.getElementById('call-video') as HTMLVideoElement
        streamingInterval = setInterval(() => {

            if(!settings.video && canvas){
                const context = canvas.getContext('2d')
                if(context){
                    context.filter = 'blur(8px)'
                    const image = new Image
                    image.crossOrigin = 'anonymous'
                    image.src = 'https://source.unsplash.com/random/250x250/?person&' + conversationId
                    image.onload = () => {
                        context.drawImage(image, 0, 0, canvas.width, canvas.height)
                        const imageUrl = canvas.toDataURL()
                        callSocket.emit('call-streaming', ({room: callId, imageUrl}))
                    }
                }
            }else{
                if(video){
                    const context = canvas.getContext('2d')
                    if(context){
                        context.filter = 'blur(0)'
                        context?.drawImage(video, 0, 0, canvas.width, canvas.height)
                        const url = canvas.toDataURL("image/jpg")
                        callSocket.emit('call-streaming', ({room: callId, imageUrl: url}))
                    }
                }
            }


           
        }, 150)
    }

    const stopStreaming = () => {
        if(streaming.value){
            const image : null | HTMLImageElement = document.getElementById('call-image') as HTMLImageElement
           
            if(streamingInterval){
                clearInterval(streamingInterval)
            }

            if(image) {
                image.src = '/blank.jpg'
            }

            streaming.value = false


        }
    }
    
    
    const startCalling = () => {
        declined.value = false
        callingInterval = setInterval(() => {
            console.log('calling');
            
            conversationSocket.emit('calling', {person: user.value, room: callId, conversationRoom: conversationId})
        }, 2500)
    }
    
    const stopCalling = () => {
        if(callingInterval) clearInterval(callingInterval)
        conversationSocket.emit('calling-stop', conversationId)
    }
    
    const decline = () => {
        if(!streaming.value){
            callSocket.emit('call-decline', callId)
        }
    
        window.close()
    }
    
    const fullscreen = () => {
        document.body.requestFullscreen
    }
    
    const close = () => {
        window.close()
    }

    function accept(){
        
        callSocket.emit('call-start', {room: callId, conversationRoom: conversationId})
    }

    function hangupFn(){
        stopCalling()
        callSocket.emit('call-hangup', callId)
        if(streamingInterval){
            clearInterval(streamingInterval)
        }
    }


    window.onbeforeunload = () => {
        if(isCaller.value || streaming.value){
            hangupFn()
        }else{
            decline()
            
        }
    }

    return {close, fullscreen, startCalling, stopCalling, hangupFn, callSocket, conversationId, redial, decline, streaming, declined, accept, isCaller, hangup, settings, startStreaming, timer}
}