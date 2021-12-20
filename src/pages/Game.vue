<!-- eslint-disable -->
<template>
  <main id="game">
    <header id="game__header">
      <p>memory</p>
      <button class="menu hide-for-tablet-and-desktop">Menu</button>
      <div class="cta hide-for-mobile">
        <button class="restart">Restart</button>
        <button class="new-game">New Game</button>
      </div>
    </header>
    <section id="game-container">
      <!-- Utiliser le composant Tile comme ça : <Tile /> -->
      <section id="game__grid" :class="gridSize">
        <tile
          v-for="(data, index) in gameDatas"
          :key="index"
          :value="data"
          :index="index"
          :isMulti="isMulti"
          :twoLastPicks="twoLastPicks"
          @update:current-pick="handlePick"
          @update:empty-two-last-picks="emptyTwoLastPicks"
          @update:update-moves="updateMoves"
          @update:endGame="updateEndGame"
        ></tile>
      </section>
      <section id="game__datas" :class="{ 'datas--size': !isMulti }">
        <GameBoard @update:timer="updateTimer($event)" />
      </section>
    </section>
  </main>
</template>

<script>
import _shuffle from "lodash/shuffle";
import Tile from "../components/Tile.vue";
import GameBoard from "../components/GameBoard.vue";

export default {
  components: {
    Tile,
    GameBoard,
  },
  data() {
    return {
      gameDatas: [],
    };
  },
  created() {
    this.gameDatas = this.setDatas(this.$store.getters["theme"]);
  },
  watch: {
  },
  computed: {
    theme() {
      return this.setup.theme;
    },
    gridSize() {
      return this.$store.getters["gridSize"];
    },
    soloMatches() {
      return this.$store.getters["solo/matches"];
    },
    multiMatches() {
      return this.$store.getters["multi/matches"];
    },
    matches() {
      return this.isMulti ? this.multiMatches : this.soloMatches;
    },
    attempts() {
      return !this.isMulti
        ? this.$store.getters["solo/attempts"]
        : this.$store.getters["multi/attempts"];
    },
    soloTwoLastPicks() {
      return this.$store.getters["solo/twoLastPicks"];
    },
    multiTwoLastPicks() {
      return this.$store.getters["multi/twoLastPicks"];
    },
    twoLastPicks() {
      return this.isMulti ? this.multiTwoLastPicks : this.soloTwoLastPicks;
    },
    currentTurn() {
      return this.$store.getters["multi/currentTurn"];
    },
    isMulti() {
      return this.$store.getters["multi/players"].length > 1;
    },
  },
  methods: {
    setDatas(theme) {
      if (theme === "numbers") {
        return this.setNumbers();
      } else {
        return this.setIcons();
      }
    },
    setNumbers() {
      if (this.gridSize === "fourTimesFour") {
        return _shuffle([
          "1",
          "1",
          "2",
          "2",
          "3",
          "3",
          "4",
          "4",
          "5",
          "5",
          "6",
          "6",
          "7",
          "7",
          "8",
          "8",
        ]);
      }
      return _shuffle([
        "1",
        "1",
        "2",
        "2",
        "3",
        "3",
        "4",
        "4",
        "5",
        "5",
        "6",
        "6",
        "7",
        "7",
        "8",
        "8",
        "9",
        "9",
        "10",
        "10",
        "11",
        "11",
        "12",
        "12",
        "13",
        "13",
        "14",
        "14",
        "15",
        "15",
        "16",
        "16",
        "17",
        "17",
        "18",
        "18",
      ]);
    },
    setIcons() {
      if (this.gridSize === "fourTimesFour") {
        return _shuffle([
          '<i class="fas fa-futbol"></i>',
          '<i class="fas fa-futbol"></i>',
          '<i class="fas fa-anchor"></i>',
          '<i class="fas fa-anchor"></i>',
          '<i class="fas fa-flask"></i>',
          '<i class="fas fa-flask"></i>',
          '<i class="fas fa-sun"></i>',
          '<i class="fas fa-sun"></i>',
          '<i class="fas fa-hand-spock"></i>',
          '<i class="fas fa-hand-spock"></i>',
          '<i class="fas fa-bug"></i>',
          '<i class="fas fa-bug"></i>',
          '<i class="far fa-moon"></i>',
          '<i class="far fa-moon"></i>',
          '<i class="far fa-snowflake"></i>',
          '<i class="far fa-snowflake"></i>',
        ]);
      } else {
        return _shuffle([
          '<i class="fas fa-futbol"></i>',
          '<i class="fas fa-futbol"></i>',
          '<i class="fas fa-anchor"></i>',
          '<i class="fas fa-anchor"></i>',
          '<i class="fas fa-flask"></i>',
          '<i class="fas fa-flask"></i>',
          '<i class="fas fa-sun"></i>',
          '<i class="fas fa-sun"></i>',
          '<i class="fas fa-hand-spock"></i>',
          '<i class="fas fa-hand-spock"></i>',
          '<i class="fas fa-bug"></i>',
          '<i class="fas fa-bug"></i>',
          '<i class="far fa-moon"></i>',
          '<i class="far fa-moon"></i>',
          '<i class="far fa-snowflake"></i>',
          '<i class="far fa-snowflake"></i>',
          '<i class="fas fa-lira-sign"></i>',
          '<i class="fas fa-lira-sign"></i>',
          '<i class="fab fa-accessible-icon"></i>',
          '<i class="fab fa-accessible-icon"></i>',
          '<i class="far fa-angry"></i>',
          '<i class="far fa-angry"></i>',
          '<i class="fas fa-arrow-down"></i>',
          '<i class="fas fa-arrow-down"></i>',
          '<i class="fas fa-arrow-up"></i>',
          '<i class="fas fa-arrow-up"></i>',
          '<i class="fas fa-baseball-ball"></i>',
          '<i class="fas fa-baseball-ball"></i>',
          '<i class="fas fa-book-dead"></i>',
          '<i class="fas fa-book-dead"></i>',
          '<i class="fas fa-bullseye"></i>',
          '<i class="fas fa-bullseye"></i>',
          '<i class="fas fa-bullseye"></i>',
          '<i class="fas fa-bullseye"></i>',
          '<i class="far fa-building"></i>',
          '<i class="far fa-building"></i>',
        ]);
      }
    },
    handlePick($event) {
      if (!this.isMulti) {
        this.$store.dispatch("solo/updateAttempts", { attempt: 1 });
        this.$store.dispatch("solo/updateCurrentPick", { currentPick: $event });
        return;
      }
      this.$store.dispatch("multi/updateAttempts", { attempt: 1 });
      this.$store.dispatch("multi/updateCurrentPick", { currentPick: $event });
    },
    updateMoves() {
      this.$store.dispatch("solo/updateMoves");
    },
    emptyTwoLastPicks() {
      if (!this.isMulti) {
        this.$store.dispatch("solo/updateAttempts", { attempt: 1 });
        this.$store.dispatch("solo/emptyTwoLastPicks");
        return;
      }
      this.$store.dispatch("multi/updateAttempts", { attempt: 1 });
      this.$store.dispatch("multi/emptyTwoLastPicks");
    },
    updateEndGame() {
      this.$store.dispatch("updateEndGame");
    },
    updateTimer(timer) {
      this.$store.dispatch("solo/updateTimer", { timer: timer });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/_colors";
@import "../sass/ui/_mg-button";
@import "../sass/_variables";

#game {
  padding: 1.333333rem;
  header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 4.444444rem;

    p {
      font-style: normal;
      font-weight: bold;
      font-size: 1.333333rem;
      line-height: 30px;
      color: $black;
    }

    button {
      @include mg-button;
    }

    .menu {
      background-color: $orange;
      padding: 0.555555rem 1.027777rem;
    }

    button:hover {
      background-color: $hovered-orange;
    }
  }

  #game-container {
    width: fit-content;
    margin: 0 auto;
    #game__grid {
      width: 100%;
      display: grid;
      margin-bottom: 5.222222rem;
      justify-content: center;
    }

    .fourTimesFour {
      grid-template-columns: repeat(4, min-content);
      grid-template-rows: repeat(4, min-content);
      row-gap: 0.682777rem;
      column-gap: 0.682777rem;
    }

    .sixTimesSix {
      grid-template-columns: repeat(6, min-content);
      grid-template-rows: repeat(6, min-content);
      row-gap: 0.506666rem;
      column-gap: 0.506666rem;
    }
  }
}

