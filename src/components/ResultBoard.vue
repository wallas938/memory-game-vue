<!-- eslint-disable -->
<template>
  <teleport to="body">
    <!-- v-if="openResultBoard" -->
    <div v-if="showResultBoard" class="backdrop"></div>
    <transition name="dialog">
      <dialog
        open
        v-if="showResultBoard"
        :class="{ 'top-solo-mode': !isMulti, 'top-multi-mode': isMulti }"
      >
        <p class="result-title">{{ resultTitle }}</p>
        <p class="result-message">{{ resultMessage }}</p>
        <div v-if="!isMulti" class="datas solo-datas">
          <div class="data">
            <p>Time Elapsed</p>
            <p>{{ timeElapsed }}</p>
          </div>
          <div class="data">
            <p>Moves Taken</p>
            <p>{{ movesTaken }}</p>
          </div>
        </div>
        <div v-else class="datas multi-mode">
          <div
            class="data"
            v-for="player in getPlayers"
            :key="player.playerNumber"
            :class="{ win: winners.includes(player) }"
          >
            <p>Player {{ player.playerNumber }} {{ winners.includes(player) ? '(Winner!)' : '' }}</p>
            <p>{{ player.points * 2 }} Pairs</p>
          </div>
        </div>
        <!-- <div v-else class="datas multi-mode">
          <div class="data win">
            <p>Player 3</p>
            <p>6 Pairs</p>
          </div>
          <div class="data win">
            <p>Player 1</p>
            <p>6 Pairs</p>
          </div>
          <div class="data">
            <p>Player 2</p>
            <p>3 Pairs</p>
          </div>
          <div class="data">
            <p>Player 4</p>
            <p>1 Pairs</p>
          </div>
        </div> -->
        <div class="cta">
          <button id="restart" @click="restart">Restart</button>
          <button id="new-game" @click="setNewGame">Setup New Game</button>
        </div>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: ["isMulti"],
  emits: [
    "update:closeBoard",
    "update:setNewGame",
    "update:restart",
    "upadte:endGame",
  ],
  data() {
    return {
      showResultBoard: false,
    };
  },
  watch: {
    endGame(status) {
      this.showResultBoard = status;
    },
  },
  created() {},
  computed: {
    endGame() {
      return this.$store.getters["endGame"];
    },
    resultTitle() {
      let title = "You did it!";
      switch (this.isMulti) {
        case false: {
          const winning = this.$store.getters["solo/winning"];

          if (winning) {
            title = "You did it!";
          } else {
            title = "Time Over!";
          }
          break;
        }
        case true: {
          const winners = this.$store.getters["multi/winners"];
          if (winners.length > 1) {
            title = "It's a tie!";
          } else {
            title = `Player ${winners[0].playerNumber} Wins!`;
          }
          break;
        }
      }
      return title;
    },
    getPlayers() {
      return this.$store.getters["multi/players"];
    },
    resultMessage() {
      let message;
      if (this.isMulti) {
        message = "Game over! Here are the results...";
      } else {
        message = "Game over! Here's how you got on...";
      }
      return message;
    },
    timeElapsed() {
      const winning = this.$store.getters["solo/winning"];
      let timeElapsed = "2:00";
      if (winning) {
        timeElapsed = this.$store.getters["solo/timeElapsed"];
      }
      return timeElapsed;
    },
    movesTaken() {
      return this.$store.getters["solo/moves"] + " Moves";
    },
    winners() {
      return this.$store.getters["multi/winners"];
    },
  },
  methods: {
    closeBoard() {
      this.showResultBoard = false;
    },
    setNewGame() {
      this.$emit("update:setNewGame");
      this.setEndGame(false);
    },
    restart() {
      this.setEndGame(false);
      this.$emit("update:restart");
      this.closeBoard();
    },
    setEndGame(status) {
      this.$emit("upadte:endGame", status);
    },
  },
};
</script>


