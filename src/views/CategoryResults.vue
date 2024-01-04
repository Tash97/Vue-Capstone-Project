<template>
    <div>
        <div class="flex justify-center py-10 w-full">
            <div class="flex flex-col gap-y-5 py-5 items-center justify-around w-9/12 min-h-[20vh]">
                <h2 class="text-3xl">{{ route.query.category }}</h2>
                <Suspense>
                    <CatNewsResults />
                    <template #fallback>
                        <div>Loading...</div>
                    </template>
                </Suspense>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useRoute } from 'vue-router'
    import CatNewsResults from '../components/CatNewsResults.vue';

    const route = useRoute()


    
  
</script>