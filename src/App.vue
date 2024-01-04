<script setup>
  import { v4 as uuidv4 } from 'uuid'
  import { RouterView, useRoute } from 'vue-router';
  import { ref } from 'vue';
  import Navbar from './components/Navbar.vue';

  const route = useRoute()

  const componentKey = ref(0)

  const forceRerender = () => {
    componentKey.value += 1
    return componentKey
  }
</script>

<template>
  <div class="w-full min-h-[100vh] bg-slate-200 font-professional">
    <Navbar />
    <RouterView   v-slot="{ Component, route }">
      <Transition  name="page">
        <component :is="Component" :key="uuidv4()" />
      </Transition>
    </RouterView>
  </div>
</template>


