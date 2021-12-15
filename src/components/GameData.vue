<template>
  <div class="multi-game-data" v-if="howManyPlayers">
    <game-panel :playerNumber="1" :points="4" :turn="4" />
    <game-panel :playerNumber="2" :points="4" :turn="4" />
    <game-panel :playerNumber="3" :points="2" :turn="4" />
    <game-panel :playerNumber="4" :points="0" :turn="4" />
  </div>
  <div class="solo-game-data" v-else>
    <solo-data />
  </div>
</template>

<script>
import GamePanel from "./GamePanel.vue";
import SoloData from "./SoloData.vue";
// const maxPlayerNumber = ["one", "two", "three", "four"];
export default {
  components: {
    GamePanel,
    SoloData,
  },
  props: {
    playerNumber: {
      type: Number,
      required: true,
      validator(playerNumber) {
        return playerNumber > 0 && playerNumber <= 4;
      },
    },
  },
  computed: {
    howManyPlayers() {
      return this.playerNumber > 1;
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
