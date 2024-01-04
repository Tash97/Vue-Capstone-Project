<template>
    <div  class="flex w-full h-[30vh] rounded-lg bg-white shadow-2xl" v-for="result in results" @click="searchTownPage(result)">
        <div class=" w-2/5 h-full">
            <img class="rounded-s-lg w-full h-full object-cover" :src="result.pics" /> 
        </div>
        <div class="flex flex-col justify-around ps-6 py-2">
            <h2 class="text-3xl">{{ result.text }}</h2>
            <p>County: {{ result.context[0].text }}</p>
            <p>State: {{ result.context[1].text }}</p>
            <p>Latitude: {{ result.geometry.coordinates[1] }}</p>
            <p>Longitude: {{ result.geometry.coordinates[0] }}</p>
        </div>
    </div>
</template>

<script setup>
    import { useRoute, useRouter } from 'vue-router'

    {/* function to retrieve town search results from search by town */}

    const route = useRoute()
    const resultsGrab = async() => {
        const SearchResponse = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${ route.query.query }.json?access_token=pk.eyJ1IjoidG5zMTIzOTg3IiwiYSI6ImNscWxtZm0zcTI1M3Iya3BxeDQxazRvMHcifQ.rtwUeEDf4epFC-44QYi9RQ&types=place&country=us`)
        const SearchData = await SearchResponse.json()
        for(let i = 0; i < SearchData.features.length; i++){
            SearchData.features[i].pics = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/[${SearchData.features[i].bbox}]/400x250?access_token=pk.eyJ1IjoidG5zMTIzOTg3IiwiYSI6ImNscWxtZm0zcTI1M3Iya3BxeDQxazRvMHcifQ.rtwUeEDf4epFC-44QYi9RQ`        
        }
        return SearchData.features
    }
    const results = await resultsGrab()

    {/* function to go to town selected from town search results */}

    const router = useRouter()

    const searchTownPage = (townName) => {
        let city = townName.place_name.split(",")[0]
        let state = townName.place_name.split(",")[1]
        const location = city + " " + state
        router.push({
            name: 'townsearch',
            params: {
            },
            query: {
                locationName: location,
                city: city, 
                state: state,
                lat: townName.geometry.coordinates[1],
                lon: townName.geometry.coordinates[0]
            }
        })    
    }
</script>

