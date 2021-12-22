<!-- eslint-disable -->
<template>
  <teleport to="body">
    <!-- v-if="showMenu" -->
    <div v-if="showMenu" class="backdrop" @click="closeMenu"></div>
    <transition name="dialog">
      <dialog open v-if="showMenu">
        <div class="cta">
          <button id="restart" @click="restart">Restart</button>
          <button id="new-game" @click="newGame">New Game</button>
          <button id="resume" @click="closeMenu">Resume Game</button>
        </div>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: ["showMenu"],
  emits: ["update:closeMenu", "update:newGame", "update:restart"],
  data() {
    return {};
  },
  methods: {
    closeMenu() {
      this.$emit('update:closeMenu');
    },
    newGame() {
      this.$emit('update:newGame');
    },
    restart() {
      this.$emit('update:restart');
      this.$emit('update:closeMenu');
    },
  }
};
</script>

<style lang="scss" scoped>
@import "../sass/_colors";
@import "../sass/ui/_mg-button";
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
  padding: 1.3333333rem;
  background-color: $ligth-gray;
  border: none;
  border-radius: 0.555555rem;
  max-width: 38.4rem;
  z-index: 10;
  position: absolute;
  top: 12.333333rem;
  left: 50%;
  transform: translateX(-50%);
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
</style>
