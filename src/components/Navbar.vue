<template>
  <div class="navbar">
    <span class="brand">SquarePics</span>
    <button class="upload">
      Share a square
    </button>
    <div class="user">
      <span class="user-name">Gatien</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 100%;
  padding: 0 25px;

  .brand {
    position: absolute;
    left: 25px;
    font-size: 25px;
    font-weight: bold;
  }

  .user {
    position: absolute;
    right: 25px;
  }

  .upload {
    all: unset;
    display: flex;
    align-items: center;
    border: 1px black solid;
    padding: 0 25px;
    height: 40px;
    cursor: pointer;
    background: white;
    font-weight: 500;
    transition: all .2s ease;

    &:hover {
      background: black;
      color: white;
    }
  }
}
</style>
