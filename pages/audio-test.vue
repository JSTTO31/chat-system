<template>
    <div id="audio-container">
        <audio id="audio" controls></audio>
    </div>
</template>

<script setup lang="ts">


onMounted(() => {
    const promise = navigator.mediaDevices.getUserMedia({audio: true})
    promise.then((stream) => {
        const mediaRecorder = new MediaRecorder(stream)
        const chunks : BlobPart[] = []
        
        mediaRecorder.ondataavailable = (event) => {
            if(event.data.size > 0){
                console.log(event.data);
                chunks.push(event.data)
            }
        }

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, {type: 'video/webm'})
            const container = document.getElementById('audio-container')
            const audio = document.createElement('audio')
            audio.src = URL.createObjectURL(blob)
            audio.setAttribute('controls', 'true')
            container?.appendChild(audio)
        }

        mediaRecorder.start()

        setTimeout(() => {
            mediaRecorder.stop()
        }, 5000);

    })
})
</script>

<style scoped>

</style>