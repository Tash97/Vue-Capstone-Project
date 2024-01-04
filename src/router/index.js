import { createRouter, createWebHistory } from "vue-router";
import TownLookup from '../views/NewsForTown.vue'
import townSearchResults from '../views/TownSearchResults.vue'
import LandingPage from '../views/1LandingPage.vue'
import searchResults from '../views/NewsQueryResults.vue'
import categoryResults from '../views/CategoryResults.vue'
import savedCities from '../views/savedCities.vue'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: LandingPage,
            meta: {
                title: "NBCNNBC - Now's news: now"
            },
        },
        {
            path: '/townSearch',
            name: 'townsearch',
            component: TownLookup,
            meta: {
                title: 'Town'
            }
        },
        {
            path: '/search/:query',
            name: 'searchResults',
            component: searchResults,
            meta: {
                title: 'Results'
            }
        },
        {
            path: '/citylookup/:query',
            name: 'townSearchResults',
            component: townSearchResults,
            meta: {
                title: 'Results'
            }
        },
        {
            path: '/category/:category',
            name: 'categoryResults',
            component: categoryResults,
            meta: {
                title: 'Categories'
            }
        },
        {
            path: '/savedcities',
            name: 'savedCities',
            component: savedCities,
            meta: {
                title: 'My Cities'
            }
        },
    ]
})
router.beforeEach((to, from, next) => {
    document.title = `${
        to.query.category 
        ? 
        `${ to.query.category}`
        :
        to.query.locationName
        ?
        `${to.query.locationName}`
        :
        to.query.query
        ?
        `results for: ${to.query.query}`
        :
        to.meta.title

    }`;
    next();
})

export default router