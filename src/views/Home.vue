<template>
<main>
 <!-- Introduction -->
  <section class="mb-8 py-20 text-white text-center relative">
    <div class="absolute inset-0 w-full h-full bg-contain introduction-bg"
      style="background-image: url(assets/img/header.png)"></div>
    <div class="container mx-auto">
      <div class="text-white main-header-content">
        <h1 class="font-bold text-5xl mb-5">Listen to Great Music!</h1>
        <p class="w-full md:w-8/12 mx-auto">

          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus et dolor mollis, congue augue non, venenatis elit.
          Nunc justo eros, suscipit ac aliquet imperdiet, venenatis et
          sapien. Duis sed magna pulvinar, fringilla lorem eget,
          ullamcorper urna.
        </p>
      </div>
    </div>

    <img
    alt=""
    class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
      src="assets/img/introduction-music.png" />
  </section>
  <!-- Main Content -->
  <section class="container mx-auto">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div
        v-icon="'headphones-alt'"
        class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Songs</span>
        <!-- Icon -->

      </div>
      <!-- Playlist -->
      <ol id="playlist">
        <SongItem
          v-for="song in songs"
          v-bind:key="song.docID"
          v-bind:songProp="song"
        />
      </ol>
      <!-- .. end Playlist -->
    </div>
  </section>
</main>
</template>

<script>
import { songsCollections } from '@/includes/firebase';
import SongItem from '@/components/SongItem.vue';

export default {
  name: 'HomeView',
  components: {
    SongItem,
  },
  data() {
    return {
      songs: [],
      maxPerPage: 3,
      pendingRequest: false,
    };
  },
  async created() {
    this.getSongs();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;

      if (bottomOfWindow) {
        this.getSongs();
      }
    },
    async getSongs() {
      if (this.pendingRequest) {
        return;
      }

      this.pendingRequest = true;

      let snapshots;

      if (this.songs.length) {
        const lastDoc = await songsCollections
          .doc(this.songs[this.songs.length - 1].docID)
          .get();

        snapshots = await songsCollections
          .orderBy('modified_name')
          .startAfter(lastDoc)
          .limit(this.maxPerPage)
          .get();
      } else {
        snapshots = await songsCollections
          .orderBy('modified_name')
          .limit(this.maxPerPage)
          .get();
      }

      snapshots.forEach((document) => {
        this.songs.push({
          docID: document.id,
          ...document.data(),
        });
      });

      this.pendingRequest = false;
    },
  },
};
</script>
