<template>
  <div id="game-setup">
    <section class="setup__row theme">
      <p>Select Theme</p>
      <div class="cta">
        <button @click="setTheme('numbers')" :class="{ active: theme.numbers }">
          Numbers
        </button>
        <button @click="setTheme('icons')" :class="{ active: theme.icons }">
          Icons
        </button>
      </div>
    </section>
    <section class="setup__row player-number">
      <p>Number of Players</p>
      <div class="cta">
        <button
          @click="setPlayerNumber('one')"
          :class="{ active: playerNumber.one }"
        >
          1
        </button>
        <button
          @click="setPlayerNumber('two')"
          :class="{ active: playerNumber.two }"
        >
          2
        </button>
        <button
          @click="setPlayerNumber('three')"
          :class="{ active: playerNumber.three }"
        >
          3
        </button>
        <button
          @click="setPlayerNumber('four')"
          :class="{ active: playerNumber.four }"
        >
          4
        </button>
      </div>
    </section>
    <section class="setup__row grid-size">
      <p>Grid Size</p>
      <div class="cta">
        <button
          @click="setGridSize('fourTimesFour')"
          :class="{ active: gridSize.fourTimesFour }"
        >
          4x4
        </button>
        <button
          @click="setGridSize('sixTimesSix')"
          :class="{ active: gridSize.sixTimesSix }"
        >
          6x6
        </button>
      </div>
    </section>
    <button id="start" @click="startGame()">Start Game</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: {
        numbers: true,
        icons: false,
      },
      playerNumber: {
        one: true,
        two: false,
        three: false,
        four: false,
      },
      gridSize: {
        fourTimesFour: true,
        sixTimesSix: false,
      },
      setup: {
        theme: 'numbers',
        playerNumber: 'one',
        gridSize: 'fourTimesFour',
      },
    };
  },
  computed: {},
  methods: {
    setTheme(value) {
      this.setActiveClass('theme', value);
      this.updateSetup('theme', value);
    },
    setPlayerNumber(value) {
      this.setActiveClass('playerNumber', value);
      this.updateSetup('playerNumber', value);
    },
    setGridSize(value) {
      this.setActiveClass('gridSize', value);
      this.updateSetup('gridSize', value);
    },
    startGame() {
      this.$emit('new-setup', this.setup);
    },
    updateSetup(name, value) {
      this.setup[name] = value;
    },
    setActiveClass(name, value) {
      for (const key in this[name]) {
        if (key === value) {
          this[name][value] = true;
        } else {
          this[name][key] = false;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/_colors";
@import "../sass/_variables";
@import "../sass/ui/_mg-button";

#game-setup {
  padding: 1.333333rem;
  background-color: $white;
  border-radius: 0.555555rem;
  max-width: 38.4rem;
  margin: 0 auto;

  button {
    @include mg-button;
  }

  .setup__row {
    margin-bottom: 1.333333rem;

    p {
      font-size: 0.833333rem;
      color: $blue-gray-2;
      line-height: 19px;
      margin-bottom: 0.611111rem;
    }

    .cta {
      display: flex;
      justify-content: space-between;
    }

    .cta button {
      background-color: $blue-gray;
      font-size: 0.888888rem;
    }

    .cta button.active {
      background-color: $dark-blue !important;
    }

    .cta button:hover {
      background-color: $hovered-blue;
    }
  }

  .theme button:first-child {
    padding: 0.555555rem 1.833333rem;
  }

  .theme button:last-child {
    padding: 0.555555rem 2.527777rem;
  }

  .player-number button {
    padding: 0.555555rem 1.5rem;
  }

  .grid-size button {
    padding: 0.555555rem 2.916666rem;
  }

  #start {
    background-color: $orange;
    width: 100%;
    line-height: 22px;
    padding: 0.888888rem 0;
    font-size: inherit;
  }

  #start:hover {
    background-color: $hovered-orange;
  }
}

@media screen and (min-width: $tablet-min) {
  #game-setup {
    padding: 3.111111rem;
    border-radius: 1.111111rem;
    max-width: 66.133333rem;

    .setup__row {
      margin-bottom: 1.777777rem; // 32px

      p {
        font-size: 1.111111rem;
        line-height: 32.24px;
        margin-bottom: 0.888888rem;
      }

      .cta button {
        font-size: 1.444444rem;
      }
    }

    .theme button:first-child {
      padding: 0.611111rem 4.055555rem; // 11px 73px
    }

    .theme button:last-child {
      padding: 0.611111rem 5.277777rem;
    }

    .player-number button {
      padding: 0.611111rem 2.340555rem;
    }

    .grid-size button {
      padding: 0.611111rem 5.805555rem;
    }

    #start {
      line-height: 39.68px;
      font-size: 1.777777rem; // 32px
      border-radius: 1.944444rem; // 35px
    }
  }
}

@media screen and (min-width: $desktop-min) {
  #game-setup {
    border-radius: 1.111111rem;
    max-width: 66.133333rem;

    .setup__row {
      p {
        line-height: 24.8px;
      }
    }

    .player-number button {
      padding: 0.611111rem 2.8rem;
      line-height: 32.24px;
    }

    .grid-size button {
      padding: 0.611111rem 5.805555rem;
    }

    #start {
      line-height: 39.68px;
      font-size: 1.777777rem; // 32px
      border-radius: 1.944444rem; // 35px
    }
  }
}
</style>
