<template>
    <v-main>
        <video id="video" class="d-none"></video>
        <canvas id="canvas" class="w-100 h-100"></canvas>
    </v-main>
</template>

<script setup lang="ts">
onMounted(() => {
    const video : HTMLVideoElement | null = document.getElementById("video") as HTMLVideoElement
    const canvas : HTMLCanvasElement | null = document.getElementById("canvas") as HTMLCanvasElement
    const context = canvas.getContext("2d")
    canvas.style.width = window.innerWidth + 'px'
    canvas.style.height = window.innerHeight + 'px'
    let promise = navigator.mediaDevices.getUserMedia({video: true})
    promise.then((signal) => {
       video.srcObject = signal
       video.play()

       video.onloadeddata = () => {
        updateCanvas()
       }
        
    }).catch((err) => alert("error:" + err))


    const updateCanvas = () => {
        context?.drawImage(video, 0,0, canvas.width, canvas.height)
        window.requestAnimationFrame(updateCanvas)
    }
})


window.postMessage({
        close: true
    })
</script>

<style scoped>

</style>