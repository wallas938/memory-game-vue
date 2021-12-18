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
  emits: ['update:timer'],
  data() {
    return {
      timer: "2:00",
      startAt: new Date(new Date(120000)), // 2min
      minusTime: 0,
      timerInterval: null,
    };
  },
  created() {
    this.startTimer();
  },
  methods: {
    startTimer() {
      this.timerInterval = setInterval(() => {
        this.timer =
          new Date(this.startAt - this.minusTime).getMinutes().toString() +
          ":" +
          (new Date(this.startAt - this.minusTime).getSeconds().toString()
            .length <= 1
            ? "0" +
              new Date(this.startAt - this.minusTime).getSeconds().toString()
            : new Date(this.startAt - this.minusTime).getSeconds().toString());
        this.updateMinusTime();
      }, 1000);
    },
    updateMinusTime() {
      this.minusTime += 1000;
    },
    stopTimer() {
      clearInterval(this.timerInterval);
    },
  },
  computed: {
    getTimer() {
      return this.timer;
    },
    matches() {
      return this.$store.getters['solo/matches'];
    },
    moves() {
      return this.$store.getters['solo/moves'];
    },
    endGame() {
      return this.$store.getters['endGame'];
    }
  },
  watch: {
    timer(time) {
      if (time === "0:00") {
        this.stopTimer();
      }
    },
    endGame(status) {
      if (status) {
        this.stopTimer();
        this.$emit('update:timer', this.timer);
      }
    }
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
