
<script lang="ts">
    import {darkMode} from "../../stores/dark";

    import { _ } from "svelte-i18n"
</script>
<footer class="z-20" class:dark = {$darkMode}>
    <div
      class="dark:text-gray-300 dark:bg-blue-gray-800 w-full p-3 text-center text-xl"
    >
    <div class = "ml-auto mr-auto flex justify-center text-center">

        <a href="/#">
            <span class="font-normal p-1">
            {$_("pages.about.title")}
            </span>
        </a>
    
        <a href="/#">
            <span class="font-normal p-1">
            {$_("pages.contact.title")}
            </span>
        </a>
    
        <a href="#">
            <span class="font-normal p-1">
            {$_("pages.audits.title")}
            </span>
        </a>
        <a href="#">
          <span class="font-normal p-1">
          {$_("pages.trade.title")}
          </span>
      </a>
    </div>
    </div>
</footer>
  
  <style>
    .footer_home {
      color: white !important;
    }
  </style>
  