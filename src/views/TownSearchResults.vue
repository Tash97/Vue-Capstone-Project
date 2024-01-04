<template>
    <div class="flex w-full justify-center py-10">
        <div class="flex flex-col items-center text-2xl font-semibold gap-y-7 h-full w-[60%]">
            <h2>Search Results for {{ route.query.query }}</h2>
            <Suspense>
                <TownsSearchResults/>
                <template #fallback>Loading..</template>
            </Suspense>
        </div>
    </div>
</template>

<script setup>
    import TownsSearchResults from '../components/TownsSearchResults.vue';

    import { useRoute } from 'vue-router'

    const route = useRoute()
    
</script>