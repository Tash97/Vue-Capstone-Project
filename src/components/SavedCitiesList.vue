<template>
    <div class="flex w-full justify-center py-10">
        <div class="flex flex-col items-center text-2xl font-semibold gap-y-7 h-full w-[40%]">
            <h2>Saved Cities</h2>
            <div v-if="noResults">No cities saved yet!</div>
            <div v-for="city in myCities" @click="townPage(city)" v-bind:key="city.name" class="bg-slate-300 rounded-xl shadow-xl h-[15vh] w-full flex justify-between hover:cursor-pointer" >
                <div class=" ms-5 flex items-center">
                    <h2>{{ city.city }}, {{ city.state }}</h2>
                </div>
                <div class=" flex flex-col justify-around items-center w-[20%]">
                    <div class=" w-[80%] h-[50%] overflow-hidden flex items-center">
                        <img class="" :src="`https://openweathermap.org/img/wn/${city.weather.current.weather[0].icon}@2x.png`" />
                    </div>
                    <h2>{{ Math.round(city.weather.current.temp) }}&deg;</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import axios from 'axios'
    import { useRouter } from 'vue-router';
    
    const router = useRouter()

    {/* function to go to selected towns news page */}

    const townPage = (city) => {
        router.push({
            name: 'townsearch',
            params: {
            },
            query: {
                city: city.city, 
                state: city.state,
                lat: city.coords.lat,
                lon: city.coords.lon
            }
        })    
    }

    {/* function to retrieve city weather data for saved cities */}

    const myCities = ref([])
    const noResults = ref(false)

    const getCities = async() => {
        if(localStorage.getItem("myCities")) {
            myCities.value = JSON.parse(localStorage.getItem("myCities"))
        }
        if(myCities.value.length){
            const requests = []
            myCities.value.forEach((city) => {
                requests.push(
                    axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${ city.coords.lat }&lon=${ city.coords.lon }&appid=657363553425d46400ca20a477dfa578&units=imperial`)
                )
            })
            const cityData = await Promise.all(requests)
            cityData.forEach((value, idx) => {
                myCities.value[idx].weather = value.data
            })

        } else{
            noResults.value = true
        }
    }
    await getCities();



</script>

