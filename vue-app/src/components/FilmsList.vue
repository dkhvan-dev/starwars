<template>
  <div class="film__slider">
    <ul class="film__slider-list">
      <li v-for="film in filteredFilms" :key="film.id" class="film__slider-item">
        <a href="#" class="film__list-link">
          <img :src="film.src" class="film__list-poster">
          <h2 class="film__list-name">{{film.title}}</h2>
          <p class="film__list-year">Год: {{film.release_date}}</p>
          <p class="film__list-info">Номер эпизода: {{film.episode_id}}</p>
          <p class="film__list-info">Рейтинг: <span class="film__list-rating">{{film.rating}}</span></p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

  export default defineComponent({
    name: 'Film',
    props: {
      filteredFilms: {
        required: true,
        type: Array
      }
    }
  })
</script>