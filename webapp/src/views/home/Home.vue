<template>
  <div class="flex-col flex-align-center">
    <div class="link-gen-wrapper base-card">
      <form class="flex-align-center flex-col">
        <h4 class="header2 text-align-center margin-bottom-3">
          Paste your link to be shortened
        </h4>
        <div class="form-group flex-col flex-align-center">
          <InputField
            v-model="url"
            id="long-link"
            :label="!activeLink ? 'Your super long link' : 'Your very short link'"
            :default-spacing="false"
            :error="urlError"
          />
        </div>
        <a
          v-if="activeLink"
          class="link margin-top-3"
          @click.prevent="onCopyClipboard(activeLink)"
        >
          Copy Link
        </a>
        <button class="btn primary-btn margin-top-3" @click.prevent="onLinkSubmit">
          Shorten
        </button>
      </form>
    </div>
    <div v-if="isAuthenticated" class="previous-link-wrapper">
      <h4 class="header2 text-align-center margin-bottom-4">
        Your saved links
      </h4>
      <div v-if="shortenedLinks.length <= 0" class="base-card no-saved-card">
        <h6 class="header3 text-align-center margin-bottom-3">
          No saved links yet :(
        </h6>
        <p class="subtitle1-lower-opacity text-align-center">
          Links will be be saved here after you generate them.
        </p>
      </div>
      <div
        :key="linkBase.linkId"
        class="base-card saved-link-row margin-bottom-2"
        v-for="linkBase in shortenedLinks"
      >
        <div>
          <div class="flex flex-just-center flex-align-center">
            <p class="text-align-center body-1">{{ linkBase.shortenedLink }} </p>
            <div class="copy-button">
              <img
                v-if="copiedId !== linkBase.linkId"
                :src="clipboardInactiveSrc"
                width="22"
                height="22"
                @click="onCopyClipboard(linkBase)"
              />
              <img
                v-if="copiedId === linkBase.linkId"
                :src="clipboardActiveSrc"
                width="22"
                height="22"
              />
            </div>
          </div>
          <p class="subtitle1-lower-opacity text-align-center margin-top-3">
            {{ linkBase.longLink }}
          </p>
        </div>
      </div>
    </div>
    <div v-else class="notification">
      <p>
        Did you know - You can register for an account and save your shortened links?
        <a class="text-white" href="/#/register">Register now</a>.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import copy from 'copy-to-clipboard';
import { LinkFormData, LinkObj } from '@/types';
import InputField from '@/components/InputField.vue';
import clipboardInactiveSrc from '@/assets/clipboard-list-solid.svg';
import clipboardActiveSrc from '@/assets/clipboard-check-solid.svg';
import { commonUrlValidation } from '@/utils/commonValidators';

interface Home {
  url: string,
  activeLink: LinkObj | null,
  copiedId: string | null,
  clipboardInactiveSrc: string,
  clipboardActiveSrc: string,
  urlError: string | null,
}

export default defineComponent({
  name: 'Home',
  components: {
    InputField,
  },
  data() {
    return {
      url: '',
      activeLink: null,
      copiedId: null,
      clipboardInactiveSrc,
      clipboardActiveSrc,
      urlError: null,
    } as Home;
  },
  computed: {
    ...mapGetters({ isAuthenticated: 'isAuthenticated', shortenedLinks: 'shortenedLinks' }),
  },
  watch: {
    url(newUrl: string) {
      if (this.activeLink && newUrl !== this.activeLink.shortenedLink) {
        this.activeLink = null;
      }
    },
  },
  methods: {
    ...mapActions({ registerUser: 'registerUser', createLink: 'createLink' }),
    async onLinkSubmit() {
      const error = commonUrlValidation(this.url);

      if (error) {
        this.urlError = error;
      } else {
        this.urlError = null;

        const activeLink = await this.$store.dispatch('createLink', { url: this.url } as LinkFormData);

        this.url = activeLink.shortenedLink;
        this.activeLink = activeLink;
      }
    },
    onCopyClipboard(link: LinkObj) {
      this.copiedId = link.linkId;

      copy(link.shortenedLink);

      setTimeout(() => {
        this.copiedId = null;
      }, 2000);
    },
  },
  mounted() {
    if (this.isAuthenticated) {
      this.$store.dispatch('getLinks');
    }
  },
});
</script>

<style scoped>

.link-gen-wrapper {
  max-width: 500px;
  padding: 50px 30px 50px 30px;
  margin: auto auto 50px;
  min-height: 265px
}

.previous-link-wrapper {
  max-width: 400px;
  margin: auto;
}

.saved-link-row {
  min-height: 140px;
  padding: 24px;
  overflow-wrap: break-word;
}

.copy-button {
  border: solid 2px #afacac;
  padding: 4px 8px;
  opacity: 0.7;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 16px;
}

.copy-button:hover {
  opacity: 1;
}

.no-saved-card {
  padding: 24px;
}

</style>
