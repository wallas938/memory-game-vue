<template>
  <div class="multi-game-data" v-if="isMulti">
    <game-panel
      v-for="(player, idx) of players"
      :key="idx"
      :playerNumber="player._playerNumber"
      :points="player._points"
      :currentTurn="currentTurn === player._playerNumber"
    />
  </div>
  <div class="solo-game-data" v-else>
    <solo-data @update:timer="updateTimer($event)" />
  </div>
</template>

<script>
import GamePanel from "./GamePanel.vue";
import SoloData from "./SoloData.vue";
export default {
  components: {
    GamePanel,
    SoloData,
  },
  created() {
  },
  emits: ["update:timer"],
  computed: {
    isMulti() {
      return this.players.length > 1;
    },
    players() {
      return this.$store.getters["multi/players"];
    },
    currentTurn() {
      return this.$store.getters["multi/currentTurn"];
    }
  },
  methods: {
    updateTimer(timer) {
      this.$emit("update:timer", timer);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/_colors";
@import "../sass/_variables";

.multi-game-data {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media screen and (min-width: $tablet-min) {
  .multi-game-data {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

@media screen and (min-width: $desktop-min) {
}
</style>
