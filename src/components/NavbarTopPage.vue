<template>
    <div  class="flex items-center justify-between w-full  h-[10vh] text-white shadow-xl bg-gradient-to-b from-[rgba(0,0,0,.75)] to-[rgba(0,0,0,1)]">
        <div class="ms-5  text-4xl font-news hover:cursor-pointer" @click="homeLoad">NBCNNBC</div>
        <SearchBar class="ms-[18.8%]" />
        <button v-if="isAuthenticated" class="border-white border-b-[1px] mt-1 ms-auto me-10 " @click="goToSavedCities">Saved Cities</button>
        <button v-if="!isAuthenticated" class="bg-gradient-to-b from-blue-600 to-blue-900 py-2 px-3 ms-auto me-10 rounded" @click="login">Login</button>
        <button v-if="isAuthenticated" class="bg-gradient-to-b from-blue-600 to-blue-900 py-2 px-3 ms-auto me-10 rounded" @click="log_out">Log Out</button>
        <div class=" me-5  text-4xl text-right hover:cursor-pointer"  @click="(e) => {e.stopPropagation()}"><i class="fa-solid fa-bars" @click="toggleDropDown()"></i></div>
    </div>
    <div id="navbarDropDown" class="absolute justify-center items-center hidden z-30 bg-black bg-opacity-95 w-full h-[60%] " @click="(e) => {e.stopPropagation()}">
        <div class="flex w-[95%] h-[86.25%] text-white">
            <div class=" h-full w-1/3 flex items-center justify-center">
                <div class=" w-[80%] h-full flex flex-col gap-y-20 pt-10 items-start ps-20">
                    <h2 class="text-4xl hover:cursor-pointer" @click="goToCategoryPage('general')">General</h2>
                    <h2 class="text-4xl hover:cursor-pointer" @click="goToCategoryPage('business')">Business</h2>
                    <h2 class="text-4xl hover:cursor-pointer" @click="goToCategoryPage('entertainment')">Entertainment</h2>
                </div>
            </div>
            <div class="h-full w-1/3 flex items-center justify-center">
                <div class=" w-[80%] h-full flex flex-col gap-y-20 pt-10 items-start ps-24">
                    <h2 class="text-4xl hover:cursor-pointer" @click="goToCategoryPage('health')">Health</h2>
                    <h2 class="text-4xl hover:cursor-pointer" @click="goToCategoryPage('science')">Science</h2>
                    <h2 class="text-4xl hover:cursor-pointer" @click="goToCategoryPage('sports')">Sports</h2>
                </div>
            </div>
            <div class="h-full w-1/3 flex items-center justify-center">
                <div class="w-[80%] h-full flex flex-col gap-y-20 pt-10 items-center">
                    <h2 class="text-4xl hover:cursor-pointer" @click="goToCategoryPage('technology')">Technology</h2>  
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

