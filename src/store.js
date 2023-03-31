import { createStore } from 'vuex'

export default createStore({
    state: {
        players: [
            {
                'id': '164679',
                'name': 'Руслан',
                'surname': 'Иванов',
                'birthday': '2009-07-07',
            },
            {
                'id': '163246',
                'name': 'Артем',
                'surname': 'Пулов',
                'birthday': '1998-08-09',
            },
            {
                'id': '164535',
                'name': 'Иван',
                'surname': 'Путров',
                'birthday': '2007-04-10',
            },
            {
                'id': '163604',
                'name': 'Александр',
                'surname': 'Назаров',
                'birthday': '2004-10-06',
            },
            {
                'id': '163636',
                'name': 'Иван',
                'surname': 'Киселев',
                'birthday': '2005-10-29',
            },
            {
                'id': '164836',
                'name': 'Ольгерд',
                'surname': 'Ковенко',
                'birthday': '2006-12-25',
            },
            {
                'id': '164101',
                'name': 'Павел',
                'surname': 'Кондратьев',
                'birthday': '1985-10-20',
            },
            {
                'id': '164457',
                'name': 'Иван',
                'surname': 'Ковенко',
                'birthday': '2006-07-18',
            },
            {
                'id': '162937',
                'name': 'Александр',
                'surname': 'Миронов',
                'birthday': '2000-03-29',
            },
            {
                'id': '164009',
                'name': 'Артем',
                'surname': 'Красковский',
                'birthday': '1985-10-20',
            },
        ],
        aboutMeInfo: [
            {
                'Id': '1',
                'key': 'ФИО',
                'value': 'Маргарян Ксения Арсеновна',
            },
            {
                'Id': '2',
                'key': 'Возраст',
                'value': '22 года',
            },
            {
                'Id': '3',
                'key': 'Город проживания',
                'value': 'Новосибирск',
            },
            {
                'Id': '4',
                'key': 'Специализация',
                'value': 'Frontend разработчик',
            },
            {
                'Id': '5',
                'key': 'Интересы',
                'value': 'Кулинария, прогулки, компьютерные игры, животные',
            }
        ],
        groups: [
            {
                'group_id': 1,
                'players_id': []
            },
            {
                'group_id': 2,
                'players_id': []
            },
            {
                'group_id': 3,
                'players_id': []
            },
        ],
        maxPlayersInGroup: 3,
        addedId: '',
        deletedId: '',
        isDataChanged: false,
    },
    getters: {
        /**
         * getter для получения максимального колличества игроков в группе
         */
        getMaxPlayersInGroup: (state) => state.maxPlayersInGroup,
        /**
         * getter для получения информации обо мне
         */
        getAboutMeInfo: (state) => state.aboutMeInfo,
        /**
         * getter для получения списка игроков
         */
        getPlayers: (state) => state.players,
        /**
         * getter находим игрока по id
         */
        getPlayerById: (state) => (id) => {
            return state.players.filter(e => e.id === id)[0]
        },
        /**
         * getter для получения групп
         */
        getGroups: (state) => state.groups,
        /**
         * getter для получения добавленного по id
         */
        getAddedId: (state) => state.addedId,
        /**
         * getter для получения удаленного по id
         */
        getDeletedId: (state) => state.deletedId,
        /**
         * getter для получения флага изменений
         */
        getDataChanged: (state) => state.isDataChanged,
    },
    actions: {

    },
    mutations: {
        /**
         * Метод для добавления игрока в группу и удаление его из списка игроков
         * @param {Object} state
         * @param {Object} player
         */
        addPlayerInGroup(state, player) {
            for (let i = 0; i < state.groups.length; i++) {
                if (state.groups[i].players_id.length < state.maxPlayersInGroup) {
                    state.groups[i].players_id.push({
                        'id': player.id,
                        'name': player.name,
                        'surname': player.surname,
                        'birthday': player.birthday,
                    });
                    //удаление из таблицы игроков
                    this.commit('deleteInPlayerList', player);
                    break;
                }
            }
        },
        /**
         * Метод для удаления игроков из таблицы игроков
         * @param {Object} state
         * @param {Object} player
         */
        deleteInPlayerList(state, player) {
            let playerIndex = state.players.findIndex(e => e.id === player.id);
            state.players.splice(playerIndex, 1);
        },
        /**
         * Метод для удаления игрока из группы и добавления его в список игроков
         * @param {Object} state
         * @param {Object} player
         */
        deleteInGroup(state, player) {
            let playerIndex = state.groups[player.idGroup].players_id.findIndex(e => e.id === player.idPlayer)
            let deletedPlayer = state.groups[player.idGroup].players_id.splice(playerIndex, 1)[0]

            this.commit('addInPlayerList', deletedPlayer);

            this.commit('sortPlayerList');
            //state.isDataChanged = true
            this.commit('toggleDataChanged', true);
        },
        /**
         * Метод для добавления игрока в тоблицу игроков
         * @param {Object} state
         * @param {Object} player
         */
        addInPlayerList(state, player) {
            state.players.push(player);
        },
        /**
         * Метод для сщртировки игроков в таблице игроков
         * @param {Object} state
         */
        sortPlayerList(state) {
            state.players.sort((x, y) => {
                return x.name + x.surname > y.name + y.surname ? 1 : -1;
            });
        },
        /**
         * Метод для изменения флага который показывает изменения данных в группе после сохранения
         * @param {Object} state
         * @param {Object} isDataChanged
         */
        toggleDataChanged(state, isDataChanged) {
            state.isDataChanged = isDataChanged;
        },
    },
});