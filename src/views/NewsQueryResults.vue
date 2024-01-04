<template>
    <div class="flex justify-center py-10 w-full">
        <div class="flex flex-col gap-y-5 py-5 items-center justify-around w-9/12 min-h-[20vh]">
            <h2 class="text-3xl">Search results for {{ route.query.query }}</h2>
            <Suspense>
                <NewsSearchResults/>

                <template #fallback>
                    <div>Loading...</div>
                </template>
            </Suspense>
        </div>
    </div>
</template>

<script setup>
    import { useRoute } from 'vue-router'

    import NewsSearchResults from '../components/NewsSearchResults.vue';

    const route = useRoute()
   
</script>