@media screen and (min-width: $tablet-min) {
  #game {
    padding: 2.111111rem 2.222222rem;
    header {
      padding-bottom: 6.722222rem;

      p {
        font-size: 2.222222rem;
        line-height: 49.6px;
        color: $black;
      }

      button {
        font-size: 1.111111rem;
      }

      .restart {
        background-color: $orange;
        color: white;
        margin-right: 0.888888rem;
        padding: 0.777777rem 1.555555rem;

        &:hover {
          background-color: $hovered-orange;
        }
      }

      .new-game {
        background-color: $blue-gray-3;
        padding: 0.777777rem 1.333333rem;
        color: $dark-blue;

        &:hover {
          background-color: $hovered-blue;
          color: white;
        }
      }

      button:hover {
        background-color: $hovered-orange;
      }
    }

    #game__grid {
      margin-bottom: 6.222222rem;
    }

    .fourTimesFour {
      row-gap: 1.111111rem !important;
      column-gap: 1.111111rem !important;
    }

    .sixTimesSix {
      row-gap: 0.888888rem !important;
      column-gap: 0.888888rem !important;
    }
  }

  /** Taille de la section data à 540px si joueur unique */
  .datas--size {
    max-width: 30rem;
    margin: 0 auto;
  }
}

@media screen and (min-width: $desktop-min) {
  #game {
    padding: 3.722222rem 9.166666rem;
    header {
      padding-bottom: 6.722222rem;

      p {
        font-size: 2.222222rem;
        line-height: 49.6px;
        color: $black;
      }

      button {
        font-size: 1.111111rem;
      }

      .restart {
        background-color: $orange;
        color: white;
        margin-right: 0.888888rem;
        padding: 0.777777rem 1.555555rem;

        &:hover {
          background-color: $hovered-orange;
        }
      }

      .new-game {
        background-color: $blue-gray-3;
        padding: 0.777777rem 1.333333rem;
        color: $dark-blue;

        &:hover {
          background-color: $hovered-blue;
          color: white;
        }
      }

      button:hover {
        background-color: $hovered-orange;
      }
    }

    #game__grid {
      margin-bottom: 6.222222rem;
    }
  }
}
</style>
