<template>
  <main class="starter">
    <h1>memory</h1>
    <game-setup @new-setup="onNewSetup"></game-setup>
  </main>
</template>

<script>
import GameSetup from "../components/GameSetup.vue";
export default {
  emits: ["new-setup"],
  components: {
    GameSetup,
  },
  methods: {
    async onNewSetup(newSetup) {
      await this.$store.dispatch("updateSetup", newSetup);
      this.$router.replace("/game");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/_colors";
@import "../sass/_variables";
main {
  min-height: 100%;
  background-color: $black;
  padding: 4.444444rem 1.333333rem 6.444444rem 1.333333rem;

  h1 {
    font-size: 1.777777rem;
    font-style: normal;
    font-weight: bold;
    line-height: 40px;
    color: $white;
    text-align: center;
    margin-bottom: 2.5rem;
  }
}

@media screen and (min-width: $tablet-min) {
  main {
    padding: 9.333333rem 3.166666rem;

    h1 {
      font-size: 2.222222rem;
      line-height: 49.6px;
      margin-bottom: 4.333333rem;
    }
  }
}

@media screen and (min-width: $desktop-min) {
  main {
    padding: 8.555555rem 21.833333rem;

    h1 {
      font-size: 2.222222rem;
      line-height: 49.6px;
      margin-bottom: 4.333333rem;
    }
  }
}
</style>