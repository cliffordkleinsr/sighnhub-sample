import Map from "./map.svelte"
import Marker from "./marker.svelte"
import type L from 'leaflet'
import { key } from "./key"

export type MapContext = {
    getLeaflet: () => typeof L
    getMap: () => L.Map
}



export {Map, Marker, key}