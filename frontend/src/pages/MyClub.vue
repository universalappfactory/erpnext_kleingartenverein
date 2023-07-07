<template>
    <NavbarComponent />

    <div class="p-4 sm:ml-64">

        <div class="m-8 p-4 mb-4 text-lg text-yellow-800 rounded-lg bg-yellow-50" role="alert">
            <span class="font-semibold">Info</span>
            <p>
                Mein Kleingartenverein
            </p>
            <p>
                Leider gibt es hier noch nicht sonderlich viel zu sehen :)
            </p>
        </div>

        <div>
            <div class="m-8 p-4 mb-4 text-lg text-yellow-800 rounded-lg bg-green-50" role="alert">
            <span class="font-semibold"><p>Hallo, {{ dashboard.userInfo.data.user }}</p></span>
            <p>
                {{ dashboard.userInfo.data.email }}
            </p>
        </div>
        </div>
        
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { initFlowbite } from 'flowbite'

import NavbarComponent from "../components/Navbar.vue";
import FooterComponent from "../components/Footer.vue";
import GridTable from "../components/GridTable.vue";
import { Dropdown } from 'frappe-ui'
import { Alert, Button, createListResource } from 'frappe-ui'
import { useSharedDashboard } from '../ts/dashboard';

export default defineComponent({
    name: "MyClub",
    components: {
        NavbarComponent,
        FooterComponent,
        Dropdown,
        Alert,
        Button,
        GridTable
    },

    methods: {
        loadMoreData() {
            console.log('LoadMore')
            this.tenants.next();
        }
    },
    setup() {
        const dashboard = useSharedDashboard();
        return {
            dashboard
        }
    },
    mounted() {
        initFlowbite();
    }
});
</script>
