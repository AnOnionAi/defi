import { writable } from "svelte/store";

export const darkMode = writable(false)
let date : Date;
const autoDark = setInterval(() => {
    date = new Date();
    if(date.getHours() >= 18 || date.getHours() <= 6){
        console.log("Dark mode: on")
        darkMode.set(true);
        clearInterval(autoDark)
    }
}, 1000);