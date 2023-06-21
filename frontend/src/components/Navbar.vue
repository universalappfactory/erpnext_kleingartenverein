<template>
	<aside id="default-sidebar"
		class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
		aria-label="Sidebar">
		<div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
			<ul class="space-y-2 font-medium">
				<li v-for="item in items" :key="item.displayTitle">
					<template v-if="isRouter(item)">
						<a  @click="navigateTo(item)"
							class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
							<i class="fa text-gray-500 text-6xl" :class="item.icon"></i>
							<span class="ml-3">{{ item.displayTitle }}</span>
						</a>
					</template>
					<template v-else>
						<a  :href="item.href"
							class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
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
export default defineComponent({
	name: "navbar",
	components: {
	},
	methods: {
		navigateTo(item: NavigationItem) {
			if (item.href) {
				this.$router.push(item.href)
			}
		},
		isRouter(item: NavigationItem) : boolean {
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