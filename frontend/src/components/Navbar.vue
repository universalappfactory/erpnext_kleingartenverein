<template>
	<button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar"
		data-drawer-backdrop="false" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 
		">
		<span class="sr-only">Open sidebar</span>
		<svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
			<path clip-rule="evenodd" fill-rule="evenodd"
				d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
			</path>
		</svg>
	</button>

	<aside id="default-sidebar"
		class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" 
		tabindex="-1"
		aria-labelledby="drawer-backdrop-label">

		<div class="h-full px-3 py-4 overflow-y-auto bg-gray-50">
			<h5 id="drawer-disabled-backdrop-label"
				class="text-base font-semibold text-gray-500 uppercase ml-5 mb-4">Menu</h5>
			<button type="button" data-drawer-hide="default-sidebar" aria-controls="default-sidebar"
				class="block md:hidden text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center">
				<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clip-rule="evenodd"></path>
				</svg>
				<span class="sr-only">Close menu</span>
			</button>
			<ul class="space-y-2 font-medium">
				<li v-for="item in dashboard.navigation.data" :key="item.displayTitle">
					<template v-if="isRouter(item)">
						<a @click="navigateTo(item)"
							class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
							<i class=" text-gray-500 text-6xl" fa :class="item.icon"></i>
							<div class="ml-3">{{ item.displayTitle }}
								<div class="text-sm
									relative
									inline-flex 
									items-center 
									justify-center 
									w-6 
									h-6 
									text-xs 
									font-bold 
									text-white 
									bg-red-500 
									border-2 
									border-white 
									rounded-full 
									-top-2
									-right-30 
									dark:border-gray-900">20</div>	
							</div>
							
						</a>
					</template>
					<template v-else>
						<a :href="item.href" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
							<i class="fa text-gray-500 text-6xl" :class="item.icon"></i>
							<span class="ml-3">{{ item.displayTitle }}</span>
						</a>
					</template>
				</li>
			</ul>
		</div>
	</aside>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { NavigationItem, NavigationMode } from '../ts/navigation';
import { useDashboard } from '../ts/dashboard.ts'
export default defineComponent({
	name: "navbar",
	components: {
	},
	setup() {
		const dashboard = useDashboard();
		return {
			dashboard
		}
	},
	methods: {
		navigateTo(item: NavigationItem) {
			if (item.href) {
				this.$router.push(item.href)
			}
		},
		isRouter(item: NavigationItem): boolean {
			return item.mode == NavigationMode.Router
		}
	},
	data() {

		const items: NavigationItem[] = [
			{
				displayTitle: "Zum Desk",
				href: "/app/",
				icon: "fa-desktop",
				mode: NavigationMode.External
			},
			{
				displayTitle: "Zur Homepage",
				href: "/",
				icon: "fa-globe",
				mode: NavigationMode.External
			},
			{
				displayTitle: "Dashboard",
				href: "/dashboard",
				icon: "fa-home",
				mode: NavigationMode.External
			},
			{
				displayTitle: "Pächter",
				href: "/paechter",
				icon: "fa-list",
				mode: NavigationMode.Router
			},
			{
				displayTitle: "Kalender",
				href: "/calendar",
				icon: "fa-list",
				mode: NavigationMode.Router
			},
			{
				displayTitle: "Drive",
				href: "/drive",
				icon: "fa-list",
				mode: NavigationMode.External
			},
			{
				displayTitle: "Logout",
				href: "/logout",
				icon: "fa-sign",
				mode: NavigationMode.External
			}
		]

		return {
			items
		}
	},

	mounted() {
	}
});
</script>