<template>
    <Suspense>
            <LandingPage/>
            <template #fallback>Loading..</template>
    </Suspense>
</template>

<script setup>
import LandingPage from './2LandingPage.vue';

</script>

