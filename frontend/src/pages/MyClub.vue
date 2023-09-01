<template>
    <NavbarComponent />

    <div class="p-4 sm:ml-64 ">

        <div class="m-8 p-4 mb-4 text-lg text-yellow-800 rounded-lg bg-yellow-50" role="alert">
            <span class="font-semibold">{{ $t("myclub.myclub") }}</span>
        </div>

        <template v-if="dashboard.userInfo.data?.email !== ''">
            <div class="m-8 text-lg text-yellow-800 rounded-lg bg-orange-50" role="alert">
                <p class="p-0 m-0" v-html="dashboard.userInfo.data?.dashboard_message">
                </p>
            </div>
        </template>

        <div>
            <div class="m-8 p-4 mb-4 text-lg text-yellow-800 rounded-lg bg-green-50" role="alert">
                <span class="font-semibold">
                    <p>{{ $t("myclub.welcome") }}, {{ dashboard.userInfo.data?.user }}</p>
                </span>
                <p>
                    {{ dashboard.userInfo.data?.email }}
                </p>
            </div>
        </div>

    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import NavbarComponent from "../components/Navbar.vue";
import { useSharedDashboard } from '../ts/dashboard';
import { useDashboardStore } from '../ts/dashboardstore';

export default defineComponent({
    name: "MyClub",
    components: {
        NavbarComponent,
    },

    setup() {
        const dashboard = useSharedDashboard()
        const store = useDashboardStore();
        return {
            store,
            dashboard
        }
    }
});
</script>
