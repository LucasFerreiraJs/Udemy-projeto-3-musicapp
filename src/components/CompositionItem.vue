<template>
<div class="border border-gray-200 p-3 mb-4 rounded">
  <div v-show="!showForm">
    <h4 class="inline-block text-2xl font-bold">{{ songProp.modified_name }}</h4>

    <button
      v-on:click.prevent="deleteSong"
      class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
      <i class="fa fa-times"></i>
    </button>

    <button
      class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
      v-on:click.prevent="showForm = !showForm"
    >
      <i class="fa fa-pencil-alt"></i>
    </button>
  </div>

  <div v-show="showForm">

    <div
      v-if="show_alert"
      class="text-white text-center font-bold p-4 mb-4"
      v-bind:class="alert_variant"
    >
    {{ alert_message }}
    </div>

    <vee-form
      v-bind:validation-schema="schema"
      v-bind:initial-values="songProp"
      v-on:submit="edit"
    >
      <div class="mb-3">
        <label class="inline-block mb-2">Song Title</label>
        <vee-field
          name="modified_name"
          type="text"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
            transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Song Title"
          v-on:input="updateUnsaveFlagProps(true)"
        />
        <ErrorMessage class="text-red-600" name="modified_name" />
      </div>
      <div class="mb-3">
        <label class="inline-block mb-2">Genre</label>
        <vee-field
          name="genre"
          type="text"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
            transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Genre"
          v-on:input="updateUnsaveFlagProps(true)"
        />
          <ErrorMessage class="text-red-600" name="genre" />
      </div>
      <button
        v-bind:disabled="in_submission"
        type="submit" class="py-1.5 px-3 rounded text-white bg-green-600">
        Submit
      </button>
      <button
        v-bind:disabled="in_submission"
        v-on:click.prevent="showForm = false"
        type="button" class="py-1.5 px-3 rounded text-white bg-gray-600">
        Go Back
      </button>
    </vee-form>
  </div>
</div>
</template>

<script>
import { songsCollections, storage } from '@/includes/firebase';

export default {
  name: 'CompositionItem',
  props: {
    songProp: {
      type: Object,
      required: true,
    },
    updatingSongProp: {
      type: Function,
      required: true,
    },
    indexProp: {
      type: Number,
      required: true,
    },
    removeSongProp: {
      type: Function,
      required: true,
    },
    updateUnsaveFlagProps: {
      type: Function,
    },
  },
  data() {
    return {
      showForm: false,
      schema: {
        modified_name: 'required',
        genre: 'alphaSpaces',
      },
      in_submission: false,
      show_alert: false,
      alert_variant: 'bg-blue-500',
      alert_message: 'Plase wait! Updating song info',
    };
  },
  methods: {
    async edit(values) {
      this.in_submission = true;
      this.show_alert = true;
      this.alert_variant = 'bg-blue-500';
      this.alert_message = 'Plase wait! Updating song info';

      try {
        await songsCollections.doc(this.songProp.docID).update(values);
        console.log('nem fez req');
      } catch (err) {
        this.in_submission = false;
        this.alert_variant = 'bg-red-500';
        this.alert_message = 'Something went wrong! Try again later';
        return;
      }

      this.updatingSongProp(this.indexProp, values);
      this.updatingSongProp(false);
      this.in_submission = false;
      this.alert_variant = 'bg-green-500';
      this.alert_message = 'Success';
    },

    async deleteSong() {
      const storageRef = storage.ref();
      const songRef = storageRef.child(`songs/${this.songProp.original_name}`);

      await songRef.delete();

      await songsCollections.doc(this.songProp.docID).delete();

      this.removeSongProp(this.indexProp);
    },
  },
};
</script>
