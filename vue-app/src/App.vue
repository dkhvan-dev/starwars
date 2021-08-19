<template>
  <div id="app">
    <header class="header">
      <section class="header__logo">
          <a href="#" class="header__logo-link">
              <img src="./assets/img/logo.png" alt="logo" class="header__logo-image">
          </a>
      </section>

      <section class="header__menu">
          <div class="header__menu-nav nav">
              <span id="trigger" class="nav__trigger">
                  <i class="nav__trigger-item"></i>
                  <i class="nav__trigger-item"></i>
                  <i class="nav__trigger-item"></i>
              </span>
              <ul id="menu" class="nav__menu">
                  <li class="nav__menu-item"><a href="#" class="nav__menu-link">Фильмы</a></li>
                  <li class="nav__menu-item"><a href="#" class="nav__menu-link">Актеры</a></li>
                  <li class="nav__menu-item"><a href="#" class="nav__menu-link">Корабли</a></li>
              </ul>
          </div>

          <ul class="header__list">
              <li class="header__list-item">
                  <a href="#" class="header__list-link"><h2 class="header__list-title">Фильмы</h2></a>
              </li>
              <li class="header__list-item">
                  <a href="#" class="header__list-link"><h2 class="header__list-title">Актеры</h2></a>
              </li>
              <li class="header__list-item">
                  <a href="#" class="header__list-link"><h2 class="header__list-title">Корабли</h2></a>
              </li>
          </ul>
      </section>
    </header>
    
    <main class="main">
        <section class="main__film film">
            <div class="main__film-header">
                <h1 class="main__title">Фильмы</h1>
                <div class="search-block">
                    <input type="search" class="film__search-input" v-model="searchFilm">
                    <button type="button" class="film__search-btn" v-on:click="filmSearchHandler">Искать</button>
                </div>
            </div>

            <FilmsList :filteredFilms="filteredFilms" /> 
        </section>

        <section class="main__actors actors">
            <div class="main__actors-header">
                <h1 class="main__title">Актеры</h1>
                <div class="search-block">
                    <input type="search" class="actor__search-input" v-model="searchActor">
                    <button type="button" class="actor__search-btn" v-on:click="actorSearchHandler">Искать</button>
                </div>
            </div>

            <ActorsList :filteredActors="filteredActors" />
        </section>

        <section class="main__starships ships">
            <div class="main__starships-header">
                <h1 class="main__title">Корабли</h1>
                <div class="search-block">
                    <input type="search" class="starship__search-input" v-model="searchStarship">
                    <button type="button" class="starship__search-btn" v-on:click="starshipSearchHandler">Искать</button>
                </div>
            </div>

            <StarshipsList :filteredStarships="filteredStarships" />
        </section>

    </main>

    <footer class="footer">
        <section class="footer__support">
            <h1 class="footer__support-title">Поддержка пользователей</h1>
            <hr>
            <p class="footer__support-number">+7 953 777 53 03 <span class="footer__support-info">WhatsApp</span></p>
            <p class="footer__support-email">support@gmail.com</p>
        </section>
        <section class="footer__partners">
            <h1 class="footer__partners-title">Пользователям и партнёрам</h1>
            <hr>
            <ul class="socials">
                <li class="socials__item"><a href="#" class="socials__link"><img src="./assets/img/socials/facebook.png" alt="facebook" class="socials__picture"></a></li>
                <li class="socials__item"><a href="#" class="socials__link"><img src="./assets/img/socials/vk.png" alt="vk" class="socials__picture"></a></li>
                <li class="socials__item"><a href="#" class="socials__link"><img src="./assets/img/socials/instagram.png" alt="instagram" class="socials__picture"></a></li>
                <li class="socials__item"><a href="#" class="socials__link"><img src="./assets/img/socials/whatsapp.png" alt="whatsapp" class="socials__picture"></a></li>
            </ul>
            <p class="footer__copyright">&copy; 2021  Все права защищены.</p>
        </section>
    </footer>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import axios from '../node_modules/axios';

  import ActorsList from './components/ActorsList.vue';
  import FilmsList from './components/FilmsList.vue';
  import StarshipsList from './components/StarshipsList.vue';

  export default defineComponent({
    name: 'App',
    components: { FilmsList, ActorsList, StarshipsList },
    data() {
      return {
        // Переменные категории Films
        films: [] as any,
        filteredFilms: [] as any,
        
        // Переменные категории Actors
        actors: [] as any,
        filteredActors: [] as any,
        actorsPageNumber: 1 as number,
        actorsName: [
          {actorName: 'Марк Хэмилл' as string},
          {actorName: 'Энтони Дэниелс' as string},
          {actorName: 'Кенни Бейкер' as string},
          {actorName: 'Дэвид Проуз' as string},
          {actorName: 'Кэрри Фишер' as string},
          {actorName: 'Джоэл Эдгертон' as string},
          {actorName: 'Бонни Писз' as string},
          {actorName: '' as string},
          {actorName: 'Гэррик Хэгон' as string},
          {actorName: 'Юэн Макгрегор' as string},
        ],
        actorsImg: [
          {src: './assets/img/actors/mark_hamill.jpg' as string},
          {src: './assets/img/actors/anthony_daniels.jpg' as string},
          {src: './assets/img/actors/kenny_baker.jpg' as string},
          {src: './assets/img/actors/david_prowse.jpg' as string},
          {src: './assets/img/actors/carrie_fisher.jpg' as string},
          {src: './assets/img/actors/joel_edgerton.jpeg' as string},
          {src: './assets/img/actors/bonnie_piesse.jpg' as string},
          {src: './assets/img/actors/r5_d4.jpg' as string},
          {src: './assets/img/actors/garrick_hagon.jpg' as string},
          {src: './assets/img/actors/ewan_mcgregor.jpg' as string},
        ],
        
        // Переменные категории Starships
        starships: [] as any,
        filteredStarships: [] as any,
        starshipsPageNumber: 1 as number,
        starshipsImg: [
          {src: './assets/img/starships/cr90_corvette.jpg' as string},
          {src: './assets/img/starships/star_destroyer.jpg' as string},
          {src: './assets/img/starships/sentinel_class_landing_craft.jpg' as string},
          {src: './assets/img/starships/death_star.jpg' as string},
          {src: './assets/img/starships/millennium_falcon.jpg' as string},
          {src: './assets/img/starships/y_wing.jpg' as string},
          {src: './assets/img/starships/x_wing.jpg' as string},
          {src: './assets/img/starships/tie_advanced_x1.png' as string},
          {src: './assets/img/starships/executor.png' as string},
          {src: './assets/img/starships/rebel_transport.jpg' as string},
        ],

        // Переменные поисковиков
        searchFilm: '' as string,
        searchActor: '' as string,
        searchStarship: '' as string,
      }
    },

    methods: {
      // Поисковик фильма
      filmSearchHandler() {
        if (this.searchFilm === '') {
          this.filteredFilms = this.films;
        }
        const regexp = new RegExp(this.searchFilm, 'i');

        if (typeof this.searchFilm === 'string') this.filteredFilms = this.films.filter((good: any) => regexp.test(good.title));
        if (parseInt(this.searchFilm) > 0 && parseInt(this.searchFilm) < 10) this.filteredFilms = this.films.filter((good: any) => regexp.test(good.episode_id));
        if (typeof this.searchFilm !== 'string' && parseInt(this.searchFilm) > 9) this.filteredFilms = this.films.filter((good: any) => regexp.test(good.release_date));
      },

      // Поисковик актера
      actorSearchHandler() {
        if (this.searchActor === '') {
          this.filteredActors = this.actors;
        }
        const regexp = new RegExp(this.searchActor, 'i');
        const regexpRus = /[а-яё]/i;

        if (regexpRus.test(this.searchActor)) this.filteredActors = this.actors.filter((good: any) => regexp.test(good.actorName)); else this.filteredActors = this.actors.filter((good: any) => regexp.test(good.name));
      },

      // Поисковик корабля
      starshipSearchHandler() {
        if (this.searchStarship === '') {
          this.filteredStarships = this.starships;
        }
        const regexp = new RegExp(this.searchStarship, 'i');

        // К сожалению, я пока что смог сделать поиск только по названию и длине корабля
        if (typeof this.searchStarship === 'string') this.filteredStarships = this.starships.filter((good: any) => regexp.test(good.name));
        if (typeof this.searchStarship !== 'string') this.filteredStarships = this.starships.filter((good: any) => regexp.test(good.length));
      },

      // Пагинация


      // GET запросы
      filmsData() {
        return axios.get('https://swapi.dev/api/films').then(function(response){
          let filmsImg = [
            {src: './assets/img/films/sw_a_new_hope.jpg'}, // Ошибка такая, что путь через папку не видит, а URL браузерной картинки видит
            {src: './assets/img/films/sw_the_empire_strikes_back.jpg'},
            {src: './assets/img/films/sw_return_of_jedi.jpg'},
            {src: './assets/img/films/sw_phantom_menace.jpg'},
            {src: './assets/img/films/sw_attack_of_the_clones.jpg'},
            {src: './assets/img/films/sw_revenge_of_the_sith.jpg'},
          ];
          let filmsRating = [
            {rating: 8.1},
            {rating: 8.2},
            {rating: 8.2},
            {rating: 7.9},
            {rating: 8.1},
            {rating: 7.9},
            {rating: 8.1},
            {rating: 7.1},
            {rating: 7.2},
            {rating: 6.7},
            {rating: 7.0},
            {rating: 6.0},
          ];

          for(let i=0;i<6;i++) {
            response.data.results[i].src = filmsImg[i].src;
            response.data.results[i].rating = filmsRating[i].rating;
          }
          return response.data.results;
        });
      },

      actorsData(actorsPageNumber: number) { 
      return axios.get('https://swapi.dev/api/people/?page=' + actorsPageNumber)
      .then(response => {
        for(let j=0;j<response.data.results.length;j++) {
          response.data.results[j].actorName = this.actorsName[j].actorName;
          response.data.results[j].src = this.actorsImg[j].src;
        }
          this.actors = response.data.results;
          this.filteredActors = response.data.results;

          return response.data.results;
        });
      },

      starshipsData(starshipsPageNumber: number) { 
        return axios.get('https://swapi.dev/api/starships/?page=' + starshipsPageNumber)
        .then(response => {
          for(let j=0;j<response.data.results.length;j++) {
            response.data.results[j].src = this.starshipsImg[j].src;
          }

          this.starships = response.data.results;
          this.filteredStarships = response.data.results;

          return response.data.results;
        });
      },
    },

    mounted() {
      this.filmsData()
      .then(data => {
        this.films = data;
        this.filteredFilms = data;
      });

      this.actorsData(this.actorsPageNumber)
      .then(data => {
        this.actors = data;
        this.filteredActors = data;
      });

      this.starshipsData(this.starshipsPageNumber)
      .then(data => {
        this.starships = data;
        this.filteredStarships = data;
      });
    },
  })

</script>
