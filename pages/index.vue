<template>
    <v-navigation-drawer width="65" color="primary" class="pa-0 d-flex flex-column">
        <v-list nav class="d-flex flex-column h-100">
            <v-menu>
                <template #activator="{props}">
                    <v-badge location="top left" dot color="success">
                        <v-avatar size="50" class="mt-auto" v-bind="props">
                            <v-img :src="'https://source.unsplash.com/random/120x120/?person'"></v-img>
                        </v-avatar>
                    </v-badge>
                </template>
                <v-card width="250">
                    <v-list>
                        <v-list-item prepend-icon="mdi-logout" @click="logout">Logout</v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
            <v-spacer></v-spacer>
            <v-btn variant="text" class="my-2" icon="mdi-home" @click=""></v-btn>
            <v-btn variant="text" class="my-2" icon="mdi-message" @click=""></v-btn>
            <v-btn variant="text" class="my-2" icon="mdi-account-multiple" @click=""></v-btn>
            <v-btn variant="text" class="my-2" icon="mdi-inbox" @click=""></v-btn>
            <v-spacer></v-spacer>
        </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer width="400" color="grey-lighten-5">
            <v-layout class="h-100 w-100" style="overflow: visible">
                <v-app-bar flat class="px-2">
                        <v-text-field label="Search" prepend-inner-icon="mdi-magnify" density="compact" variant="solo-filled" flat hide-details single-line></v-text-field>
                </v-app-bar>
                <v-main style="overflow-y: auto;" id="main">
                    <div v-if="users.length > 0" class="pa-2">
                        <v-card @click="" class="mb-2 pa-3 rounded-0" elevation="25" v-for="user in users" :key="user._id">
                            <div class="d-flex">
                                <v-avatar size="45">
                                    <v-img :src="'https://source.unsplash.com/random/250x250/?person&' + user._id"></v-img>
                                </v-avatar>
                                <div class="pl-5">
                                    <h4 class="text-black">{{ user.name }}</h4>
                                    <h6 class="font-weight-regular">
                                        <v-icon color="success" size="10" class="mr-1">mdi-circle</v-icon>Online</h6>
                                </div>
                            </div>
                            <span style="position: absolute;top: 15px; right: 15px;" class=" text-black text-caption">{{ Math.floor(Math.random() * 10) }}m</span>
                        </v-card>
                    </div>
                </v-main>
            </v-layout>
    </v-navigation-drawer>
    <v-navigation-drawer width="350" class=" pt-10 d-flex flex-column" location="right">
        <div class="d-flex justify-center">
            <v-avatar size="185">
                <v-img :src="'https://source.unsplash.com/random/250x250/?person&' + user?._id"></v-img>
            </v-avatar>
        </div>
        <div class="my-3">
            <h2 class="text-center">{{ user?.name}}</h2>
            <h5 class="text-center font-weight-regular text-grey-darken-1">{{ user?.email}}</h5>
        </div>
        <v-list>
            <v-list-item append-icon="mdi-magnify" @click="">Search messages</v-list-item>
            <v-list-item append-icon="mdi-chevron-down" @click="">Media</v-list-item>
            <v-list-item append-icon="mdi-chevron-down" @click="">Files</v-list-item>
        </v-list>
        <v-spacer></v-spacer>
        <div class="pa-2">
            <v-btn variant="tonal" color="error" block class="text-capitalize" prepend-icon="mdi-cancel">Block this account</v-btn>
        </div>
    </v-navigation-drawer>
    <v-app-bar class="border-b px-5" flat>
        <v-avatar size="45" class="">
            <v-img :src="'https://source.unsplash.com/random/250x250/?person&' + user?._id"></v-img>
        </v-avatar>
        <div class="d-flex flex-column pl-5">
            <h3>{{ user?.name }}</h3>
            <h6 class="font-weight-regular text-grey-darken-1">{{ user?.email }}</h6>
        </div>
        <v-spacer></v-spacer>
        <v-btn class="ml-2" variant="plain" icon="mdi-phone"></v-btn>
        <v-btn class="ml-2" variant="plain" icon="mdi-video"></v-btn>
        <v-btn class="ml-2" variant="plain" icon="mdi-dots-horizontal-circle"></v-btn>
    </v-app-bar>
    <v-main class="d-flex flex-column ">
        <v-spacer></v-spacer>
        <v-divider></v-divider>
        <div class="pa-2 d-flex align-center">
            <v-btn icon="mdi-image" color="primary" class="ml-2" variant="text"></v-btn>
            <v-btn icon="mdi-file" color="primary" class="ml-2" variant="text"></v-btn>
            <v-btn icon="mdi-emoticon-outline" color="primary" class="ml-2" variant="text"></v-btn>
            <v-text-field class="mx-4" single-line hide-details variant="solo-filled" flat label="Enter your message" rounded="lg" ></v-text-field>
            <v-btn icon="mdi-thumb-up" color="primary" variant="text"></v-btn>
        </div>
    </v-main>
</template>

<script setup lang="ts">
useHead({
    title: 'SwiftChat | Home'
})
definePageMeta({
    middleware: ['auth']
})
const $user = useUserStore()
const {users, user} = storeToRefs(useUserStore())
const router = useRouter()
const logout = () => {
    $user.logout()
    router.push({name: 'login'})
}

$user.fetchUsers()
</script>

<style scoped>
#main::-webkit-scrollbar{
    width: 5px;
}
#main::-webkit-scrollbar-thumb{
    background-color: rgb(225, 225, 225);
    border-radius: 25px;
}
</style>