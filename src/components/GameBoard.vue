<template>
  <div class="multi-game-data" v-if="howManyPlayers">
    <game-panel
      v-for="data of howManyPlayers"
      :key="data"
      :playerNumber="3"
      :points="0"
      :turn="1"
    />
  </div>
  <div class="solo-game-data" v-else>
    <solo-data @update:timer="updateTimer($event)"/>
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
  created() {},
  props: ['playerNumber'],
  emits: ['update:timer'],
  computed: {
    howManyPlayers() {
      return this.playerNumber > 1;
    },
  },
  methods: {
    updateTimer(timer) {
      this.$emit('update:timer', timer);
    }
  }
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
