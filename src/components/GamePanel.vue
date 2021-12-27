<template>
  <div
    class="panel"
    :class="{ 'turn-to-play': checkCurrentTurn, 'waiting': !checkCurrentTurn }">
    <p class="player-number">
      <span class="hide-for-tablet-and-desktop">P{{ playerNumber }}</span>
      <span class="hide-for-mobile">Player {{ playerNumber }}</span>
    </p>
    <p class="player-points">
      <span>{{ points }}</span>
    </p>
    <p v-if="checkCurrentTurn" class="current-turn-txt hide-for-mobile hide-for-tablet">CURRENT TRUN</p>
  </div>
</template>

<script>
export default {
  props: {
    playerNumber: {
      type: Number,
      required: true,
      Validator(playerNumber) {
        return playerNumber > 0 && playerNumber <= 4;
      },
    },
    currentTurn: {
      type: Boolean,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
  },
  // emits: ["update:currentTurn"],
  computed: {
    checkCurrentTurn() {
      return this.currentTurn;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/_colors";
@import "../sass/_variables";

.panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.555555rem 1.444444rem;
  border-radius: 0.277777rem;
  position: relative;

  .player-number {
    margin-bottom: 0.111111rem;
    font-weight: bold;
    font-style: normal;
    font-size: 0.833333rem;
    line-height: 18.6px;
  }

  .player-points {
    font-weight: bold;
    font-style: normal;
    line-height: 29.76px;
    font-size: 1.333333rem;
  }
}

.turn-to-play {
  background-color: $orange;
  &::before {
    content: "";
    position: absolute;
    width: 0.888888rem;
    height: 0.444444rem;
    top: -0.4rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: $orange;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }
  .player-number,
  .player-points {
    color: $white;
  }
}

.waiting {
  background-color: $blue-gray-3;

  .player-number {
    color: $blue-gray-2;
  }
  .player-points {
    color: $dark-blue;
  }
}

@media screen and (min-width: $tablet-min) {
  .panel {
    padding: 0.777777rem 0 0.666666rem 0.888888rem;
    border-radius: 0.555555rem;
    position: relative;
    width: 9.111111rem;

    &:not(:last-child) {
      margin-right: 0.6111111rem;
    }
    .player-number {
      margin-bottom: 0.277777rem;
    }
  }

  .turn-to-play {
    background-color: $orange;
    &::before {
      width: 1.333333rem;
      height: 0.666666rem;
      top: -0.65rem;
    }
  }
}

@media screen and (min-width: $desktop-min) {
  .panel {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1.388888rem 0.833333rem;
    width: 14.166666rem;
    &:not(:last-child) {
      margin-right: 1.666666rem;
    }
    .player-number {
      margin-bottom: 0.277777rem;
    }
  }

  .turn-to-play {
    background-color: $orange;
    text-align: center;
    &::before {
      width: 2.166666rem;
      height: 1.055555rem;
      top: -0.95rem;
    }

    .current-turn-txt {
      position: absolute;
      left: 50%;
      bottom: -2.111111rem;
      line-height: 16.12px;
      transform: translateX(-50%);
      font-size: 0.722222rem;
      letter-spacing: 5px;
      width: 200px;
    }
  }
}
</style>
