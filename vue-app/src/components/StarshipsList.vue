<template>
  <div class="starship__slider">

    <ul class="starship__slider-list">
      <li v-for="starship in filteredStarships" :key="starship.id" class="starship__slider-item">
        <a href="#" class="starship__list-link">
          <img :src="starship.src" class="starship__list-poster">
          <h2 class="starship__list-name">{{starship.name}}</h2>
          <p class="starship__list-info">Класс: {{starship.starship_class}}</p>
          <p class="starship__list-info">Длина: {{starship.length}}</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="js">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: 'Starship',

    props: {
      filteredStarships: {
        required: true,
        type: Array
      }
    }
  })
</script>