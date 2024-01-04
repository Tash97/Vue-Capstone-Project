<template>
    <div class="w-full py-4 flex justify-center border-b-[1px] border-black items-center">
        <h2 class="text-3xl">
            {{ route.query.locationName }}
        </h2>
        <div @click="addCity" v-if="addable"  class="absolute ms-[91.5%] flex">
            <div class="me-2"><i class="fa-solid fa-plus text-md"></i></div>
            <p class="text-md">Add City</p>
        </div>
        <div @click="deleteCity" v-if="deletable"  class="absolute ms-[89%] flex">
            <div class="me-2"><i class="fa-solid fa-trash text-md"></i></div>
            <p class="text-md">Remove City</p>
        </div>
    </div>
    <div class="flex justify-around">
        <div class="w-3/5  px-5 mb-5 flex flex-col items-center">
            <h2 class="mb-5 mt-5 text-3xl">Local News Results:</h2>
            <Suspense>
                <TownNewsResults />
                <template #fallback>Loading..</template>
            </Suspense>
        </div>
        <div class="sticky py-5 top-0 flex flex-col items-center w-[40%] h-[100vh]">
            <Suspense>
                <WeatherApp :lat="route.query.lat" :lon="route.query.lon" />
                <template #fallback>Loading..</template>
            </Suspense>
        </div>
    </div>
</template>

<script setup>
    import WeatherApp from '../components/WeatherApp.vue'
    import TownNewsResults from '../components/TownNewsResults.vue';
    import { useRoute } from 'vue-router'
    import { ref } from 'vue';

    const route = useRoute()

    {/* variables for function that add/removes cities from favorited list */}

    const myCities = ref([])
    const location = {
        state: route.query.state,
        city: route.query.city,
        coords: {
            lat: route.query.lat,
            lon: route.query.lon
        }
    }
    const addable = ref(true)
    const deletable = ref(false)

    {/* statement to check if viewed city is currently favorited */}

    if(localStorage.getItem("myCities")){
        myCities.value = JSON.parse(localStorage.getItem("myCities"))
        for(let i = 0; i < myCities.value.length; i++){
            if(location.coords.lat === myCities.value[i].coords.lat && location.coords.lon === myCities.value[i].coords.lon){
                addable.value = false
                deletable.value = true
            }
        }
    }

    {/* functions to add/remove viewed city from favorited list */}

    const addCity = () => {
        if(localStorage.getItem("myCities")) {
            myCities.value = JSON.parse(localStorage.getItem("myCities"))
        }
        myCities.value.push(location)
        localStorage.setItem(
            'myCities', JSON.stringify(myCities.value)
        )
        deletable.value = true
        addable.value = false
    }

    const deleteCity = () => {
        myCities.value = JSON.parse(localStorage.getItem("myCities"))
        for(let i = 0; i < myCities.value.length; i++){
            if(location.coords.lat === myCities.value[i].coords.lat && location.coords.lon === myCities.value[i].coords.lon){
                myCities.value.splice(i, 1)
                console.log(myCities.value);
            }
        }
        localStorage.setItem(
            'myCities', JSON.stringify(myCities.value)
        )
        addable.value = true
        deletable.value = false
    }
</script>