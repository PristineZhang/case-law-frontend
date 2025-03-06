<template>
    <div class="header">
        <div class="header-block home-block" @click="toPath('/')">Home</div>
        <div class="header-block rank-block" @click="toPath('/search')">Rank Retrival</div>
        <div class="header-block ai-block" @click="toPath('/chatbot')">AI Search</div>
        <!-- <div @click="toPath('/about')">About</div> -->
   </div>
 </template>
 
 <script>
 
 export default {
   name: '',
   components: {
    
   },
   methods:{
    toPath(url){
      this.$router.push({path:url})
    }
   }
 }
 </script>
 
 <style scoped>
    .header{
        width: 80%;
        margin: 0 auto;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
  
    .header-block{
        cursor: pointer;
        flex: 1;
        text-align: center;
        padding: 10px;
        margin: 0 60px;
        border-radius: 5px;
    
    }

    .home-block{
        background-color: #fff;

    }

    .home-block:hover{
        background-color: #f0f0f0;
    }

    .rank-block{
        background-color: #fff;
    }

    .rank-block:hover{
        background-color: #f0f0f0;
    }

    .ai-block{
        background-color: #fff;
    }

    .ai-block:hover{
        background-color: #f0f0f0;
    }
 </style>
 