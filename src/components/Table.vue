<template>
  <div class="middle-centered">
    <v-card title="Case Ödev" flat>
      <template v-slot:text>
        <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
        ></v-text-field>
      </template>

      <!-- datatable and its headings -->
      <v-data-table
        density="compact"
        :headers="headers"
        class="elevation-1 text-left bg-amber-darken-2 bg-grey-lighten-5 border-md rounded"
        :items="filteredCommunities"
        item-key="name"
        :search="search"
        items-per-page="10"
      >
        <template v-slot:header.checkbox>
          <v-checkbox
            :model-value="allSelected"
            @update:modelValue="toggleSelectAll"
          ></v-checkbox>
        </template>

        <template v-slot:item.checkbox="{ item }">
          <v-checkbox
            :model-value="selectedRows.includes(item.id)"
            @update:modelValue="(value) => toggleSelectRow(item.id, value)"
          ></v-checkbox>
        </template>

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

        <template v-slot:item.Usage="{ item }">
          <div
            class="text-center pa-0 rounded-t-sm rounded-b-sm elevation-0"
            :class="
              item.Usage > 1000 ? 'bg-red-lighten-1' : 'bg-blue-grey-lighten-5'
            "
          >
            {{ item.Usage.toFixed(2) }}
          </div>
        </template>

        <template v-slot:item="{ item }">
          <tr :class="{ 'selected-row': selectedRows.includes(item.id) }">
            <td>
              <v-checkbox
                :model-value="selectedRows.includes(item.id)"
                @update:modelValue="(value) => toggleSelectRow(item.id, value)"
              ></v-checkbox>
            </td>
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.baslik }}</td>
            <td>{{ item.Type }}</td>
            <td>{{ item.startDate }}</td>
            <td>
              <v-btn icon @click="toggleDetails(item.id)">
                <v-icon>{{
                  expandedRows.includes(item.id)
                    ? "mdi-chevron-up"
                    : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </td>
            <td>
              <v-btn
                variant="elevated"
                @click="deleteCommunity(item.id)"
                color="red"
                text="delete"
                class="rounded"
                size="small"
                label
              >
                <v-icon color="white">mdi-bucket</v-icon>
              </v-btn>
            </td>
          </tr>
          <tr v-if="expandedRows.includes(item.id)">
            <td colspan="7">
              <div class="details">
                <div class="profile">
                  <img src="../assets/images/profileicon.png" alt="" />
                  <p>{{ item.name }}</p>
                  <p>{{ item.email }}</p>
                  <p>{{ item.birthDate }}</p>
                  <p>{{ item.phone }}</p>
                </div>
                <div class="description">
                  <h3>{{ item.baslik }}</h3>
                  <p>{{ item.Type }}</p>
                </div>
              </div>
            </td>
          </tr>
        </template>

        <template v-slot:top>
          <v-btn
            color="primary"
            :disabled="selectedRows.length === 0"
            @click="addSelectedUsers"
          >
            Kullanıcı Ekle
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCommunityTableStore } from "@/stores/CommunityTableStore";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const toast = useToast();
const emit = defineEmits(["user-added"]);
const store = useCommunityTableStore();
const router = useRouter();

const headers = [
  { title: "", key: "checkbox", align: "center", sortable: false },
  { title: "ID", key: "id", align: "start" },
  { title: "Name", key: "name", align: "start" },
  { title: "Baslik", key: "baslik", align: "start" },
  { title: "Type", key: "Type", align: "start" },
  { title: "Date", key: "startDate", align: "start" },
];

const search = ref("");
const selectedRows = ref([]);
const expandedRows = ref([]);

// const form = ref({
//   id: null,
//   name: "",
//   location: "",
//   energyType: "",
//   startDate: "",
// });

const addSelectedUsers = () => {
  const selectedUsers = selectedRows.value.map((id) =>
    filteredCommunities.value.find((item) => item.id === id)
  );
  console.log("Selected Users:", selectedUsers);
  emit("user-added", selectedUsers);
  selectedRows.value = [];
  router.push({ name: "Kullanicilar", params: { newUsers: selectedUsers } });
};

const allSelected = computed(() => {
  return selectedRows.value.length === filteredCommunities.value.length;
});

const toggleSelectAll = () => {
  if (allSelected.value) {
    selectedRows.value = [];
  } else {
    selectedRows.value = filteredCommunities.value.map((item) => item.id);
  }
};

const toggleSelectRow = (id, value) => {
  if (value) {
    selectedRows.value.push(id);
  } else {
    selectedRows.value = selectedRows.value.filter((rowId) => rowId !== id);
  }
};

const toggleDetails = (id) => {
  if (expandedRows.value.includes(id)) {
    expandedRows.value = expandedRows.value.filter((rowId) => rowId !== id);
  } else {
    expandedRows.value.push(id);
  }
};

onMounted(async () => {
  await store.getCommunities();
});

// const selectedCommunities = computed(() => store.selectedCommunities);

const deleteCommunity = async (id) => {
  await store.deleteCommunity(id);
  toast.success("Community deleted successfully");
};

const filteredCommunities = computed(() => {
  if (!search.value) {
    return store.communities;
  }
  return store.communities.filter((community) =>
    community.name.toLowerCase().includes(search.value.toLowerCase())
  );
});
</script>

<style scoped>
.middle-centered {
  margin: 0 auto;
  text-align: center;
  width: 80%;
  padding: 10px;
}
.selected-row {
  background-color: #d4edda; /* Yeşil arka plan rengi */
}

.details {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.profile {
  width: 30%;
  text-align: center;
}

.profile img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.description {
  width: 65%;
  text-align: left;
  background-color: #f5f5f5; /* Açık gri arka plan rengi */
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
}

.description h3 {
  margin-top: 0;
}

.description p {
  margin: 0;
}
</style>
