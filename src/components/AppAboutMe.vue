<template>
  <img
      alt="Vue logo"
      src="../assets/cat.jpg">
  <div class="me-info-block">
    <div
        v-for="item in AboutMeInfo"
        :key="item.id"
        class="info">
    <span
        class="item-key">
      {{ item.key }}:
    </span>
      <span
          class="item-value">
      {{ item.value }}
    </span>
    </div>
  </div>
  <router-link to="/task">
    <app-button>
      <template #default>Переидти</template>
    </app-button>
  </router-link>
</template>

<script>
import AppButton from "./AppButton";

export default {
  name: 'AppAboutMe',
  components: {
    AppButton,
  },
  computed: {
    /**
     * Геттер для получения массива объектов с информацией обо мне
     * @returns {Array.<Object>}
     */
    AboutMeInfo() {
      return this.$store.getters.getAboutMeInfo;
    },
  }
}
</script>