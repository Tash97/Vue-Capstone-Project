<template>
    <div v-for="result in results" :key="result.title" class="w-full h-[80vh] rounded-b-2xl shadow-2xl">
        <div class="bg-gray-400 bg-opacity-50 w-full h-[75%] rounded-t-2xl">
            <img class="w-full h-full object-contain" :src="result.urlToImage" alt="">
        </div>
        <div class="flex w-full h-1/4 rounded-b-2xl">
            <div class="flex justify-center items-center w-full h-full">
                <div class="flex flex-col w-[70%] h-[90%] overflow-y-auto ">
                    <h2 class="text-2xl leading-none font-semibold mb-2">{{ result.title }}</h2>
                    <p class="mb-1 ">{{ result.description }}</p>
                    <p class="text-xs mt-auto">Published on: <span class="font-semibold">{{ result.published_at }}</span> <span v-if="result.author">By: <span class="font-semibold">{{ result.author }}</span></span></p>
                </div>
                <a :href="result.url" class="ms-[8.2%]">
                    <button class="bg-black shadow-xl whitespace-nowrap text-white px-3 py-2 text-2xl rounded">Read More</button>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useRoute } from 'vue-router'
    import { ref } from 'vue';

    {/* function that retrieves news Data based on search by article */}

    const route = useRoute()
    const results = ref(null)


    const searchGrab = async() => {   
        const newsResponse = await fetch(`https://newsapi.org/v2/everything?language=en&q=${route.query.query}&pageSize=100&apiKey=4522f236338f41cca110abb258c467d8`) 
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
                const date = new Date(array[t].publishedAt)
                array[t].published_at = date.toLocaleDateString('en-us')
            }        
        results.value = array       
    }
    searchGrab()
</script>

