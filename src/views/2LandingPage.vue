<template>     
    <div v-if="locationError">
        There's been an error finding your location!
    </div>
    <div class="w-full py-4 flex justify-center items-center border-black border-b-[1px]">
        <h2 class="text-3xl">
            {{ displayLocation }}
        </h2>
        <div @click="addCity" v-if="addable && isAuthenticated"  class="absolute ms-[91.5%] flex">
            <div class="me-2"><i class="fa-solid fa-plus text-md"></i></div>
            <p class="text-md">Add City</p>
        </div>
        <div @click="deleteCity" v-if="deletable && isAuthenticated"  class="absolute ms-[89%] flex">
            <div class="me-2"><i class="fa-solid fa-trash text-md"></i></div>
            <p class="text-md">Remove City</p>
        </div>
        <div  v-if="!isAuthenticated"  class="absolute ms-[84%] flex">
            <p class="text-md">Login to add city to favorites!</p>
        </div>
    </div>
    <div class="flex justify-around">
        <div class="w-3/5 pb-5 px-5 my-5 flex flex-col items-center">
            <h2 class="mb-5 text-3xl">Local News Results:</h2>
            <Suspense>
                <LPNewsResults :city="locationDataRef.city" :state="locationDataRef.region" />
                <template #fallback>
                    <progress></progress>
                </template>
            </Suspense>
        </div>
        <div class="sticky my-5 top-5 flex flex-col items-center w-[40%] h-[100vh]">
            
            <Suspense>
                <WeatherApp :lat="locationDataRef.latitude" :lon="locationDataRef.longitude" />
                <template #fallback>
                    <div>Loading...</div>
                </template>
            </Suspense>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import WeatherApp from '../components/WeatherApp.vue'
    import LPNewsResults from '../components/LPNewsResults.vue';
    import { useAuth0 } from '@auth0/auth0-vue'

    const isAuthenticated = useAuth0().isAuthenticated

    {/* variables for function that retrieves news data and ip info */}

    const displayLocation = ref(null)
    const locationDataRef = ref(null)
    const locationError = ref(false)

    {/* function that retrieves ip to obtain location */}

    const apiCall = async() => {
        try {
            const locationResponse = await fetch(`https://get.geojs.io/v1/ip/geo.json`) 
            const locationData = await locationResponse.json();

            locationDataRef.value = locationData
            displayLocation.value = locationData.city + ", " + locationData.region

            return locationData
        } catch {
            locationError.value = true
        }    
    }
    const localNewStories = await apiCall()

    {/* variables for function that favorites cities */}

    const myCities = ref([])
    const location = {
            state: localNewStories.region,
            city: localNewStories.city,
            coords: {
                lat:localNewStories.latitude,
                lon: localNewStories.longitude
            }
        }
    const addable = ref(true)
    const deletable = ref(false)

    {/* statement to check if views city is already favorited */}

    if(localStorage.getItem("myCities")){
        myCities.value = JSON.parse(localStorage.getItem("myCities"))
        for(let i = 0; i < myCities.value.length; i++){
            if(location.coords.lat === myCities.value[i].coords.lat && location.coords.lon === myCities.value[i].coords.lon){
                addable.value = false
                deletable.value = true
            }
        }
    }

    {/* functions to add and remove cities from favorited list */}

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

