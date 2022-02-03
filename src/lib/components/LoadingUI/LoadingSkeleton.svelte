<script lang="ts">
import { height, width } from "@fortawesome/free-solid-svg-icons/faChevronUp";



interface StyleConfig {
        width?: string,
        height?: string,
        backgroundColor?: string,
    }

    export let styles:StyleConfig;

  
</script>

<div style="width:{styles.width}; height:{styles.height}; " class="pulse bg-gray-200 dark:bg-dark-400 rounded-lg">

</div>


<style>

.pulse{
animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
</style>