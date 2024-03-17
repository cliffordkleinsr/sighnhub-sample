<script>
  import { page } from "$app/stores";
    
</script>

{#if $page.data.user}
<div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
      <div class="w-10 rounded-full">
        <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
      </div>
    </div>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
      <li>
        <a href="/admin/profile" class="justify-between">
          Profile
          <span class="badge">New</span>
        </a>
      </li>
      <li><a href="/admin/settings">Settings</a></li>
      <li>
      <form action="/logout" method="post">
        <button type="submit">Logout</button>
      </form>
    </li>
      <!-- <li><a href="/logout">Logout</a></li> -->
    </ul>
  </div>
{:else}
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="avatar placeholder">
            <div class="bg-neutral text-neutral-content rounded-full w-10">
              <span>PH</span>
            </div>
        </div> 
    </div>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
      <li><a href="/login" class="justify-between">Login</a></li>
      <li><a href="/register">Register</a></li>
    </ul>
  </div>
{/if}
