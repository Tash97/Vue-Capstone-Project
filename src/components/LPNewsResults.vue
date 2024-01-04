<template>
    <div v-if="newsError">There was an error accessing the news database</div>
    <div v-for="story in localNewStories" :key="story.title" class="">
        <div class="flex h-[30vh] mb-5 rounded-lg border-black border-[1px] shadow-xl">
            <div class="flex text-white w-5/12 h-full">
                <img :src="story.urlToImage"  class="object-cover w-full rounded-s-lg"/>
            </div>
            <div class="flex flex-col w-7/12   justify-between ps-3.5 pe-1.5 py-3 rounded-e-lg bg-white">
                <div class="h-[75%] w-[100%] overflow-y-auto  pe-4">
                    <h2 class="text-2xl mb-.5 font-bold leading-tight">{{ story.title }}</h2>
                    <p class="flex flex-col justify-between">{{ story.description }}</p>
                    <p class="text-xs mt-4">
                        Published on:
                        <span class="font-semibold">
                            {{ story.published_at }}
                        </span> 
                        <span v-if="story.author">
                            By: 
                            <span class="font-semibold">
                                {{ story.author }}
                            </span>
                        </span>
                    </p>
                </div>
                <a :href="story.url" class=" ">
                    <button class=" py-1 w-[97.5%] text-white bg-gradient-to-t from-black to-[rgba(0,0,0,.9)] text-2xl rounded font-semibold">Read More</button>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    
    const props = defineProps({
        city: {
            type: String,
            default: 'Jenny I got your number'
        },
        state: {
            state: String,
            default: 'I wanna make you mine(continuation on weatherApp props)'
        }
    })

    const newsError = ref(false)

    {/* function that retrieves news results with location info */}

    const localNewStories = ref(null)

    const apiCall = async() => {
        try{
            const newsResponse2 = await fetch(`https://newsapi.org/v2/everything?language=en&q=+"${props.city}" +"${props.state}"&pageSize=100&apiKey=4522f236338f41cca110abb258c467d8`) 
            const newsData2 = await newsResponse2.json();
            const newsResponse = await fetch(`https://newsapi.org/v2/everything?language=en&q=+"${props.state}" -"${props.city}"&pageSize=100&apiKey=4522f236338f41cca110abb258c467d8`) 
            const newsData = await newsResponse.json();

            const array = []
            for(let i = 0; i < newsData2.articles.length; i++){
                if(newsData2.articles[i].urlToImage !== null && !newsData2.articles[i].urlToImage.includes('.mp4') && !newsData2.articles[i].urlToImage.includes('youtube') && !newsData2.articles[i].urlToImage.includes('.mp3') && !newsData2.articles[i].urlToImage.includes('audio') && !newsData2.articles[i].urlToImage.includes('.js') && !newsData2.articles[i].title.includes('[')){                
                    array.push(newsData2.articles[i])                
                }
            }
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
            localNewStories.value = array
        } catch{
            newsError.value = true
        }
    }
    apiCall();
    
</script>
