<script>
    let ordering = false;
    export let platformSelected = 'All';
    export let zeroBalance = false;
    export let stakedOnly = false;
    export let statement = '';

    export let sortby = 'Descending';
    import { _ } from "svelte-i18n"
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    const select = () => dispatch('staked');

</script>

<div class="w-full max-w-7xl m-auto overflow-right-hidden shadow rounded-2xl bg-white my-4 px-4 pb-4 pt-6 dark:bg-dark-600 dark:text-white border border-white">

    <div class="flex flex-row flex-wrap w-auto justify-around relative">

        <div class="flex lg:flex-row flex-col w-full max-w-6xl m-auto sm:justify-between ">

            <label for="my-control" class="checkbox gap-1 pl-4 sm:pl-0">
                <span class="checkbox__input">
                    <input name="checkbox_p" type=radio value="All" bind:group={platformSelected}>
                    <span class="checkbox__control">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            stroke-width="3"
                            d="M1.73 12.91l6.37 6.37L22.79 4.59"
                          />
                        </svg>
                      </span>
                </span>
                <span id="all" class="radio__label text-base dark:font-normal dark:tracking-wider">All</span>
            </label>

            <label for="my-control" class="checkbox gap-1 pl-4 sm:pl-0">
                <span class="checkbox__input">
                    <input name="checkbox_p" type=radio value="SushiSwap" bind:group={platformSelected}>
                    <span class="checkbox__control">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            stroke-width="3"
                            d="M1.73 12.91l6.37 6.37L22.79 4.59"
                          />
                        </svg>
                      </span>
                </span>
                <span class="radio__label text-pink-700 text-base">
                    <img src="/sushi.png" alt="SushiSwap">
                </span>
            </label>

            <label for="my-control" class="checkbox gap-1 pl-4 sm:pl-0">
                <span class="checkbox__input">
                    <input name="checkbox_p" type=radio value="QuickSwap" bind:group={platformSelected} >
                    <span class="checkbox__control">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            stroke-width="3"
                            d="M1.73 12.91l6.37 6.37L22.79 4.59"
                          />
                        </svg>
                      </span>
                </span>
                <span class="radio__label text-blue-700 text-base">
                    <img src="/vaultTokensIcons/quick.svg" alt="QuickSwap">
                </span>
            </label>

            <label for="my-control" class="checkbox gap-1 pl-4 sm:pl-0">
                <span class="checkbox__input">
                    <input name="checkbox" type=checkbox bind:checked={zeroBalance}>
                    <span class="checkbox__control">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            stroke-width="3"
                            d="M1.73 12.91l6.37 6.37L22.79 4.59"
                          />
                        </svg>
                      </span>
                </span>
                <span id="zero" class="radio__label text-base dark:font-normal dark:tracking-wider">{$_("vaultFilter.hidezero")}</span>
            </label>

        </div>
    
        <div class=" pt-4 pb-4 mt-2 max-w-7xl m-auto sm:ml-0 sm:mb-0 sm:mr-0 sm:mt-2 inline-block	">
            <div class="text-sm pl-2 pb-2 title uppercase">
                {$_("vaultFilter.filterby")}
            </div>
            <div class="content-select">
                <select>
                    <option value="TVL">TVL</option>
                    <option value="APY">APY</option>
                </select>
                <i></i>
            </div>
            
        </div>

        <div class=" pt-4 pb-4 mt-2 m-auto sm:ml-2 sm:mb-0 sm:mr-0 sm:mt-2 inline-block	">
            <div class="text-sm pl-2 pb-2 title uppercase">
                {$_("vaultFilter.sortby")}
            </div>
            <div class="content-select">
                <select
                    bind:value={sortby}>
                    <option class="min-w-7xl" value="Descending">{$_("vaultFilter.desceding")}</option>
                    <option value="Ascending">{$_("vaultFilter.ascending")}</option>
                </select>
                <i></i>
            </div>
        </div>

        <div class=" pt-4 pb-4 mt-2 m-auto sm:ml-2 sm:mb-0 sm:mr-2 sm:mt-2 inline-block	">
            <div class="text-sm pl-2 pb-2 title uppercase">
                {$_("vaultFilter.search")}
            </div>
            <div class="content-input">
                <input type="text" placeholder={$_("vaultFilter.searchvaults")} bind:value={statement}>
            </div>
        </div>

        <div class="pt-8 pb-4 mt-4 sm:pt-10 m-auto sm:ml-2 sm:mb-0 sm:mr-0 sm:mt-2 inline-block	">
            <button class:active={stakedOnly} class="bg-gray-300 hover:bg-gray-500 text-dark dark:text-dark font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded" on:click={select}>{$_("vaultFilter.stakedonly")}</button>
        </div>

    </div>

    

