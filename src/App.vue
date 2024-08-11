<template>
  <v-app>
    <v-card>
      <v-layout>
        <v-navigation-drawer expand-on-hover rail>
          <v-divider></v-divider>

          <v-list density="compact" nav>
            <router-link to="/">
              <v-list-item
                prepend-icon="mdi-home"
                class="nav-icon-dark-gray"
                title="Gönderiler"
                value="Gönderiler"
              >
              </v-list-item>
            </router-link>

            <router-link to="/kullanicilar">
              <v-list-item
                prepend-icon="mdi-account"
                class="nav-icon-dark-gray"
                title="Kullanıcılar"
                value="Kullanıcılar"
              >
              </v-list-item>
            </router-link>
          </v-list>
        </v-navigation-drawer>

        <v-main>
          <router-view @user-added="handleUserAdded" :newUsers="newUsers" />
        </v-main>
      </v-layout>
    </v-card>
  </v-app>
</template>

<script setup>
import { ref } from "vue";

const newUsers = ref([]);

const handleUserAdded = (users) => {
  newUsers.value = [...newUsers.value, ...users];
};
</script>

<style>
.nav-icon-dark-gray {
  color: darkslategray !important;
}
</style>
