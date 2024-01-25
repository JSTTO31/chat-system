<template>
    <v-main class="d-flex align-center justify-center bg-primary">
        <v-form @submit.prevent="submit">
            <v-card width="550" class="pa-5 rounded-lg">
                <v-card-title>Register</v-card-title>
                <v-card-text>
                    <v-text-field :error-messages="$v.name.$errors[0]?.$message.toString() || ''" v-model="$v.name.$model" label="Name"></v-text-field>
                    <v-text-field :error-messages="$v.email.$errors[0]?.$message.toString() || ''" v-model="$v.email.$model" label="Email address"></v-text-field>
                    <v-text-field type="password" :error-messages="$v.password.$errors[0]?.$message.toString() || ''" v-model="$v.password.$model" label="Password"></v-text-field>
                    <v-text-field type="password" :error-messages="$v.confirmation_password.$errors[0]?.$message.toString() || ''" v-model="$v.confirmation_password.$model" label="Password Confirmation"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn block type="submit" color="success" class="text-capitalize" variant="elevated">Register</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-main>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
useHead({
    title: 'SwiftChat | Register'
})
definePageMeta({
    middleware: ['guest'],
})

const $user = useUserStore()
const info = reactive({
    name: 'Joshua Sotto',
    email: 'joshuasotto@example.example',
    password: 'joshuasotto',
    confirmation_password: 'joshuasotto'
})
const $externalResults = ref({})
const rules = {
    name: {required},
    email: {required, email},
    password: {required, min: minLength(8)},
    confirmation_password: {required, same: sameAs(computed(() => info.password))}
}

const $v = useVuelidate(rules, info, {$externalResults})

const submit = async () => {
    if(!await $v.value.$validate()) return
    const  {error,} = await $user.register(info)
    if(error.value){
        for(const [key, value] of Object.entries(error.value.data.errors)){
            //@ts-ignore
            $externalResults.value[key] = value.message
        }
    }else{
        useRouter().push('/')
    }
}

</script>

<style scoped>

</style>