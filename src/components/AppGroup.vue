<template>
  <div
      class="table-block group-table"
      v-for="(group, index) in groups"
      :key="group.group_id"
      :data-group-id="index">
    <table class="table">
      <thead>
      <tr>
        <th>Группа {{ group.group_id }}</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="player in group.players_id"
          :key="player.id">
        <td
            @dblclick="deleteInGroup"
            :data-id="player.id"
            :data-birthday="player.birthday">
          {{ player.name }} {{ player.surname }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'AppGroup',
  components: {},
  computed: {
    /**
     * Геттер для получения массива объектов групп
     * @returns {Array.<Object>}
     */
    groups() {
      return this.$store.getters.getGroups;
    }
  },
  methods: {
    /**
     * Метод для удаления игрока из группы
     * @param event
     */
    deleteInGroup(event) {
      let idPlayer = event.target.getAttribute('data-id');
      let birthday = event.target.getAttribute('data-birthday');
      let idGroup = event.target.closest('.group-table').getAttribute('data-group-id');
      let player = {
        'idPlayer': idPlayer,
        'idGroup': idGroup,
        'birthday': birthday,
      };
      this.$store.commit('deleteInGroup', player);
      this.$store.commit('toggleDataChanged', true);
    }
  }
}
</script>