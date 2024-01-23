<template>
    <v-navigation-drawer rail color="primary" class="pa-0 d-flex flex-column">
        <v-list nav class="d-flex flex-column h-100">
            <v-icon size="30" class="mx-1 mb-5 mt-2">mdi-chat</v-icon>
            <v-list-item prepend-icon="mdi-message" @click=""></v-list-item>
            <v-list-item prepend-icon="mdi-account-multiple" @click=""></v-list-item>
            <v-avatar size="40" class="mt-auto border">
                <v-img :src="'https://source.unsplash.com/random/120x120/?person'"></v-img>
            </v-avatar>
        </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer width="350" class="pa-2">
        <div class="mb-5">
            <v-text-field label="Search" prepend-inner-icon="mdi-magnify" density="compact" variant="solo-filled" flat hide-details single-line></v-text-field>
        </div>
        <v-card @click="" class="mb-2 pa-3" variant="tonal" color="primary" flat v-for="user in users" :key="user.id">
            <div class="d-flex">
                <v-avatar size="45" class="rounded-lg">
                    <v-img :src="'https://source.unsplash.com/random/520x520/?person&' + user.id"></v-img>
                </v-avatar>
                <div class="pl-5">
                    <h4 class="text-black">{{ user.firstName }} {{ user.lastName }}</h4>
                    <h6>{{ user.messages[0] }}</h6>
                </div>
            </div>
            <span style="position: absolute;top: 15px; right: 15px;" class=" text-black text-caption">{{ Math.floor(Math.random() * 10) }}m</span>
        </v-card>
    </v-navigation-drawer>
    <v-navigation-drawer width="350" class=" pt-10 d-flex flex-column" location="right">
        <div class="d-flex justify-center">
            <v-avatar size="185">
                <v-img :src="'https://source.unsplash.com/random/520x520/?person&' + user.id"></v-img>
            </v-avatar>
        </div>
        <div class="my-3">
            <h2 class="text-center">{{ user.firstName }} {{ user.lastName }}</h2>
            <h5 class="text-center font-weight-regular text-grey-darken-1">{{ user.email}}</h5>
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
            <v-img :src="'https://source.unsplash.com/random/120x120/?person&' + user.id"></v-img>
        </v-avatar>
        <div class="d-flex flex-column pl-5">
            <h3>{{ user.firstName }} {{ user.lastName }}</h3>
            <h6 class="font-weight-regular text-grey-darken-1">{{ user.email }}</h6>
        </div>
        <v-spacer></v-spacer>
        <v-btn class="ml-2" variant="plain" icon="mdi-phone"></v-btn>
        <v-btn class="ml-2" variant="plain" icon="mdi-video"></v-btn>
        <v-btn class="ml-2" variant="plain" icon="mdi-dots-horizontal-circle"></v-btn>
    </v-app-bar>
    <v-main class="d-flex flex-column ">
        <!-- <div class="h-100 bg-red">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, consequuntur? Eius corporis explicabo dicta, laboriosam ipsa architecto! Cupiditate aliquam necessitatibus non autem quae velit ipsum eligendi, modi eos odio esse.
        </div> -->
        <v-spacer></v-spacer>
        <v-divivder class="border"></v-divivder>
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
import { computed } from 'vue';
const users = [
  {
    id: 1,
    username: 'john_doe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    age: 30,
    messages: [
      "Hello, how are you?",
      "I'm working on a new project.",
      "Do you want to grab coffee sometime?",
    ],
  },
  {
    id: 2,
    username: "jane_smith",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    age: 25,
    messages: [
      "Meeting at 2 PM tomorrow.",
      "Finished the latest feature!",
      "What's your opinion on the new design?",
    ],
  },
  {
    id: 3,
    username: "bob_jackson",
    firstName: "Bob",
    lastName: "Jackson",
    email: "bob.jackson@example.com",
    age: 35,
    messages: [
      "Can you review my pull request?",
      "Planning a team outing next month.",
      "I need help with a bug in the code.",
    ],
  },
  // Add more users as needed
];
const user = computed(() => users[0])

</script>

<style scoped>

</style>