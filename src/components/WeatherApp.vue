<template>
    <div class="flex flex-col items-center w-[90%] overflow-hidden">
        <div class="flex w-[79%] mb-[3.3%]">
            <div class="flex items-end "><i @click="displaysHolderback()" id="caretLeft" class="fa-solid fa-caret-left text-[1.75rem] text-[rgba(0,0,0,.5)] mb-2.5 hover:cursor-pointer"></i></div>
            <h2 class="text-3xl ms-[20%]">Weather: {{ dayOrHour }}</h2>
            <div class="flex items-end ms-auto "><i @click="displaysHolderforward()" id="caretRight" class="fa-solid fa-caret-right text-[1.75rem] mb-2.5 hover:cursor-pointer"></i></div>
        </div>
        <div class="flex items-center w-full h-[37.9vh] rounded-xl">
            <div class="flex justify-center rounded-2xl bg-slate-300 shadow-2xl w-full h-[100%]">
                <div id="dayHolderBackward" @click="scrollDailyBackward()" class="flex w-[10%] z-20 justify-center items-center text-white bg-gradient-to-t from-black to-[rgb(57,60,63)] rounded-s-xl text-5xl hover:cursor-pointer">
                    <i class="fa-solid fa-angle-left"></i>
                </div>
                <div id="hourHolderBackward" @click="scrollHourlyBackward()" class="hidden w-[10%] z-20 justify-center items-center text-white bg-gradient-to-t from-black to-[rgb(57,60,63)] rounded-s-xl text-5xl hover:cursor-pointer">
                    <i class="fa-solid fa-angle-left"></i>
                </div>
                <div id="weatherTimeDisplay" class="flex w-4/5 ">
                    <div class="flex min-w-[100%] overflow-x-hidden">
                        <div id="dailyWeatherScrollGrab" class="flex min-w-[100%] h-full">
                            <div v-for="day in weather.daily" :key="day.dt" class="flex flex-col min-w-[100%] justify-around items-center  w-[100%] ">
                                <h2 class=" text-2xl">
                                    {{ day.currentMonth }} {{ day.currentDay.split("/")[1] }}, {{ day.currentDay.split("/")[2] }}
                                </h2>
                                <div class="w-[23%] h-[15%] flex items-center ">
                                    <img :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`" />
                                </div>
                                <div class="text-xl">
                                            <p>Forecast: {{ day.weather[0].description }}</p>
                                            <p>High: {{ Math.round(day.temp.max) }}&deg;</p>
                                            <p>Low: {{ Math.round(day.temp.min) }}&deg;</p>
                                            <p>Humidity: {{ day.humidity }}&percnt;</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex min-w-[100%] overflow-x-hidden ms-[20%]">
                        <div id="hourlyWeatherScrollGrab" class="flex min-w-[100%] h-full">
                            <div v-for="hourData in weather.hourly" :key="hourData.dt" id="hourlyWeatherScrollElement" class="flex flex-col min-w-[25%]  items-center justify-around">
                                <p class="whitespace-nowrap text-2xl">
                                    {{ new Date(
                                        hourData.currentTime).toLocaleTimeString("en-us", {
                                            hour: "numeric"
                                        })
                                    }}
                                </p>
                                <img class=" h-1/2 object-cover" :src="`https://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`" alt="weather type" />
                                <p class="text-3xl">{{ Math.round(hourData.temp) }}&deg;</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="hourHolderFoward" @click="scrollHourlyForward" class="hidden w-[10%] z-20 justify-center items-center rounded-e-xl text-white bg-gradient-to-t from-black to-[rgb(57,60,63)] text-5xl hover:cursor-pointer">
                    <i class="fa-solid fa-angle-right"></i>
                </div>
                <div id="dayHolderFoward" @click="scrollDailyForward" class="flex w-[10%] z-20 justify-center items-center rounded-e-xl text-white bg-gradient-to-t from-black to-[rgb(57,60,63)] text-5xl hover:cursor-pointer">
                    <i class="fa-solid fa-angle-right"></i>
                </div>
            </div>
        </div>    
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    const props = defineProps({
        lat: 'number',
        lon: 'number'
    })

    {/* function to grab weather data */}

    const weatherGrab = async() => {
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${ props.lat }&lon=${ props.lon }&appid=657363553425d46400ca20a477dfa578&units=imperial`)
        const weatherData = await weatherResponse.json() 
        
        weatherData.currentTime = new Date(weatherData.current.dt * 1000).toLocaleTimeString("en-us")
        weatherData.hourly.forEach((hour) => {
            hour.currentTime = hour.dt * 1000
        })
        weatherData.daily.forEach((day) => {
            const date = new Date(day.dt * 1000)
            day.currentMonth = date.toLocaleDateString('en-US', { month: 'long' })
            day.currentDay = date.toLocaleDateString('en-US')
        }) 
        return weatherData
    }
    const weather = await weatherGrab() 

    {/* functions to animate weather app scrolling */}

    const scrollDailyForward = () => {
        const animation = document.getElementById('dailyWeatherScrollGrab')
        if(!animation.style.animation || animation.style.animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR"){
            animation.style.animation = 'slideWeather .5s forwards ease-in-out'
        } else if(animation.style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather' || animation.style.animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR"){
            animation.style.animation = 'slideWeather2 .5s forwards ease-in-out'
        } else if(animation.style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather2' || animation.style.animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR2"){
            animation.style.animation = 'slideWeather3 .5s forwards ease-in-out'
        } else if(animation.style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather3' || animation.style.animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR3"){
            animation.style.animation = 'slideWeather4 .5s forwards ease-in-out'
        } else if(animation.style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather4' || animation.style.animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR4"){
            animation.style.animation = 'slideWeather5 .5s forwards ease-in-out'
        } else if(animation.style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather5' || animation.style.animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR5"){
            animation.style.animation = 'slideWeather6 .5s forwards ease-in-out'
        } else if(animation.style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather6' || animation.style.animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR6"){
            animation.style.animation = 'slideWeather7 .5s forwards ease-in-out'
        } 
    }

    const scrollDailyBackward = () => {
        const animation = document.getElementById('dailyWeatherScrollGrab').style.animation
        if(document.getElementById('dailyWeatherScrollGrab').style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather' || animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR2"){
            document.getElementById('dailyWeatherScrollGrab').style.animation = 'slideWeatherR .5s forwards ease-in-out'
        } else if(document.getElementById('dailyWeatherScrollGrab').style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather2' || animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR3"){
            document.getElementById('dailyWeatherScrollGrab').style.animation = 'slideWeatherR2 .5s forwards ease-in-out'
        } else if(document.getElementById('dailyWeatherScrollGrab').style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather3' || animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR4"){
            document.getElementById('dailyWeatherScrollGrab').style.animation = 'slideWeatherR3 .5s forwards ease-in-out'
        } else if(document.getElementById('dailyWeatherScrollGrab').style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather4' || animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR5"){
            document.getElementById('dailyWeatherScrollGrab').style.animation = 'slideWeatherR4 .5s forwards ease-in-out'
        } else if(document.getElementById('dailyWeatherScrollGrab').style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather5' || animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR6"){
            document.getElementById('dailyWeatherScrollGrab').style.animation = 'slideWeatherR5 .5s forwards ease-in-out'
        } else if(document.getElementById('dailyWeatherScrollGrab').style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather6' || animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR7"){
            document.getElementById('dailyWeatherScrollGrab').style.animation = 'slideWeatherR6 .5s forwards ease-in-out'
        } else if(document.getElementById('dailyWeatherScrollGrab').style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather7' || animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR8"){
            document.getElementById('dailyWeatherScrollGrab').style.animation = 'slideWeatherR7 .5s forwards ease-in-out'
        }
    }

    const scrollHourlyForward = () => {        
        const animation = document.getElementById('hourlyWeatherScrollGrab')
        if(!animation.style.animation || animation.style.animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR"){
            animation.style.animation = 'slideWeather .5s forwards ease-in-out'
        } else if(animation.style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather' || animation.style.animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR"){
            animation.style.animation = 'slideWeather2 .5s forwards ease-in-out'
        } else if(animation.style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather2' || animation.style.animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR2"){
            animation.style.animation = 'slideWeather3 .5s forwards ease-in-out'
        } else if(animation.style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather3' || animation.style.animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR3"){
            animation.style.animation = 'slideWeather4 .5s forwards ease-in-out'
        } else if(animation.style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather4' || animation.style.animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR4"){
            animation.style.animation = 'slideWeather5 .5s forwards ease-in-out'
        } else if(animation.style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather5' || animation.style.animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR5"){
            animation.style.animation = 'slideWeather6 .5s forwards ease-in-out'
        } else if(animation.style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather6' || animation.style.animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR6"){
            animation.style.animation = 'slideWeather7 .5s forwards ease-in-out'
        } else if(animation.style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather7' || animation.style.animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR7"){
            animation.style.animation = 'slideWeather8 .5s forwards ease-in-out'
        } else if(animation.style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather8' || animation.style.animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR8"){
            animation.style.animation = 'slideWeather9 .5s forwards ease-in-out'
        } else if(animation.style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather9' || animation.style.animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR9"){
            animation.style.animation = 'slideWeather10 .5s forwards ease-in-out'
        } else if(animation.style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather10' || animation.style.animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR10"){
            animation.style.animation = 'slideWeather11 .5s forwards ease-in-out'
        }
    }   

    const scrollHourlyBackward = () => {
        const animation = document.getElementById('hourlyWeatherScrollGrab').style.animation
        if(document.getElementById('hourlyWeatherScrollGrab').style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather' || animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR2"){
            document.getElementById('hourlyWeatherScrollGrab').style.animation = 'slideWeatherR .5s forwards ease-in-out'
        } else if(document.getElementById('hourlyWeatherScrollGrab').style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather2' || animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR3"){
            document.getElementById('hourlyWeatherScrollGrab').style.animation = 'slideWeatherR2 .5s forwards ease-in-out'
        } else if(document.getElementById('hourlyWeatherScrollGrab').style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather3' || animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR4"){
            document.getElementById('hourlyWeatherScrollGrab').style.animation = 'slideWeatherR3 .5s forwards ease-in-out'
        } else if(document.getElementById('hourlyWeatherScrollGrab').style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather4' || animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR5"){
            document.getElementById('hourlyWeatherScrollGrab').style.animation = 'slideWeatherR4 .5s forwards ease-in-out'
        } else if(document.getElementById('hourlyWeatherScrollGrab').style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather5' || animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR6"){
            document.getElementById('hourlyWeatherScrollGrab').style.animation = 'slideWeatherR5 .5s forwards ease-in-out'
        } else if(document.getElementById('hourlyWeatherScrollGrab').style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather6' || animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR7"){
            document.getElementById('hourlyWeatherScrollGrab').style.animation = 'slideWeatherR6 .5s forwards ease-in-out'
        } else if(document.getElementById('hourlyWeatherScrollGrab').style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather7' || animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR8"){
            document.getElementById('hourlyWeatherScrollGrab').style.animation = 'slideWeatherR7 .5s forwards ease-in-out'
        } else if(document.getElementById('hourlyWeatherScrollGrab').style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather8' || animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR9"){
            document.getElementById('hourlyWeatherScrollGrab').style.animation = 'slideWeatherR8 .5s forwards ease-in-out'
        } else if(document.getElementById('hourlyWeatherScrollGrab').style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather9' || animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR10"){
            document.getElementById('hourlyWeatherScrollGrab').style.animation = 'slideWeatherR9 .5s forwards ease-in-out'
        } else if(document.getElementById('hourlyWeatherScrollGrab').style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather10' || animation === "0.5s ease-in-out 0s 1 normal forwards running slideWeatherR11"){
            document.getElementById('hourlyWeatherScrollGrab').style.animation = 'slideWeatherR10 .5s forwards ease-in-out'
        } else if(document.getElementById('hourlyWeatherScrollGrab').style.animation === '0.5s ease-in-out 0s 1 normal forwards running slideWeather11'){
            document.getElementById('hourlyWeatherScrollGrab').style.animation = 'slideWeatherR11 .5s forwards ease-in-out'
        }
    }

    {/* function to switch between daily and hourly weather */}

    const dayOrHour = ref('Daily')

    const displaysHolderforward = () => {
        const animation = document.getElementById('weatherTimeDisplay')
        animation.style.animation = 'slideWeatherHolder 1s forwards ease-in-out'
        document.getElementById("dayHolderFoward").style.display = 'none'
        document.getElementById("dayHolderBackward").style.display = 'none'
        document.getElementById("hourHolderFoward").style.display = 'flex'
        document.getElementById("hourHolderBackward").style.display = 'flex'
        dayOrHour.value = 'Hourly'
        document.getElementById('caretRight').style.color = 'rgba(0,0,0,.5)'
        document.getElementById('caretLeft').style.color = 'rgba(0,0,0,1)'        
    }

    const displaysHolderback = () => {
        const animation = document.getElementById('weatherTimeDisplay')
        animation.style.animation = 'slideWeatherHolderR 1s forwards ease-in-out'
        document.getElementById("hourHolderFoward").style.display = 'none'
        document.getElementById("hourHolderBackward").style.display = 'none'
        document.getElementById("dayHolderFoward").style.display = 'flex'
        document.getElementById("dayHolderBackward").style.display = 'flex'
        dayOrHour.value = 'Daily'
        document.getElementById('caretRight').style.color = 'rgba(0,0,0,1)'
        document.getElementById('caretLeft').style.color = 'rgba(0,0,0,.5)'
    }
   

</script>

