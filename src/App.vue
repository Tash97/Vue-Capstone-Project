<script setup>
  import { v4 as uuidv4 } from 'uuid'
  import { RouterView } from 'vue-router';
  import Navbar from './components/NavbarTopPage.vue';



 
</script>

<template>
  <div class="w-full min-h-[100vh] bg-slate-200 font-professional">
    <Navbar />
    <RouterView   v-slot="{ Component }">
      <Transition  name="page">
        <component :is="Component" :key="uuidv4()" />
      </Transition>
    </RouterView>
  </div>
</template>


