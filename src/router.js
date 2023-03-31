import {createRouter, createWebHistory} from 'vue-router';
import AppFunctionalTask from "./components/AppFunctionalTask";
import AppAboutMe from "./components/AppAboutMe";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/task', component: AppFunctionalTask},
        {path: '/', component: AppAboutMe},
    ],

})

export default router;