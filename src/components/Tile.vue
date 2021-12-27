<!-- eslint-disable -->
<template>
  <transition name="tile">
    <div
      @click="showTile"
      class="tile"
      :class="setClasses"
      v-if="theme === 'numbers'"
    >
      <slot>{{ value }}</slot>
    </div>
  </transition>
  <transition name="tile">
    <div
      @click="showTile"
      class="tile"
      :class="setClasses"
      v-if="theme === 'icons'"
    >
      <span v-html="value"></span>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    isMulti: {
      type: Boolean,
      required: true,
    },
    reset: {
      type: Boolean,
      required: true,
    },
    twoLastPicks: {
      type: Array,
      required: true,
    },
  },
  emits: [
    "update:moves",
    "update:endGame",
    "update:winning",
    "update:gameReseted",
    "update:currentPick",
    "update:emptyTwoLastPicks",
  ],
  data() {
    return {
      state: "hidden", // turned, hidden & match
    };
  },
  created() {},
  computed: {
    setClasses() {
      return `${this.state} ${this.gridSize}`;
    },
    gridSize() {
      return this.$store.getters["gridSize"];
    },
    theme() {
      return this.$store.getters["theme"];
    },
    matches() {
      return !this.isMulti
        ? this.$store.getters["solo/matches"]
        : this.$store.getters["multi/matches"];
    },
  },
  watch: {
    twoLastPicks(value) {
      if (value.length >= 2 && value.includes(this.value)) {
        this.$emit("update:emptyTwoLastPicks");
        this.initTileState();
      }
    },
    matches(value) {
      if (value.includes(this.value)) {
        this.matchTile();
      }
      if (
        (value.length === 8 && this.gridSize === "fourTimesFour") ||
        (value.length === 18 && this.gridSize === "sixTimesSix")
      ) {
        this.index === 0 && this.$emit("update:endGame", true);
        this.index === 0 && this.$emit("update:winning", true);
      }
    },
    reset(status) {
      if (status) {
        this.state = "hidden";
        this.index === 0 && this.$emit("update:gameReseted");
      }
    },
  },
  methods: {
    showTile() {
      if (this.state !== "match") {
        this.state = "turned";
        this.handleCurrentPick();
      }
    },
    handleCurrentPick() {
      if (!this.matches.includes(this.value)) {
        this.$emit("update:currentPick", {
          value: this.value,
          index: this.index,
        });
      }
    },
    initTileState() {
      setTimeout(() => {
        this.hideTile();
      }, 850);
    },
    matchTile() {
      this.state = "match";
    },
    hideTile() {
      this.state = "hidden";
    },
    moves() {
      this.$emit("update:moves");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/_colors";
@import "../sass/_variables";

.tile {
  color: $white;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-style: normal;
  user-select: none;
  cursor: pointer;
}

.turned {
  background-color: $orange;
  transform: rotateY(360deg);
  transition: transform 550ms ease-in-out;
}

.hidden {
  background-color: $dark-blue;
  color: $dark-blue !important;
}

.match {
  background-color: $blue-gray;
  color: $white;
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.hidden:hover {
  background-color: $hovered-blue;
  color: $hovered-blue !important;
}

.fourTimesFour {
  height: 4.029444rem;
  width: 4.029444rem;
  font-size: 2.222222rem;
}

.sixTimesSix {
  height: 2.604444rem;
  width: 2.604444rem;
  font-size: 1.333333rem;
}

@media screen and (min-width: $tablet-min) {
  .fourTimesFour {
    height: 6.555555rem;
    width: 6.555555rem;
    font-size: 3.111111rem;
  }

  .sixTimesSix {
    height: 4.555555rem;
    width: 4.555555rem;
    font-size: 2.444444rem;
  }
}

@media screen and (min-width: $desktop-min) {
  .fourTimesFour {
    height: 6.555555rem;
    width: 6.555555rem;
    font-size: 3.111111rem;
  }

  .sixTimesSix {
    height: 4.555555rem;
    width: 4.555555rem;
    font-size: 2.444444rem;
  }
}
</style>
