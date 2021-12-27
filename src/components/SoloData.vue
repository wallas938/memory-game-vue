<template>
  <div id="solo-data">
    <section class="timer">
      <p>Time</p>
      <span>{{ getTimer }}</span>
    </section>
    <section class="moves">
      <p>Moves</p>
      <span>{{ moves }}</span>
    </section>
  </div>
</template>

<script>
export default {
  inject: ["pause", "updateTimeElapsed", "updateEndGame", "updateWinning"],
  data() {
    return {
      timer: "2:00",
      defaultTime: new Date(120000), // 120000 = 2min
      minusTime: 0,
      timerInterval: null,
      currentTime: null,
    };
  },
  created() {
    this.startTimer(this.defaultTime);
  },
  computed: {
    getTimer() {
      return this.timer;
    },
    matches() {
      return this.$store.getters["solo/matches"];
    },
    moves() {
      return this.$store.getters["solo/moves"];
    },
    endGame() {
      return this.$store.getters["endGame"];
    },
    restart() {
      return this.$store.getters["restart"];
    },
    winning() {
      return this.$store.getters["winning"];
    },
  },
  watch: {
    timer(time) {
      if (time === "0:00") {
        this.updateTimeElapsed(this.getElapsedTime());
        this.stopTimer();
        this.updateEndGame(true);
        this.updateWinning(false);
      }
    },
    pause(status) {
      if (status) {
        this.stopTimer();
      } else {
        this.restart && this.startTimer(this.currentTime);
      }
    },
    restart(status) {
      if (status) {
        this.resetTimer();
        this.stopTimer();
        this.startTimer(this.defaultTime);
      }
    },
    endGame(status) {
      if (status) {
        this.updateTimeElapsed(this.getElapsedTime());
        this.stopTimer();
      }
    },
    winning(status) {
      if (status) {
        this.updateTimeElapsed(this.getElapsedTime());
        this.stopTimer();
      }
    },
  },
  methods: {
    startTimer(time) {
      this.timerInterval = setInterval(() => {
        this.timer =
          new Date(time - this.minusTime).getMinutes().toString() +
          ":" +
          (new Date(time - this.minusTime).getSeconds().toString().length <= 1
            ? "0" + new Date(time - this.minusTime).getSeconds().toString()
            : new Date(time - this.minusTime).getSeconds().toString());
        this.minusTime += 1000;
        this.currentTime = time - this.minusTime;
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
      this.minusTime = 0;
    },
    resetTimer() {
      this.timer = "2:00";
    },
    getElapsedTime() {
      const timeElapsed =
        new Date(this.minusTime - 1000).getMinutes().toString() +
        ":" +
        (new Date(this.minusTime - 1000).getSeconds().toString().length <= 1
          ? "0" + new Date(this.minusTime - 1000).getSeconds().toString()
          : new Date(this.minusTime - 1000).getSeconds().toString());
      return timeElapsed;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/_colors";
@import "../sass/_variables";
#solo-data {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .timer,
  .moves {
    padding: 0.555555rem 2.747777rem;
    background-color: $blue-gray-3;
    text-align: center;
    border-radius: 0.277777rem;
    p {
      margin-bottom: 0.111111rem;
      font-weight: bold;
      font-style: normal;
      font-size: 0.833333rem;
      line-height: 18.6px;
      color: $blue-gray-2;
    }
    span {
      color: $dark-blue;
      font-weight: bold;
      font-style: normal;
      line-height: 29.76px;
      font-size: 1.333333rem;
    }
  }
}

@media screen and (min-width: $tablet-min) {
  #solo-data {
    .timer,
    .moves {
      padding: 0.944444rem 1.333333rem 0.8333333rem 1.166666rem;
      width: 14.166666rem;
      p {
        margin-bottom: unset;
        font-size: 1rem;
        line-height: 22.32px;
      }
      span {
        line-height: 39.68px;
        font-size: 1.777777rem;
      }
    }

    .timer,
    .moves {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
