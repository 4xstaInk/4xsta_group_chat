<template>
  <!-- <div class="view-login" v-if="state.username == '' || state.username == null">
      <form class="login-form" @submit.prevent="Login">
        <div class="form-inner">
        <h1>Login To 4xstaGroupChat</h1>
        <label for="username">Username</label>
        <input
         v-model="inputUsername" 
         type="text" 
         placeholder="Please enter your username" />
        <input type="submit" value="Login">
        </div>
      </form>
  </div> -->

  <div 
  v-if="state.username == '' || state.username == null"
  class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
  <div 

  class="mx-auto"
  >
    <img
  src="../public/logo.png"
  class="h-40 w-40 mx-auto"
   />
  </div>
  <div 
  class="mt-2 p-4 mx-auto"
  >
   <h1
      id="label"
      class="text-3xl text-sky-500 font-bold"
      >4xsta GroupChat</h1>
  </div>
  
  <div class="relative py-3 mx-auto w-11/12 max-w-xl sm:mx-auto">
    <div class="relative p-8 bg-white shadow-sm sm:rounded-xl">
      <form 
      @submit.prevent="Login"
      class="w-full">
        <div class="mb-5 relative">
          <input 
           v-model="inputUsername" 
         type="text" 
         placeholder="Please enter your username" 
           id="username" class="peer pt-8 border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16 placeholder-transparent" autocomplete="off" />
          <label for="username" class="peer-placeholder-shown:opacity-100   opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out">Username</label>
        </div>
        <button 
        type="submit"
         class="w-full bg-sky-500 text-white p-3 rounded-md">Login</button>
      </form>
    </div>
  </div>
</div>

  <!-- <div class="view chat" v-else>
    <header>
      <button class="logout" @click="Logout"
      >Logout</button>
      <h1>Welcome, {{state.username}}</h1>
    </header>
    <section class="chat-box">
    <div 
    v-for="message in state.messages"
    :key="message.key"
    :class="(message.username == state.username ? 'current-user-messages' : 'message')"
    > 
    <div class="message-inner">
      <div class="username">
        {{message.username}}
      </div>
      <div class="content">
        {{message.content}}
      </div>
    </div>
    </div>
    </section>
    <footer>
      <form @submit.prevent="SendMessage">
        <input v-model="inputMessage"
        type="text" placeholder="Write a message...">
        <input type="submit" value="send" />
      </form>
    </footer>
  </div> -->

<div class="view chat" v-else>
<div class="flex flex-row h-screen bg-gray-100">
  <div class="flex flex-row flex-auto bg-white rounded-tl-xl border-l shadow-xl">
    <div class="flex flex-col mx-auto w-11/12">
      <div class="flex-none h-20 flex flex-row justify-between items-center p-5">
        <div class="flex flex-col space-y-1">
            <button class="flex text-sm mt-7 mr-auto" @click="Logout"
      ><mdi:logout /> Leave</button>
          <strong class="flex text-3xl text-sky-500"><mdi:account /> <span class="ml-2">{{state.username}}</span></strong>

          <h1 
          v-if="state.messages == ''"
          class="flex text-red-500 text-1xl"><mdi:delete-empty /> No messages</h1>
          <br>
        </div>
      </div>

      <div
        v-if="state.messages !=''"
        class="flex-auto overflow-y-auto p-5 space-y-4"
      >
        <div 
        v-for="message in state.messages"
    :key="message.key"
        :class="(message.username == state.username ? 'flex flex-row space-x-2 flex-row-reverse space-x-reverse w-100' : 'flex flex-row space-x-2')"
        >
          <div class="flex flex-col">
              <div :class="(message.username == state.username ? 'flex text-sm text-sky-600 ml-auto' : 'flex text-sm text-gray-600 mr-auto')"
              ><mdi:account /> {{message.username}}</div>
            <div 
            :class="(message.username == state.username ? 'bg-sky-100  rounded-tl-3xl rounded-bl-3xl rounded-br-3xl p-5 border p-5 w-50' : 'bg-white rounded-tr-3xl rounded-br-3xl rounded-bl-3xl p-5 border')"
            >
              {{message.content}}
            </div>
            <div class=" flex text-sm text-gray-600 mt-2"><mdi:clock-outline /><span class="ml-2">....</span></div>
          </div>
        </div>
      </div>

      <div class="flex-none h-40 p-4 pt-5" id="textarea-container">
        <p 
        v-if="typing_data != ''"
        class="text-green-500">{{state.username}} is typing...</p>
          <form  @submit.prevent="SendMessage">
        <textarea 
        @keyup="typingMethod"
        @mouseleave="clearTypingData"
        @mouseenter="typing_data = 'typing'"
        v-model="inputMessage"
        id="textarea"
        placeholder="Write a message..."
        class="w-full h-full outline-none focus:border-sky-600 hover:border-sky-600 rounded-3xl p-4 shadow-lg"></textarea>
        <button 
        @click="clearTypingData"
        id="button"
        type="submit"
        :class="(inputMessage == '' ? 'hidden':'text-green-600')" class="text-3xl float-right"><mdi:send /></button>
        </form>
      </div>
    </div>

  </div>
</div>
</div>



</template>

<script>
import {reactive, onMounted, ref} from 'vue';
import db from "./db.js";


 export default{
   setup(){
     const inputUsername = ref("");
     const inputMessage = ref("");

     const state = reactive({
       username:"",
       messages:[]
     });

     const Login =()=>{
       if (inputUsername.value != "" || inputUsername.value != null) {
         state.username = inputUsername.value;
         inputUsername.value = "";
       }
     }

     const Logout =()=>{
       state.username = "";
     }

     const SendMessage =()=>{
       const messagesRef = db.database().ref("messages");

       if (inputMessage.value === "" || inputMessage.value === null) {
         return;
       }

       const message = {
         username: state.username,
         content: inputMessage.value
       }

       messagesRef.push(message);
       inputMessage.value = "";
     } 
     
     onMounted(() => {
       const messagesRef = db.database().ref("messages");

       messagesRef.on('value', snapshot => {
         const data = snapshot.val();
         let messages = [];

         Object.keys(data).forEach(key => {
           messages.push({
             id: key,
             username: data[key].username,
             content: data[key].content
           })
         })
         state.messages = messages;
       })

     })

     return{
       inputUsername,
       inputMessage,
       SendMessage,
       Login,
       Logout,
       state
     }
   },
   data() {
     return {
       typing_data:''
     }
   },
   methods: {
     typingMethod() {
      this.typing_data = this.inputMessage
     },
     clearTypingData(){
       this.typing_data = ''
     }
   },
 }
</script>

<style>
#logo{
  margin-left: auto;
  margin-right:auto;
}
#label{

}
#textarea-container{
    position:relative
}
#textarea{
    width:100%;
    height: 100%;
    box-sizing: border-box;
}

</style>
