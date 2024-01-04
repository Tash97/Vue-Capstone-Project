<template>
    <div class="flex h-full ">
        <div class=" flex me-4 h-full items-center">
            <div class=" flex flex-col justify-center text-xs w-[60%] h-[49%]">
                <p id="toggleTextStory" class=" text-[11px] font-semibold">
                    Search news by article.
                </p>
                <p id="toggleTextTown" class="opacity-50 text-[11px]">
                    Search news by town.
                </p>
            </div>
            <div class=" w-[42%]  h-[49%]">
                <svg width='100%' height='100%' viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="1%" style="stop-color:rgba(0,0,0,.7);stop-opacity:1" />
                            <stop offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <path d="M1,50 Q1,1 25,1 L75,1 Q99,1 99,50 Q99,99 75,99 L25,99 Q1,99 1,50 " />
                    <path stroke="rgb(226,232,240)" stroke-width=".85px" @click="slideToggle" fill="rgb(226,232,240)" d="M5,50 Q5,11 25,11 L75,11 Q95,11 95,50 Q95,90 75,90 L25,90 Q5,90 5,50 " />
                    <path stroke="rgba(0,0,0,0)" stroke-width=".85px" @click="slideToggle" fill="rgba(0,0,0,0)" d="M5,50 Q5,11 25,11 L75,11 Q95,11 95,50 Q95,90 75,90 L25,90 Q5,90 5,50 " />
                    <path @click="slideToggle" id="toggleButton" fill="url(#grad1)"  d="M5.5,50 Q5.5,12 25,12 L42,12 Q61,12 61,50 Q61,87 42,89 L25,89 Q5.5,88 5.5,50 " />
                </svg>
            </div>
        </div>
        <div id="storySearchRef" class=" h-full flex items-center">
            <div>
                <input v-model="search" @keypress.enter="searchPage()" @input="grabResults" @click="(e) => {e.stopPropagation()}"  id="searchByArticle" class="rounded px-2 py-1 text-black text-lg w-[17.25vw]" placeholder="Search for News Stories" type="text">
                <div v-if="searchResults" class="absolute border-black overflow-hidden border-[1px] bg-slate-100 rounded-sm left-[8.82%] flex flex-col w-[50%] z-40">
                    <div v-if="!searchResults.length" class="text-black h-full w-full py-4 ps-4 text-lg">
                        <h2>No results found!</h2>
                    </div>
                    <div class="flex w-full h-[15vh] border-b-[1px] border-black " v-for="result in searchResults" >
                        <a :href="result.url" class="flex w-full h-full">
                            <div class=" w-1/3 h-full">
                                <img class=" w-full h-full object-cover" :src="result.urlToImage" alt="hi">
                            </div>
                            <div class=" w-2/3  flex justify-start text-xl leading-tight px-3 py-2 text-black">
                                <h2 class="">{{ result.title }}</h2>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <button @click="searchPage" class="rounded px-2 py-[2.12%] bg-gradient-to-b from-blue-600 to-blue-900 text-white mx-3">Search</button>
        </div>
        <div id="townSearchRef" class="hidden h-full items-center">
            <div>
                <input v-model="searchTown" @input="grabTownResults" @keypress.enter="searchTowns" @click="(e) => {e.stopPropagation()}" id="searchByTown" class="rounded px-2 py-1 text-black text-lg w-[17.25vw] " placeholder="Search for News by City" type="text">
                <div v-if="searchResults2" class="text-black absolute border-black border-[1px] rounded-sm left-[41.25%] bg-white flex flex-col w-[27.1vw]  z-40 ">
                    <div v-if="!searchResults2.length" class="py-1 px-1 text-xl">
                        <h2>No results found!</h2>
                    </div>
                    <div class="flex border-black border-b-[1px] py-1 px-1" v-for="result in searchResults2" @click="searchTownPage(result)" >
                        <p class="text-lg">{{ result.place_name }}</p>
                    </div>
                </div>
            </div>
            <button @click="searchTowns" class="rounded px-2 py-[2.12%] bg-gradient-to-b from-blue-600 to-blue-900 text-white mx-3">Search</button>
        </div>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router'
    import { ref } from 'vue'

    {/* variables for story search suggestions function */}

    const queryTimeout = ref(null)
    const searchResults = ref(null)
    const search = ref(null)

    {/* function to retrieve suggestions for searching by story */}

    const grabResults = () => {
        clearTimeout(queryTimeout.value)

        queryTimeout.value = setTimeout(async () => {
            if(search.value !== "") {
                const newsResponse = await fetch(`https://newsapi.org/v2/everything?language=en&q=${search.value}&pageSize=15&apiKey=4522f236338f41cca110abb258c467d8`) 
                const newsData = await newsResponse.json();
                const array = []
                for(let i = 0; i < newsData.articles.length; i++){
                    if(newsData.articles[i].urlToImage !== null && !newsData.articles[i].urlToImage.includes('.mp4') && !newsData.articles[i].urlToImage.includes('youtube') && !newsData.articles[i].urlToImage.includes('.mp3') && !newsData.articles[i].urlToImage.includes('audio') && !newsData.articles[i].urlToImage.includes('.js') && !newsData.articles[i].title.includes('[')){        
                        array.push(newsData.articles[i])
                    }
                }
                for(let t = 0; t < array.length; t++){
                    for(let j = t + 1; j < array.length; j++){
                        if(array[t].title === array[j].title){
                            array.splice(j, 1)
                            j = j - 1
                        }
                    }
                }
                if(array.length > 5){
                    for(let t = array.length; t > 5; t--){
                        array.pop()
                    }
                }
                searchResults.value = array
            } else{
                searchResults.value = null
            }
        }, 300)
    }

    {/* variables for town search suggestions function */}

    const queryTimeout2 = ref(null)
    const searchResults2 = ref(null)
    const searchTown = ref(null)

    {/* function to retrieve suggestions for searching by town */}

    const grabTownResults = () => {
        clearTimeout(queryTimeout2.value)
        
        queryTimeout2.value = setTimeout(async () => {
            if(searchTown.value !== "") {
                searchResults2.value = []
                const newsSearchResponse = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTown.value}.json?access_token=pk.eyJ1IjoidG5zMTIzOTg3IiwiYSI6ImNscWxtZm0zcTI1M3Iya3BxeDQxazRvMHcifQ.rtwUeEDf4epFC-44QYi9RQ&types=place&country=us`)
                const newsSeachData = await newsSearchResponse.json()
                searchResults2.value = newsSeachData.features
            } else{
                searchResults2.value = null
            }
        }, 300)
    }

    {/* function to go to page with story search results */}

    const router = useRouter()
    const searchPage = () => {
        router.push({
            name: 'searchResults',
            params: {
                query: search.value 
            },
            query: {
                query: search.value
            }
        })
        search.value = ''
        searchResults.value = null
    }

    {/* function to go to page with town search results */}

    const searchTowns = () => {
        router.push({
            name: 'townSearchResults',
            params: {
                query: searchTown.value 
            },
            query: {
                query: searchTown.value
            }
        })
        searchTown.value = ''
        searchResults2.value = null
    }

    {/* function to go to page with town selected from town search suggestions */}

    const searchTownPage = (townName) => {
        let city = townName.place_name.split(",")[0]
        let state = townName.place_name.split(",")[1]
        const location = city + ", " + state
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
        searchTown.value = ''
        searchResults2.value = null
    }

    {/* function for toggle animation for switch beside searchbar */}

    const on = ref(false)
    const slideToggle = () => {
        on.value = !on.value
        if(on.value === true){
            document.getElementById('toggleButton').style.animation = 'toggleOn .25s forwards ease-in-out'
            document.getElementById('townSearchRef').style.display = 'flex'
            document.getElementById('storySearchRef').style.display = 'none'
            document.getElementById('toggleTextTown').style.opacity = '1'
            document.getElementById('toggleTextTown').style.fontWeight = '600'
            document.getElementById('toggleTextStory').style.opacity = '.5'
            document.getElementById('toggleTextStory').style.fontWeight = '400'
            searchTown.value = search.value
            search.value = ''
        } else if(on.value === false) {
            document.getElementById('toggleButton').style.animation = 'toggleOff .25s forwards ease-in-out'
            document.getElementById('townSearchRef').style.display = 'none'
            document.getElementById('storySearchRef').style.display = 'flex'
            document.getElementById('toggleTextTown').style.opacity = '.5'
            document.getElementById('toggleTextTown').style.fontWeight = '400'
            document.getElementById('toggleTextStory').style.opacity = '1'
            document.getElementById('toggleTextStory').style.fontWeight = '600'
            search.value = searchTown.value
            searchTown.value = ''
        }
    }

    {/* function to click out of suggestions */}
    
    const suggestionsCloser = () => {
        searchResults.value = null
        searchResults2.value = null 
    }

    document.addEventListener('click', suggestionsCloser)


    
 
</script>

