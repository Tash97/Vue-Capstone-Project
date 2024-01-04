<template>
    <Suspense>
        <SavedCitiesList />
        <template #fallback>
            <div>loading..</div>
        </template>
    </Suspense>
</template>

<script setup>
    import SavedCitiesList from '../components/SavedCitiesList.vue'
</script>

