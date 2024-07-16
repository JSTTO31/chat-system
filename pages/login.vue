<template>
    <v-main class="d-flex align-center justify-center bg-primary">
        <v-form @submit.prevent="submit">
            <v-card width="550" class="pa-5 rounded-lg">
                <div class="pa-5 d-flex">
                    <v-avatar size="95" class="mx-auto">
                        <v-img src="/logo.png"></v-img>
                    </v-avatar>
                </div>
                <v-card-text>
                    <label for="username">Username</label>
                    <v-text-field id="username" variant="outlined" single-line :error-messages="$v.email.$errors[0]?.$message.toString() || ''" v-model="$v.email.$model" label="Email address"></v-text-field>
                    <label for="password">Password</label>
                    <v-text-field id="password" variant="outlined" single-line type="password" :error-messages="$v.password.$errors[0]?.$message.toString() || ''" v-model="$v.password.$model" label="Password"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn block type="submit" color="primary" class="text-capitalize" variant="elevated">Login</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-main>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
useHead({
    title: 'SwiftChat | Login'
})
definePageMeta({
    middleware: ['guest'],
})
const router = useRouter()

const $user = useUserStore()
const info = reactive({
    email: 'joshuasotto@example.example',
    password: 'joshuasotto',
})
const $externalResults = ref({})
const rules = {
    email: {required},
    password: {required},
}

const $v = useVuelidate(rules, info, {$externalResults})

const submit = async () => {
    if(!await $v.value.$validate()) return
    //@ts-ignore
    const {error} = await $user.login(info)
    console.log(error.value);
    
    if(error.value){
        for(const [key, value] of Object.entries(error.value.data.errors)){
            //@ts-ignore
            $externalResults.value[key] = value.message
        }
    }else{
        location.reload()
    }
}

</script>

<style scoped>

</style>