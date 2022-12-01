<script setup lang="ts">
const buildTime = __BUILD_TIME__

const timeAgo = useTimeAgo(new Date(buildTime))
</script>

<template>
  <footer text-center text-sm pt-8 pb-6>
    <p color-fade font-sans>
      built by <span>HDW</span>
    </p>
    <div color-fade mt-1 op50 italic>
      Last update: {{ buildTime }} ({{ timeAgo }})
    </div>
  </footer>
</template>
