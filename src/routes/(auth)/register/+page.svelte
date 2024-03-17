<script lang=ts>
	import { enhance, applyAction } from '$app/forms'
    import { invalidateAll } from '$app/navigation'

    const invalidate = () =>{
        return async({ result }:{ result: any})=>{
            // rerun the `load` function for the page
            invalidateAll()
            // since we are customizing the default behaviour
            // we dont't want to re-implement what `use:enhance` does?
            // therefore we use `applyAction` and pass the result
            await applyAction(result)
        }
    }

    export let form
</script>
<div class="flex flex-col items-center">
    <h2 class="text-3xl py-5">Register</h2>
    <div class="card card-body bg-base-200 w-full max-w-md">
        <form class="flex flex-col items-center space-y-2 w-full py-5" action="?/register" method="post" use:enhance={invalidate}>
        <div class="form-control w-full max-w-md ">
            <label for="name" class="label">Name</label>
            <input type="text" id="name" name="name" placeholder="name" class="input {form?.errors?.name ? 'input-error' :'input-bordered'} max-w-md" value="{form?.data?.name ?? ''}"/>
            <label for="name" class="label">
                {#if form?.errors?.name}
                    <span class="label-text-alt text-error">{form?.errors?.name[0]}</span>
                {/if}
            </label>
        </div>
        <div class="form-control w-full max-w-md ">
            <label for="email" class="label">Email</label>
            <input type="text" id="email" name="email" placeholder="email" class="input {form?.errors?.email ? 'input-error' :'input-bordered'} max-w-md" value="{form?.data?.email ?? ''}"/>
            <label for="email" class="label">
                {#if form?.errors?.email}
                    <span class="label-text-alt text-error">{form?.errors?.email[0]}</span>
                {/if}
            </label>
        </div>
        <div class="form-control w-full max-w-md">
            <label for="password" class="label">Password</label>
            <input type="password" id="password" name="password" placeholder="password" class="input {form?.errors?.password ? 'input-error' :'input-bordered'} max-w-md"/>
            <label for="password" class="label">
                {#if form?.errors?.password}
                    <span class="label-text-alt text-error">{form?.errors?.password[0]}</span>
                {/if}
            </label>
        </div>
        <div class="form-control w-full max-w-md">
            <label for="passwordConfirm" class="label">Confirm Password</label>
            <input type="password" id="passwordConfirm" name="passwordConfirm" placeholder="Confirm Password" class="input {form?.errors?.passwordConfirm ? 'input-error' :'input-bordered'} max-w-md"/>
            <label for="passwordConfirm" class="label">
                {#if form?.errors?.passwordConfirm}
                    <span class="label-text-alt text-error">{form?.errors?.passwordConfirm[0]}</span>
                {/if}
            </label>
        </div>
        {#if form?.user}
          <div role="alert" class="alert alert-warning">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span>Warning: User  Already Exists!</span>
          </div>
        {/if}

        <div class="form-control w-full max-w-md pt-3">
            <button type="submit" class="btn btn-primary">Register</button>
        </div>
    </form>
    </div>
</div>