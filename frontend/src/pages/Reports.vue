<template>
  <div class="p-4 sm:ml-64">
    <PageHeadline messageId="reports.headline" />

    <template v-if="pageInfo.withError">
      <Alert type="warning" class="mb-2 mt-4">
        {{ $t("new_letter.error_while_shipping") }}
      </Alert>
    </template>

    <div class="mt-6">
      <ListComponent
        :items="items"
        @showDetails="showDetails"
        :hasNext="pageInfo.hasNext"
        @loadMore="next()"
        :headerList="[$t('reports.headline')]"
      >
        <template #item="{ name }">
          <div class="flex p-4">
            <div class="grow">{{ name }}</div>
            <div>
              <a
                :href="`/app/query-report/${name}`"
                target="_blank"
                type="button"
                :class="
                  mobile_no
                    ? 'text-blue-700 hover:bg-blue-700 border border-blue-700  hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 '
                    : 'border border-gray-300  bg-gray-100'
                "
                class="disabled:opacity-75 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
              >
                <i class="fa fa-external-link" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </template>
      </ListComponent>
      <a :href="openLink" class="hidden" target="_blank" ref="openLinkAnchor" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useList } from "../ts/list";
import Button from "../components/Button.vue";
import ListComponent from "../components/ListComponent.vue";
import PageHeadline from "../components/PageHeadline.vue";
import { Badge, Input, Alert } from "flowbite-vue";

const openLinkAnchor = ref();
const openLink = ref("");

const { fetch, previous, next, items, pageInfo } = useList({
  docType: "Report",
  filters: {
    _user_tags: ["like", "%Dashboard"],
  },
});

onMounted(async () => {
  await fetch();
});

const showDetails = (item) => {
  console.log("x", item.name);
  openLink.value = `${location.host}/app/query-report/${item.name}`;
  openLinkAnchor.value.click();
};
</script>

<style scoped>
button {
  font-weight: bold;
}
</style>
