<template>
<div class="bg-white rounded border border-gray-200 relative flex flex-col">
  <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
    <span class="card-title">Upload</span>
    <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
  </div>
  <div class="p-6">
    <!-- Upload Dropbox -->
    <div
      class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed
        border-gray-400 text-gray-400 transition duration-500 hover:text-white
        hover:bg-green-400 hover:border-green-400 hover:border-solid"
      v-bind:class="{ 'bg-green-400 border-green-400 border-solid': is_dragover }"
      v-on:dragend.prevent.stop ="is_dragover = false"
      v-on:dragover.prevent.stop ="is_dragover = true"
      v-on:dragenter.prevent.stop ="is_dragover = true"
      v-on:dragleave.prevent.stop="is_dragover = false"
      v-on:drop.prevent.stop="upload($event)"
    >
      <h5>Drop your files here</h5>
    </div>
    <label style="display: none">files</label>
    <input
      type="file"
      multiple
      v-on:change="upload($event)"
    />
    <hr class="my-6" />
    <!-- Progess Bars -->

    <div
      class="mb-4"
      v-for="upload in uploads"
      v-bind:key="upload.name"
    >
      <!-- File Name -->
      <div
        class="font-bold text-sm"
        v-bind:class="upload.text_class"
      >
        <i
          v-bind:class="upload.icon">
        </i>
        {{ upload.name }}
      </div>
      <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
        <!-- Inner Progress Bar -->
        <div
          class="transition-all progress-bar"
          v-bind:class="upload.variant"
          v-bind:style ="{ width: upload.current_progress + '%' }"
        ></div>
      </div>
    </div>

  </div>
</div>
</template>

<script>
import { storage, auth, songsCollections } from '@/includes/firebase';

export default {
  name: 'AppUpload',
  props: ['addSongProp'],
  data() {
    return {
      is_dragover: false,
      uploads: [],
    };
  },
  methods: {
    async upload($event) {
      this.is_dragover = false;
      // console.log('upload', $event);

      const files = $event.dataTransfer ? [...$event.dataTransfer.files] : [...$event.target.files];

      files.forEach(async (file) => {
        if (file.type !== 'audio/mpeg') {
          console.log('n/a upload');
          return;
        }
        const storageRef = storage.ref(); // udemy-musicapp.appspot.com
        console.log('storageRef', storageRef);
        const songsRef = storageRef.child(`songs/${file.name}`); // udemy-musicapp.appspot.com/songs/example.mp3
        console.log('songsRef', songsRef);
        const task = songsRef.put(file);

        const uploadIndex = this.uploads.push({
          task,
          current_progress: 0,
          name: file.name,
          variant: 'bg-blue-400',
          icon: 'fas fa-spinner fa-spin',
          text_class: '',
        }) - 1;

        task.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.uploads[uploadIndex].current_progress = progress;
        }, (error) => {
          this.uploads[uploadIndex].variant = 'bg-red-400';
          this.uploads[uploadIndex].icon = 'fas fa-times';
          this.uploads[uploadIndex].text_class = 'text-red-400';
          console.log('err', error);
        }, async () => {
          const song = {
            uid: auth.currentUser.uid,
            display_name: auth.currentUser.displayName,
            original_name: task.snapshot.ref.name,
            modified_name: task.snapshot.ref.name,
            genre: '',
            comment_count: 0,
          };

          song.url = await task.snapshot.ref.getDownloadURL();
          const songRef = await songsCollections.add(song);
          const songSnapshot = await songRef.get();
          this.addSongProp(songSnapshot);

          this.uploads[uploadIndex].variant = 'bg-green-400';
          this.uploads[uploadIndex].icon = 'fas fa-check';
          this.uploads[uploadIndex].text_class = 'text-green-400';
        });

        console.log('fim upload');
      });
      console.log('file', files);
    },
    cancelUploads() {
      console.log('cancel');
      this.uploads.forEach((upload) => {
        upload.task.cancel();
      });
    },
  },
  beforeUnmount() {
    this.uploads.forEach((upload) => {
      upload.task.cancel();
    });
  },
};

/* v-on:drag=""
  v-on:dragstart=""
  v-on:dragend=""
  v-on:dragover=""
  v-on:dragenter=""
  v-on:dragleave=""
  v-on:drop="" */
</script>
