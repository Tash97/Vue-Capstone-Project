<template>
    <div  class="flex items-center justify-between w-full  h-[10vh] text-white shadow-xl bg-gradient-to-b from-[rgba(0,0,0,.75)] to-[rgba(0,0,0,1)]">
        <div @click="homeLoad" class="ms-5  text-4xl font-news">NBCNNBC</div>
        <SearchBar class="ms-[18.8%]" />
        <button v-if="isAuthenticated" @click="goToSavedCities" class="border-white border-b-[1px] mt-1 ms-auto me-10 ">Saved Cities</button>
        <button v-if="!isAuthenticated" @click="login" class="bg-gradient-to-b from-blue-600 to-blue-900 py-2 px-3 ms-auto me-10 rounded">Login</button>
        <button v-if="isAuthenticated" @click="log_out" class="bg-gradient-to-b from-blue-600 to-blue-900 py-2 px-3 ms-auto me-10 rounded">Log Out</button>
        <div @click="(e) => {e.stopPropagation()}"  class=" me-5  text-4xl text-right"><i @click="toggleDropDown()" class="fa-solid fa-bars"></i></div>
    </div>
    <div id="navbarDropDown" @click="(e) => {e.stopPropagation()}" class="absolute justify-center items-center hidden z-30 bg-black bg-opacity-95 w-full h-[60%] ">
        <div class="flex w-[95%] h-[86.25%] text-white">
            <div class=" h-full w-1/3 flex items-center justify-center">
                <div class=" w-[80%] h-full flex flex-col gap-y-20 pt-10 items-start ps-20">
                    <h2 @click="goToCategoryPage('general')" class="text-4xl">General</h2>
                    <h2 @click="goToCategoryPage('business')" class="text-4xl">Business</h2>
                    <h2 @click="goToCategoryPage('entertainment')" class="text-4xl">Entertainment</h2>
                </div>
            </div>
            <div class="h-full w-1/3 flex items-center justify-center">
                <div class=" w-[80%] h-full flex flex-col gap-y-20 pt-10 items-start ps-24">
                    <h2 @click="goToCategoryPage('health')" class="text-4xl">Health</h2>
                    <h2 @click="goToCategoryPage('science')" class="text-4xl">Science</h2>
                    <h2 @click="goToCategoryPage('sports')" class="text-4xl">Sports</h2>
                </div>
            </div>
            <div class="h-full w-1/3 flex items-center justify-center">
                <div class="w-[80%] h-full flex flex-col gap-y-20 pt-10 items-center">
                    <h2 @click="goToCategoryPage('technology')" class="text-4xl">Technology</h2>  
                </div>
            </div> 
        </div>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router'
    import { ref } from 'vue'
    import SearchBar from './SearchBar.vue';
    import { useAuth0 } from '@auth0/auth0-vue'

    {/* function to close dropdown navbar menu */}

    const dropdownToggleStatement = ref(false)

    const dropDownCloser = () => {
        if(document.getElementById('navbarDropDown').style.display !== 'none'){
            document.getElementById('navbarDropDown').style.display = 'none'
            dropdownToggleStatement.value = !dropdownToggleStatement.value

        }
    }
    document.addEventListener('click', dropDownCloser)

    {/* function to toggle dropdown navbar menu */}

    const toggleDropDown = () => {
        dropdownToggleStatement.value = !dropdownToggleStatement.value
        if(dropdownToggleStatement.value === true){
            document.getElementById('navbarDropDown').style.display = 'flex'
        } else {
            document.getElementById('navbarDropDown').style.display = 'none'

        }
    }

    {/* function to go to home page */}

    const router = useRouter()
    const homeLoad = () => {
        router.push({
            name: "home",
        })
    }

    {/* function to go to category pages */}

    const goToCategoryPage = (category) => {
        const capitalizedCategory = category.split('')[0].toUpperCase() + category.split('').splice(1).join('')
        toggleDropDown()
        router.push({
            name: 'categoryResults',
            params: {
                category: category 
            },
            query: {
                category: capitalizedCategory
            }
        })    
    }

    {/* function to go to saved cities */}

    const goToSavedCities = () => {
        router.push({
            name: "savedCities",
        })
    }

    {/* auth0 login/out functions */}

    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    const login = () => {
        loginWithRedirect();
    }

    const log_out = () => {
        logout({ returnTo: window.location.origin })
    }
    
</script>

