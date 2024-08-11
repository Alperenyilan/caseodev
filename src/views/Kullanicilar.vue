<template>
  <div class="middle-centered">
    <v-card title="Kullanıcılar" flat>
      <v-data-table
        density="compact"
        :headers="headers"
        class="elevation-1 text-left bg-amber-darken-2 bg-grey-lighten-5 border-md rounded"
        :items="filteredUsers"
        item-key="name"
        items-per-page="10"
      >
        <template v-slot:header.id>
          <div class="font-weight-bold">ID</div>
        </template>

        <template v-slot:header.name>
          <div class="font-weight-bold">İsim</div>
        </template>

        <template v-slot:header.baslik>
          <div class="font-weight-bold">Başlık</div>
        </template>

        <template v-slot:header.Type>
          <div class="font-weight-bold">Kategori</div>
        </template>

        <template v-slot:header.startDate>
          <div class="font-weight-bold">Tarih</div>
        </template>

        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.baslik }}</td>
            <td>{{ item.Type }}</td>
            <td>{{ item.startDate }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useCommunityTableStore } from "@/stores/CommunityTableStore";

const props = defineProps(["newUsers"]);
const store = useCommunityTableStore();
const headers = [
  { title: "ID", key: "id", align: "start" },
  { title: "Name", key: "name", align: "start" },
  { title: "Baslik", key: "baslik", align: "start" },
  { title: "Type", key: "Type", align: "start" },
  { title: "Date", key: "startDate", align: "start" },
];

const users = ref([]);

const filteredUsers = computed(() => users.value);

watch(
  () => props.newUsers,
  (newUsers) => {
    if (newUsers && newUsers.length > 0) {
      users.value.push(...newUsers);
    }
  },
  { immediate: true }
);

onMounted(async () => {
  await store.getCommunities();
});
</script>

<style scoped>
.middle-centered {
  margin: 0 auto;
  text-align: center;
  width: 80%;
  padding: 10px;
}
</style>
