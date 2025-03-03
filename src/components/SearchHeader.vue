<template>
    <div class="header">
        <div @click="toPath('/')">Logo</div>
        <div @click="toPath('/search')">Rank Retrival</div>
        <div @click="toPath('/chatbot')">AI Search</div>
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
        background-color: #fff;
    }
    .header div{
      cursor: pointer;
    }
 </style>
 