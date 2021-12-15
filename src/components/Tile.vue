<!-- eslint-disable -->
<template>
  <div class="tile" :class="setClasses" v-if="type === 'numbers'">
    <slot>{{ value }}</slot>
  </div>
  <div class="tile" :class="setClasses" v-if="type === 'icons'">
     <span v-html="value"></span>
  </div>
</template>

<script>
const types = ["numbers", "icons"];
const states = ["turned", "hidden"];
const sizes = ["fourTimesFour", "sixTimesSix"];
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
      validator(size) {
        return sizes.includes(size);
      },
    },
    state: {
      type: String,
      required: true,
      validator(state) {
        return states.includes(state);
      },
    },
    type: {
      type: String,
      required: true,
      validator(type) {
        return types.includes(type);
      },
    },
  },
  computed: {
    setClasses() {
      return `${this.state} ${this.size}`;
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
  cursor: pointer;
}

.turned {
  background-color: $orange;
}

.hidden {
  background-color: $dark-blue;
  color: $dark-blue !important;
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
