<script lang="ts">
    import type { LayoutData } from './$types';
    
    export let data: LayoutData;
</script>

<nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/character/1">Character 1</a></li>
      <li><a href="/settings">Settings</a></li>
    </ul>
  </nav>
  
  <slot />