<template>
  <label for="file">
    Choose a file to upload
    <upload-icon/>
    <input
      type="file"
      name="file"
      id="file"
      @change="$emit('change', $event)"
      :accept="accept"/>
  </label>
</template>

<style lang="scss" scoped>
label {
  all: unset;
  display: flex;
  align-items: center;
  border: 1px black solid;
  padding: 0 25px;
  height: 40px;
  cursor: pointer;
  background: white;
  font-weight: 500;
  font-size: 18px;
  transition: all .2s ease;

  .upload-icon {
    height: 60%;
    padding-left: 10px;
    transition: all .2s ease;
  }

  input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  &:hover {
    background: black;
    color: white;

    .upload-icon {
      fill: white;
    }
  }
}
</style>

<script>
import UploadIcon from '@/components/UploadIcon.vue';

export default {
  name: 'FileInput',
  components: {
    'upload-icon': UploadIcon,
  },
  props: {
    accept: {
      type: String,
      require: true,
    },
  },
};
</script>
