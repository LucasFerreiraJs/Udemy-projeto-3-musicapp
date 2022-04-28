<template>
<!-- eslint-disable -->
  <li

    class="flex justify-between items-center p-3 pl-6 cursor-pointer transition
    duration-300 hover:bg-gray-50">
    <div>
      <router-link
        v-bind:to="{ name: 'song', params: {id: songProp.docID } }"
        class="font-bold block text-gray-600">{{ songProp.modified_name }}
      >
      </router-link>
      <span class="text-gray-500 text-sm">{{ songProp.display_name}}</span>
    </div>

    <div class="text-gray-600 text-lg">
      <router-link
        custom
        v-bind:to="{ name: 'song', params: { id: songProp.docID }, hash: '#comments'}"
        v-slot="{ navigate }"
      >
      <span class="comments" v-on:click="navigate">
        <i class="fa fa-comments text-gray-600"></i>
        {{ songProp.comment_count }}
      </span>
      </router-link>
    </div>
  </li>
</template>

<script>
export default {
  name: 'SongItem',
  props: ['songProp'],
};
</script>
