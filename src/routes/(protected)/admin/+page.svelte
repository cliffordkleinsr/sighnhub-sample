<script>
	import { Map, Marker} from "$lib/components/map"
  import GIconurl from "$lib/assets/leaf-green.png"
  import RIconurl from "$lib/assets/leaf-red.png"
  import Iconshadow from "$lib/assets/leaf-shadow.png"
  import { page } from "$app/stores"
</script>

{#if $page.data.user}
  <div class="flex flex-col align-items-center">
    <Map lat={45.815399} long={15.966568} zoom={6}>
      <Marker lat={45.815399} long={15.966568} label={'Zagreb'} iconurl={GIconurl} shadowurl={Iconshadow}></Marker>
      <Marker lat={44.119371} long={15.231365} label={'Zardar'} iconurl={RIconurl} shadowurl={Iconshadow}></Marker>
    </Map>
  </div>

{/if}

