<script lang="ts">
    import type L from 'leaflet'// Import the Leaflet library type definition
	import { onMount, setContext } from 'svelte'
	import { key } from '$lib/components/map';
    import 'leaflet/dist/leaflet.css'// Import Leaflet CSS for styling


    export let lat: number
    export let long: number
    export let zoom: number
    export let mapHeight: string = 'h-screen'

    let leaflet: typeof L
    let leafletMap: L.Map
    //To avoid DOM querying we use the bind directive on a specific element using the bind:this specifialy a div element for this case
    let mapEl: HTMLDivElement

    // Set context to provide access to Leaflet and map instances within child components
    setContext(key,{
        getLeaflet: () => leaflet,
        getMap: () => leafletMap
    })

    // Wait for the DOM to mount before creating the map
    onMount(async() =>{
        // Dynamically import Leaflet to improve performance on initial load
        leaflet = await import('leaflet')
        // Create a new Leaflet map instance and set initial view
        leafletMap = leaflet.map(mapEl).setView([lat, long] , zoom)
         // Add OpenStreetMap tile layer with proper attribution
        leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(leafletMap)
    })

</script>
<div bind:this={mapEl} class="w-full z-[0] {mapHeight}"/>

{#if leaflet && leafletMap}
    <slot/>
{/if}

