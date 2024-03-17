<script>
	import { page } from "$app/stores";
    import Avatar from "$lib/components/avatar.svelte";
    import "../app.pcss"

</script>
<div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
        <div class="navbar bg-base-100" data-theme="dark">
            <div class="flex-1">
                <label for="my-drawer" class="btn btn-square btn-ghost drawer-button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
            </div>
            <Avatar />
        </div>
    </div>
    <div class="drawer-side z-[1]">
        <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <!-- Sidebar content here -->
            <!-- <li><a href="/"></a></li> -->
            {#if $page.data.user}
               <li><a href="/admin">dashboard</a></li>
            {:else}
                <li><a href="/">Home</a></li>
            {/if}
            
           
        </ul>
    </div>
</div>  
<!-- Page content here -->
<slot/>