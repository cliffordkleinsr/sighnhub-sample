<script lang="ts">
	import { createEventDispatcher, getContext } from "svelte"
	import { key, type MapContext } from "$lib/components/map"


    export let lat:number
    export let long:number
    export let label: string
    //icon params
    export let iconurl:string = ''
    export let shadowurl:string  = ''

    let custom_icon:L.Icon
    
    const {getLeaflet, getMap} = getContext<MapContext>(key)

    const leaflet = getLeaflet()
    const map = getMap()

    // Icon
    custom_icon = leaflet.icon({
        iconUrl: iconurl,
        shadowUrl: shadowurl,

        iconSize:     [38, 95], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    })
    const marker = leaflet.marker([lat, long]).addTo(map)
    marker.bindPopup(label)
    if (iconurl && shadowurl) 
    {
       marker.setIcon(custom_icon)  
    }
    
    // Event dispatching
    const dispatch = createEventDispatcher()
    marker.on('popupopen', () => dispatch('open'))
    marker.on('popupclose', () => dispatch('close'))
</script>