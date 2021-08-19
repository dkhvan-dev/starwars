<template>
  <div class="actor__slider">
      
    <ul class="actor__slider-list">
      <li v-for="actor in filteredActors" :key="actor.id" class="actor__slider-item">
        <a href="#" class="actor__list-link">
          <img :src="actor.src" class="actor__list-poster">
          <h2 class="actor__list-name">{{actor.name}}</h2>
          <p class="actor__list-rus-name">{{actor.actorName}}</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

  export default defineComponent({
    name: 'Actor',

    props: {
      filteredActors: {
        required: true,
        type: Array
      }
    }
  })
</script>