</div>

<style>
    .active {
		background-color: rgba(16, 185, 129, var(--tw-bg-opacity));
	}

    img {
        width: 32px;
        height: 32px;
    }

    .content-input input{
        display: inline-block;
        width: 100%;
        padding: 7px 10px;
        height: 42px;
        outline: 0; 
        border: 0;
        border-radius: 0;
        background: #f0f0f0;
        color: #7b7b7b;
        font-size: 1.1em;
        font-weight: 400;
        color: #999;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        border:2px solid rgba(0,0,0,0.2);
        border-radius: 12px;
        position: relative;
        transition: all 0.25s ease;
        opacity: 1;
    }

    button {
        display: inline-block;
        width: 100%;
        max-width: 200px;
        min-width: 200px;
        padding: 7px 10px;
        height: 42px;
        font-size: 1em;
        font-weight: 400;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        color: black;
    }

    .title {
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-size: 15px;
        font-weight: 400;
    }

    /* ----------- DROP DOWN STYLES ---------------- */

    .content-select select{
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
    }

    /* Eliminamos la fecha que por defecto aparece en el desplegable */
    .content-select select::-ms-expand {
        display: none;
    }

    .content-select{
        position: relative;
    }
    
    .content-select select{
        display: inline-block;
        width: 100%;
        max-width: 200px;
        min-width: 200px;
        cursor: pointer;
        padding: 7px 10px;
        height: 42px;
        outline: 0; 
        border: 0;
        border-radius: 0;
        background: #f0f0f0;
        color: #7b7b7b;
        font-size: 1.1em;
        font-weight: 400;
        color: #999;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        border:2px solid rgba(0,0,0,0.2);
        border-radius: 12px;
        position: relative;
        transition: all 0.25s ease;
    }

 
    .content-select select:hover{
        background: #B1E8CD;
    }

    select option {
        background-color: white;
        min-width: 200px;
        min-height: 200px;
        cursor: pointer;
        height: 500px;
    }
    
    /* 
    Creamos la fecha que aparece a la izquierda del select.
    Realmente este elemento es un cuadrado que sólo tienen
    dos bordes con color y que giramos con transform: rotate(-45deg);
    */
    .content-select i{
        position: absolute;
        right: 20px;
        top: calc(50% - 13px);
        width: 16px;
        height: 16px;
        display: block;
        border-left:4px solid #2AC176;
        border-bottom:4px solid #2AC176;
        transform: rotate(-45deg); /* Giramos el cuadrado */
        transition: all 0.25s ease;
    }
    
    .content-select:hover i{
        margin-top: 3px;
    }


    /* ------------ CHECKBOX STYLES --------------- */
    input[type='radio'] {
        cursor: pointer
    }

    input[type='checkbox'] {
        cursor: pointer;
    }

    .checkbox {
        display: grid;
        grid-template-columns: min-content auto;
        /* grid-gap: 0.5em; */
        font-size: 2rem;
        font-weight: 100;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        color: var(--color);
        max-width: 200px;
        min-width: 200px;        
    }

    .checkbox .radio__label {
        font-size: 16px;
    }

    .radio__label#all {
        color: #059669;
    }

    .radio__label#zero {
        color: #DC2626;
    }


    input {
        opacity: 0;
        width: 1em;
        height: 1em;
        z-index: 999999999;
    }

    .checkbox__control {
        width: .8em;
        height: .8em;
        border-radius: 0.20em;
        border: 0.1em solid currentColor;

    }

    .checkbox__input {
        display: grid;
        grid-template-areas: "checkbox";

    }
    .checkbox__input > * {
        grid-area: checkbox;
    }

    .checkbox__control svg {
        transition: transform 0.1s ease-in 25ms;
        transform: scale(0);
        transform-origin: bottom left;
    }

    .checkbox__input input:checked + .checkbox__control svg {
        transform: scale(1);
    }

    .checkbox__input input:focus + .checkbox__control {
        box-shadow: 0 0 0 0.05em #fff, 0 0 0.15em 0.1em currentColor;
    }

    .checkbox__input input:hover + .checkbox__control {
        box-shadow: 0 0 0 0.05em #fff, 0 0 0.15em 0.1em currentColor;
    }

    .checkbox__input input:checkbox:disabled + .checkbox__control {
        color: red;
    }
</style>