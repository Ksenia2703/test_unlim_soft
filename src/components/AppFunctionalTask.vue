<template>
  <div class="card">
    <MyButton
        label="Вернуться на главную"
        icon="pi pi-external-link"
        @click="checkSaveChangedGroups"
        class="btn">
      Вернуться на главную
    </MyButton>
    <MyDialog
        v-model:visible="visible"
        modal header="Предупреждение!"
        :style="{ width: '50vw' }">
      <p>
        Необходимо сохранить внесенные изменения
      </p>
      <template #footer>
        <router-link to="/">
          <MyButton
              label="Success"
              severity="success"
              @click="saveDataAndCloseDialog()"
              icon="pi pi-times"
              style="backgroundColor: var(--green-400)">
            Сохранить
          </MyButton>
        </router-link>
        <MyButton
            label="Yes"
            icon="pi pi-check"
            @click="visible = false"
            style="backgroundColor: var(--red-400)">
          Отменить
        </MyButton>
      </template>
    </MyDialog>
  </div>
  <app-player-table></app-player-table>
  <div class="groups-table-wrapper">
    <app-group></app-group>
  </div>
  <app-button
      class="btn"
      :disabled="!isGroupsFull"
      @click="savePlayers">
    <template #default>Сохранить</template>
  </app-button>
  <MyToast/>
</template>

<script>
import AppPlayerTable from './AppPlayerTable';
import AppGroup from './AppGroup';
import AppButton from './AppButton';
import router from '../router';

export default {
  name: 'AppFunctionalTask',
  components: {
    AppPlayerTable,
    AppGroup,
    AppButton,
  },
  data() {
    return {
      visible: false,
      isValid: false,
    };
  },
  methods: {
    /**
     * После успешного сохранения показывае toast сообщение
     */
    saveDataAndCloseDialog() {
      this.$toast.add({severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000});
    },
    /**
     * Метод для проверки наполнености групп
     */
    checkGroups() {
      let group = this.$store.getters.getGroups;
      let maxPlayersInGroup = this.$store.getters.getMaxPlayersInGroup;
      for (let i = 0; i < group.length; i++) {
        if (group[i].players_id.length !== maxPlayersInGroup) {
          this.isValid = false;
          break;
        } else {
          this.isValid = true;
        }
      }
    },
    /**
     * После успешного сохранения показывае toast сообщение и меняет флаг и подготавливаем данные для отправки на сервер
     */
    savePlayers() {
      let prepareData = [];
      this.$toast.add({severity: 'success', summary: 'Успешно!', detail: 'Данные успешно сохранены', life: 3000});
      let groups = this.$store.getters.getGroups;
      for (let i = 0; i < groups.length; i++) {
        let playersInGroup = groups[i].players_id;
        for (let j = 0; j < playersInGroup.length; j++) {
          prepareData.push({
            'player_id': playersInGroup[j].id,
            'group_id': groups[i].group_id,
          });
        }
      }
      // подготовленные данные для отправки на сервер
      console.log(prepareData)
      this.isDataChanged = true;
    },
    /**
     * Метод для проверки наличия изменений данных в группах и перехода на главную страницу
     */
    checkSaveChangedGroups() {
      if (this.isValid && this.$store.getters.getDataChanged) {
        this.visible = true;
      } else {
        router.push('/');
      }
    }
  },
  computed: {
    /**
     * Геттер для получения массива объектов групп
     * @returns {Array.<Object>}
     */
    groups() {
      return this.$store.getters.getGroups;
    },
    /**
     * Проверяет на заполненность групп
     * @returns {Boolean}
     */
    isGroupsFull() {
      this.checkGroups();
      return this.isValid;
    },
  }
}
</script>
