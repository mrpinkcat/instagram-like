<template>
  <div class="new-post" @click="$router.push('/')">
    <!-- @click.stop stop la propagation du click pour
      éviter que le @click du .login soit trigger
      (c.f. https://vuejs.org/v2/guide/events.html#Event-Modifiers)-->
    <div class="modal" @click.stop>
      <h2>Share a square</h2>
      <div class="crop">
        <vue-croppie
          ref="croppieRef"
          :enableResize="false"
          :enableOrientation="true"
          :boundary="{ width: 400, height: 400 }"
          :viewport="{ width: 350, height: 350, type: 'square' }"
          v-if="fileIsSelected">
        </vue-croppie>
        <div class="file-upload" v-else>
          <v-file-input accept="image/x-png,image/gif,image/jpeg" @change="fileUpload" />
        </div>
        <div class="post-info">
          <div class="crop-commands">
            <v-button @click="rotate(-90)">Rotate Left</v-button>
            <v-button @click="rotate(90)">Rotate Right</v-button>
          </div>
          <div class="fields">
            <div class="filed-group">
              <label for="title">Title:</label>
              <input type="text" name="title" placeholder="L.A." v-model="title">
            </div>
            <div class="filed-group">
              <label for="description">Description:</label>
              <textarea
                name="description"
                rows="5"
                placeholder="Nice pic from my trip to L.A. :)"
                v-model="description">
              </textarea>
            </div>
          </div>
          <div>
            <v-button
              class="big"
              :disabled="notAllowedToPost"
              @click="post()"
              v-if="getUploadProgression === -1">
                POST
            </v-button>
            <span
              class="upload-progession"
              v-else>
                Upload in progress ... ({{getUploadProgression}}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.new-post {
  background: rgba($color: #000000, $alpha: 0.6);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 930px;
    padding: 40px;
    background: white;

    h2 {
      margin: 0;
      margin-bottom: 20px;
    }

    .crop {
      display: flex;
      flex-direction: row;

      .file-upload {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 400px;
        height: 457px;
      }

      .croppie-container {
        height: unset;
        width: unset;
      }

      .post-info {
        margin-left: 40px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 57px;

        .fields {
          .filed-group {
            display: flex;
            flex-direction: column;

            input {
              margin-bottom: 10px;
            }

            input, textarea {
              font-family: Avenir, Helvetica, Arial, sans-serif;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              padding: 10px;
              border-radius: 0;
              border: 1px solid black;
              resize: none;
            }
          }
        }

        label {
          font-weight: 500;
        }

        .crop-commands {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        .upload-progession {
          height: 42px;
          font-size: 18px;
          font-weight: 500;
        }
      }
    }
  }
}
</style>

<script>
// import UploadIcon from '@/components/UploadIcon.vue';
import Button from '@/components/Button.vue';
import FileInput from '@/components/FileInput.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'NewPost',
  components: {
    // 'upload-icon': UploadIcon,
    'v-button': Button,
    'v-file-input': FileInput,
  },
  data() {
    return {
      fileIsSelected: false,
      croppedBlob: null,
      title: '',
      description: '',
    };
  },
  computed: {
    ...mapGetters({ getUploadProgression: 'post/getUploadProgression' }),
    notAllowedToPost() {
      if (this.title.length > 2 && this.description.length > 2 && this.fileIsSelected) {
        return false;
      }
      return true;
    },
  },
  methods: {
    ...mapActions({ sendPost: 'post/sendPost' }),

    // Quand l'utilisateur upload une photo
    fileUpload(e) {
      this.fileIsSelected = true;

      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        this.$refs.croppieRef.bind({
          url: loadEvent.target.result,
        });
      };

      reader.readAsDataURL(files[0]);
    },
    /**
     * Transforme l'image en blob uplodable
     */
    crop() {
      // Here we are getting the result via callback function
      // and set the result to this.croppedBlob which is being
      return new Promise((resolve) => {
        const options = {
          type: 'blob',
          size: 'original',
          format: 'png',
          circle: false,
        };
        this.$refs.croppieRef.result(options, (output) => {
          this.croppedBlob = output;
          resolve(output);
        });
      });
    },
    /**
     * Fait une rotation de l'image
     */
    rotate(rotationAngle) {
      this.$refs.croppieRef.rotate(rotationAngle);
    },
    /**
     * Ajoute le post chez strapi
     */
    post() {
      this.crop().then((blob) => {
        this.sendPost({
          title: this.title,
          description: this.description,
          imageBlob: blob,
        }).then(() => {
          this.$router.push('/');
        });
      });
    },
  },
};
</script>
