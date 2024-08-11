import { createRouter, createWebHistory } from "vue-router";
import EnergyCommunityTable from "@/components/Table.vue";
import Kullanicilar from "@/views/Kullanicilar.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: EnergyCommunityTable,
  },
  {
    path: "/kullanicilar",
    name: "Kullanicilar",
    component: Kullanicilar,
    props: (route) => ({ newUsers: route.params.newUsers }),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
