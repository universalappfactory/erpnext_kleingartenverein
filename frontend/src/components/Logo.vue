<template>
    <div class="sm:block">
        <img :src="dashboard.userInfo?.data?.default_logo" class="h-24" alt="Logo" />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useSharedDashboard } from '../ts/dashboard';

export default defineComponent({
    name: "Logo",
    setup() {
        const dashboard = useSharedDashboard()
        return {
            dashboard,
        }

    }
});
</script>