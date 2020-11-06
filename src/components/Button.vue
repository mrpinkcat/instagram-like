<template>
  <button class="v-button" @click="$emit('click')">
    <slot>Button</slot>
  </button>
</template>

<style lang="scss" scoped>
.v-button {
  all: unset;
  display: flex;
  align-items: center;
  border: 1px black solid;
  padding: 0 15px;
  height: 30px;
  cursor: pointer;
  background: white;
  font-weight: 500;
  transition: all .2s ease;

  &.big {
    padding: 0 25px;
    height: 40px;
    font-size: 18px;
  }

  &.center {
    justify-content: center;
  }

  &.underline {
    border: 0;
    text-decoration: underline;
    padding: 0;
  }

  &:disabled {
    border: 1px gray solid;
    color: gray;
    pointer-events: none;
  }

  &:hover {
    background: black;
    color: white;

    svg {
      fill: white;
    }
  }

  svg {
    fill: black;
    height: 60%;
    padding-left: 10px;
    transition: all .2s ease;
  }
}
</style>

<script>
export default {
  name: 'customButton',
};
</script>
