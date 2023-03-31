<template>
  <div class="table-block">
    <table class="table">
      <thead>
      <tr>
        <th scope="row">№</th>
        <th @click="sortTable('name|surname')">Участник
          <i class="pi pi-sort-alt"
             style="font-size: 1rem"
             v-if="sortedByName === null"></i>
          <i class="pi pi-sort-amount-up-alt"
             style="font-size: 1rem"
             v-else-if="sortedByName === true"></i>
          <i class="pi pi-sort-amount-down"
             style="font-size: 1rem"
             v-else-if="sortedByName === false"></i>
        </th>
        <th @click="sortTable('birthday')">Дата рождения
          <i class="pi pi-sort-alt"
             style="font-size: 1rem"
             v-if="sortedByDate === null"></i>
          <i class="pi pi-sort-amount-up-alt"
             style="font-size: 1rem"
             v-else-if="sortedByDate === true"></i>
          <i class="pi pi-sort-amount-down"
             style="font-size: 1rem"
             v-else-if="sortedByDate === false"></i>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(player, index) in players"
          :key="player.id"
          class="paragraph">
        <td class="number">{{ index + 1 }}</td>
        <td class="name"
            @dblclick="addPlayerInGroup"
            style="cursor: pointer"
            :data-id="player.id">
          {{ player.name }} {{ player.surname }}
        </td>
        <td class="birthday">
          {{ new Date(player.birthday).toLocaleDateString() }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'AppPlayerTable',
  data() {
    return {
      players: [],
      sortedData: [],
      sortedByName: null,
      sortedByDate: null
    }
  },
  /**
   * Актуальный список игроков
   */
  mounted() {
    this.players = this.playersList;
  },
  /**
   * Геттер для получения массива объектов игроков
   * @returns {Array.<Object>}
   */
  computed: {
    playersList() {
      return this.$store.getters.getPlayers
    },
  },
  /**
   * Метод для сортировки игроков внутри таблицы по дате рождения или ФИО
   */
  methods: {
    sortTable(sortBy) {
      if (sortBy === 'birthday') {
        if (this.sortedByDate) {
          this.players.sort((x, y) => (new Date(x[sortBy]) > new Date(y[sortBy]) ? -1 : 1));
          this.sortedByDate = false;
        } else {
          this.players.sort((x, y) => (new Date(x[sortBy]) < new Date(y[sortBy]) ? -1 : 1));
          this.sortedByDate = true;
        }
      } else {
        let name = sortBy.split('|')[0];
        let surname = sortBy.split('|')[1];
        if (this.sortedByName) {
          this.players.sort((x, y) => x[name] + x[surname] > y[name] + y[surname] ? 1 : -1);
          this.sortedByName = false;
        } else {
          this.players.sort((x, y) => x[name] + x[surname] < y[name] + y[surname] ? 1 : -1);
          this.sortedByName = true;
        }
      }
    },
    /**
     * Метод добавления игрока в группу по dblclick
     * @param event
     */
    addPlayerInGroup(event) {
      let id = event.target.getAttribute('data-id');
      this.$store.commit('addPlayerInGroup', this.$store.getters.getPlayerById(id));
    }
  },
}
</script>