<style lang="scss" scoped>
@import "../sass/_colors";
@import "../sass/ui/_mg-button";
@import "../sass/_variables";

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba($color: #000000, $alpha: 0.65);
  z-index: 5;
}
dialog {
  padding: 1.777777rem 1.3333333rem 1.3333333rem 1.3333333rem;
  background-color: $ligth-gray;
  border: none;
  border-radius: 0.555555rem;
  width: 18.166666rem;
  z-index: 10;
  position: absolute;
  //top: 8.111111rem; // for solo
  // top: 5rem; for mutli mode
  left: 50%;
  transform: translateX(-50%);

  &.top-solo-mode {
    top: 8.111111rem;
    @media screen and (min-width: $tablet-min) {
      top: 14.277777rem;
    }
  }

  &.top-multi-mode {
    top: 5rem;
    @media screen and (min-width: $tablet-min) {
      top: 8.944444rem;
    }
  }

  .result-title {
    font-size: 1.333333rem;
    text-align: center;
    margin-bottom: 0.5rem;
    color: $black;
  }

  .result-message {
    font-size: 0.777777rem;
    text-align: center;
    margin-bottom: 1.333333rem;
    color: $blue-gray-2;
  }

  .data {
    //font-size : 0.722222rem
    background-color: $blue-gray-3;
    padding: 0.888888rem;
    border-radius: 0.277777rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p:first-child {
      font-size: 0.777777rem;
      font-weight: 700;
      color: $blue-gray-2;
    }

    p:last-child {
      font-size: 1.111111rem;
      color: $dark-blue;
    }
  }

  .win {
    background-color: $black !important;

    p:first-child {
      color: #fff !important;
    }
    p:last-child {
      color: #fff !important;
    }
  }

  .data:not(:last-child) {
    margin-bottom: 0.444444rem;
  }

  .data:last-child {
    margin-bottom: 1.333333rem;
  }

  .cta {
    display: flex;
    flex-direction: column;

    button {
      @include mg-button;
      width: 15.5rem;
      padding-top: 0.666666rem;
      padding-bottom: 0.777777rem;
      font-size: 1rem;
      line-height: 22.32px;
    }

    button:not(:last-child) {
      margin-bottom: 0.888888rem;
    }

    #restart {
      background-color: $orange;
      color: white;
    }
    #new-game,
    #resume {
      background-color: $blue-gray-3;
      color: $dark-blue;
    }

    #restart:hover {
      background-color: $hovered-orange;
    }

    #new-game:hover,
    #resume:hover {
      background-color: $hovered-blue;
      color: white;
    }
  }
}

@media screen and (min-width: $tablet-min) {
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: rgba($color: #000000, $alpha: 0.65);
    z-index: 5;
  }

  dialog {
    padding: 2.833333rem 3.111111rem 3.833333rem 3.111111rem;
    border-radius: 1.111111rem;
    width: 36.333333rem;
    //top: 8.111111rem; // for solo
    top: 5rem; //for mutli mode

    .result-title {
      font-size: 2.666666rem;
      margin-bottom: 0.888888rem;
    }

    .result-message {
      font-size: 1rem;
      margin-bottom: 2.222222rem;
    }

    .data {
      padding: 0.944444rem 1.777777rem 0.833333rem 1.777777rem;
      border-radius: 0.555555rem;

      p:first-child {
        font-size: 1rem;
      }

      p:last-child {
        font-size: 1.777777rem;
      }
    }

    .data:not(:last-child) {
      margin-bottom: 0.888888rem;
    }

    .data:last-child {
      margin-bottom: 2.222222rem;
    }

    .cta {
      flex-direction: row;
      justify-content: space-between;
      button {
        @include mg-button;
        width: 14.666666rem;
        padding-top: 0.722222rem;
        font-size: 1.111111rem;
        line-height: 24.8px;
      }

      button:not(:last-child) {
        margin-bottom: unset;
      }
    }
  }
}
</style>
