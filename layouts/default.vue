<template>
  <div font-mono>
    <n-message-provider>
      <n-notification-provider>
        <n-loading-bar-provider>
          <n-dialog-provider>
            <HeadBanner />
            <main class="p-10 text-center">
              <slot />
              <Footer />
            </main>
          </n-dialog-provider>
        </n-loading-bar-provider>
      </n-notification-provider>
    </n-message-provider>
  </div>
</template>
