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
              <span class="nav__trigger" @click="hamburgerToggle()" v-if="!isOpenNav">
                  <i class="nav__trigger-item"></i>
                  <i class="nav__trigger-item"></i>
                  <i class="nav__trigger-item"></i>
              </span>
              <span class="nav__menu-close" @click="hamburgerToggle()" v-if="isOpenNav">X</span>
              <ul class="nav__menu" v-if="isOpenNav">
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
            
            <div class="actor-nav">
              <button type="button" class="actor-nav__prev" @click="actorsPrevPage()">&#10094;</button>
              <button type="button" class="actor-nav__next" @click="actorsNextPage()">&#10095;</button>
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

            <div class="starship-nav">
              <button type="button" class="starship-nav__prev" @click="starshipsPrevPage()">&#10094;</button>
              <button type="button" class="starship-nav__next" @click="starshipsNextPage()">&#10095;</button>
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
        isOpenNav: false as boolean,
        
        // Переменные категории Actors
        actors: [] as any,
        filteredActors: [] as any,
        actorsPageNumber: 1 as number,
        actorsMaxPageNumber: 1 as number,
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
        starshipsMaxPageNumber: 1 as number,
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

      hamburgerToggle() {
        this.isOpenNav = !this.isOpenNav;
      },

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
      actorsNextPage() {
        if (this.actorsPageNumber < this.actorsMaxPageNumber) {
          this.actorsPageNumber++;
        }
        
        switch (this.actorsPageNumber) {
        case 1: this.actorsName = [
          {actorName: 'Марк Хэмилл'},
          {actorName: 'Энтони Дэниелс'},
          {actorName: 'Кенни Бейкер'},
          {actorName: 'Дэвид Проуз'},
          {actorName: 'Кэрри Фишер'},
          {actorName: 'Джоэл Эдгертон'},
          {actorName: 'Бонни Писз'},
          {actorName: ''},
          {actorName: 'Гэррик Хэгон'},
          {actorName: 'Юэн Макгрегор'},
        ];

        this.actorsImg = [
          {src: 'img/actors/mark_hamill.jpg'},
          {src: 'img/actors/anthony_daniels.jpg'},
          {src: 'img/actors/kenny_baker.jpg'},
          {src: 'img/actors/david_prowse.jpg'},
          {src: 'img/actors/carrie_fisher.jpg'},
          {src: 'img/actors/joel_edgerton.jpeg'},
          {src: 'img/actors/bonnie_piesse.jpg'},
          {src: 'img/actors/r5_d4.jpg'},
          {src: 'img/actors/garrick_hagon.jpg'},
          {src: 'img/actors/ewan_mcgregor.jpg'},
        ];
        break;

        case 2:
          this.actorsName = [
            {actorName: 'Хайден Кристенсен'},
            {actorName: 'Питер Кушинг'},
            {actorName: 'Питер Мейхью'},
            {actorName: 'Харрисон Форд'},
            {actorName: 'Пол Блейк'},
            {actorName: 'Дэвид Барклай'},
            {actorName: 'Колин Хиггинс'},
            {actorName: 'Уильям Хуткинс'},
            {actorName: ''},
            {actorName: 'Иэн Макдёрмид'},
          ];
  
          
          this.actorsImg = [
            {src: 'img/actors/hayden_christensen.jpg'},
            {src: 'img/actors/peter_cushing.jpg'},
            {src: 'img/actors/peter_mayhew.jpg'},
            {src: 'img/actors/harrison_ford.jpg'},
            {src: 'img/actors/paul_blake.jpg'},
            {src: 'img/actors/david_barclay.jpg'},
            {src: 'img/actors/colin_higgins.jpg'},
            {src: 'img/actors/william_hutkins.jpg'},
            {src: 'img/actors/yoda.jpg'},
            {src: 'img/actors/ian_mcDiarmid.jpg'},
          ];
          break;
        case 3:
          this.actorsName = [
            {actorName: 'Джереми Буллок'},
            {actorName: ''},
            {actorName: 'Аллан Харрис'},
            {actorName: 'Билли Ди Уильямс'},
            {actorName: 'Джон Холлис'},
            {actorName: 'Тимоти Д. Роуз'},
            {actorName: "Женевьева О'Рейли"},
            {actorName: 'Хилтон Макрей'},
            {actorName: ''},
            {actorName: 'Майк Куинн'},
          ];
  
          
          this.actorsImg = [
            {src: 'img/actors/jeremy_bullock.jpeg'},
            {src: 'img/actors/ig_88.jpg'},
            {src: 'img/actors/allan_harris.jpg'},
            {src: 'img/actors/billy_dee_williams.jpg'},
            {src: 'img/actors/john_hollis.jpg'},
            {src: 'img/actors/timothy_d_rose.jpg'},
            {src: "img/actors/genevieve_o_reilly.jpg"},
            {src: 'img/actors/hilton_mcrae.jpg'},
            {src: 'img/actors/wicket_systri_warrick.jpg'},
            {src: 'img/actors/mike_quinn.jpg'},
          ];
          break;
        case 4:
          this.actorsName = [
            {actorName: 'Лиам Нисон'},
            {actorName: 'Силас Карсон'},
            {actorName: 'Теренс Стэмп'},
            {actorName: 'Натали Портман'},
            {actorName: 'Ахмед Бест'},
            {actorName: 'Стив Спайрс'},
            {actorName: 'Брайан Блессед'},
            {actorName: 'Ральф Браун'},
            {actorName: 'Эндрю Сиком'},
            {actorName: 'Льюис Маклауд'},
          ];
  
          
          this.actorsImg = [
            {src: 'img/actors/liam_neeson.jpg'},
            {src: 'img/actors/silas_carson.jpg'},
            {src: 'img/actors/terence_stamp.jpg'},
            {src: 'img/actors/natalie_portman.jpg'},
            {src: 'img/actors/ahmed_best.jpg'},
            {src: 'img/actors/steve_speirs.jpg'},
            {src: 'img/actors/brian_blessed.jpg'},
            {src: 'img/actors/ralph_brown.jpg'},
            {src: 'img/actors/andrew_seecom.jpg'},
            {src: 'img/actors/lewis_macleod.jpg'},
          ];
          break;
        case 5:
          this.actorsName = [
            {actorName: 'Хью Куарши'},
            {actorName: 'Пернилла Аугуст'},
            {actorName: 'Рэй Парк'},
            {actorName: 'Мэттью Вуд'},
            {actorName: 'Дженнифер Хейл'},
            {actorName: ''},
            {actorName: ''},
            {actorName: ''},
            {actorName: ''},
            {actorName: 'Сэмюэл Л. Джексон'},
          ];
  
          
          this.actorsImg = [
            {src: 'img/actors/hugh_quarshi.jpg'},
            {src: 'img/actors/pernilla_august.jpg'},
            {src: 'img/actors/ray_park.jpg'},
            {src: 'img/actors/matthew_wood.jpg'},
            {src: 'img/actors/jennifer_hale.jpg'},
            {src: 'img/actors/ratts_tyerel.jpg'},
            {src: 'img/actors/dud_bolt.jpg'},
            {src: 'img/actors/gasgano.jpg'},
            {src: 'img/actors/ben_quadinaros.jpg'},
            {src: 'img/actors/samuel_l_jackson.jpg'},
          ];
          break;
        case 6:
          this.actorsName = [
            {actorName: 'Сайлас Карсон'},
            {actorName: ''},
            {actorName: 'Хассани Шапи'},
            {actorName: 'Джин Кларк'},
            {actorName: 'Хан Бонфилс'},
            {actorName: 'Мишель Тейлор'},
            {actorName: 'Алан Раскоу'},
            {actorName: 'Джером Блейк'},
            {actorName: ''},
            {actorName: ''},
          ];
  
          this.actorsImg = [
            {src: 'img/actors/silas_carson.jpg'},
            {src: 'img/actors/kit_fisto.jpg'},
            {src: 'img/actors/hassani_shapi.jpg'},
            {src: 'img/actors/gin_clarke.jpg'},
            {src: 'img/actors/khan_bonfils.jpg'},
            {src: 'img/actors/not_found.jpeg'},
            {src: 'img/actors/alan_ruscoe.png'},
            {src: 'img/actors/jerome_blake.jpg'},
            {src: 'img/actors/gregar_typho.jpg'},
            {src: 'img/actors/not_found.jpeg'},
          ];
          break;
        case 7:
          this.actorsName = [
            {actorName: 'Джек Томпсон'},
            {actorName: 'Ричард Страйд'},
            {actorName: 'Фэй Дэвид'},
            {actorName: 'Налини Кришан'},
            {actorName: 'Роуз Бирн'},
            {actorName: 'Кристофер Ли'},
            {actorName: 'Джимми Смитс'},
            {actorName: 'Темуера Моррисон'},
            {actorName: 'Лианна Уолсмен'},
            {actorName: 'Рон Фальк'},
          ];
  
          
          this.actorsImg = [
            {src: 'img/actors/jack_thompson.jpg'},
            {src: 'img/actors/richard_stride.jpg'},
            {src: 'img/actors/fay_david.jpg'},
            {src: 'img/actors/nalini_krishan.jpg'},
            {src: 'img/actors/rose_byrne.jpg'},
            {src: 'img/actors/christopher_lee.jpg'},
            {src: 'img/actors/jimmy_smits.jpg'},
            {src: 'img/actors/temuera_morrison.jpg'},
            {src: 'img/actors/leeanna_walsman.jpg'},
            {src: 'img/actors/ron_falk.jpg'},
          ];
          break;
        case 8:
          this.actorsName = [
            {actorName: 'Энтони Фелан'},
            {actorName: 'Рина Оуэн'},
            {actorName: 'Алетеа МакГрат'},
            {actorName: ''},
            {actorName: 'Кристофер Трасуэлл'},
            {actorName: 'Кристофер Трасуэлл'},
            {actorName: 'Орли Шошан'},
            {actorName: 'Джон Ди Маджо'},
            {actorName: 'Майкл Кингма'},
            {actorName: 'Роэн Николь'},
          ];
  
          
          this.actorsImg = [
            {src: 'img/actors/anthony_phelan.jpg'},
            {src: 'img/actors/rena_owen.jpg'},
            {src: 'img/actors/alethea_mcgrath.png'},
            {src: 'img/actors/r4_p17.jpg'},
            {src: 'img/actors/christopher_truswell.jpg'},
            {src: 'img/actors/christopher_truswell.jpg'},
            {src: 'img/actors/orli_shoshan.jpg'},
            {src: 'img/actors/john_dimaggio.jpeg'},
            {src: 'img/actors/michael_kingma.jpg'},
            {src: 'img/actors/rohan_nichol.jpg'},
          ];
          break;
        case 9:
          this.actorsName = [
            {actorName: 'Сэнди Финлэй'},
            {actorName: 'Брюс Спенс'},
          ];
  
          
          this.actorsImg = [
            {src: 'img/actors/sandi_finlay.jpg'},
            {src: 'img/actors/bruce_spence.jpg'},
          ];
          break;
        }

        this.actorsData(this.actorsPageNumber);
      },

      actorsPrevPage() {
        if (this.actorsPageNumber > 1) {
          this.actorsPageNumber--;
        }
        
        switch (this.actorsPageNumber) {
        case 1: this.actorsName = [
          {actorName: 'Марк Хэмилл'},
          {actorName: 'Энтони Дэниелс'},
          {actorName: 'Кенни Бейкер'},
          {actorName: 'Дэвид Проуз'},
          {actorName: 'Кэрри Фишер'},
          {actorName: 'Джоэл Эдгертон'},
          {actorName: 'Бонни Писз'},
          {actorName: ''},
          {actorName: 'Гэррик Хэгон'},
          {actorName: 'Юэн Макгрегор'},
        ];

        this.actorsImg = [
          {src: 'img/actors/mark_hamill.jpg'},
          {src: 'img/actors/anthony_daniels.jpg'},
          {src: 'img/actors/kenny_baker.jpg'},
          {src: 'img/actors/david_prowse.jpg'},
          {src: 'img/actors/carrie_fisher.jpg'},
          {src: 'img/actors/joel_edgerton.jpeg'},
          {src: 'img/actors/bonnie_piesse.jpg'},
          {src: 'img/actors/r5_d4.jpg'},
          {src: 'img/actors/garrick_hagon.jpg'},
          {src: 'img/actors/ewan_mcgregor.jpg'},
        ];
        break;

        case 2:
          this.actorsName = [
            {actorName: 'Хайден Кристенсен'},
            {actorName: 'Питер Кушинг'},
            {actorName: 'Питер Мейхью'},
            {actorName: 'Харрисон Форд'},
            {actorName: 'Пол Блейк'},
            {actorName: 'Дэвид Барклай'},
            {actorName: 'Колин Хиггинс'},
            {actorName: 'Уильям Хуткинс'},
            {actorName: ''},
            {actorName: 'Иэн Макдёрмид'},
          ];
  
          
          this.actorsImg = [
            {src: 'img/actors/hayden_christensen.jpg'},
            {src: 'img/actors/peter_cushing.jpg'},
            {src: 'img/actors/peter_mayhew.jpg'},
            {src: 'img/actors/harrison_ford.jpg'},
            {src: 'img/actors/paul_blake.jpg'},
            {src: 'img/actors/david_barclay.jpg'},
            {src: 'img/actors/colin_higgins.jpg'},
            {src: 'img/actors/william_hutkins.jpg'},
            {src: 'img/actors/yoda.jpg'},
            {src: 'img/actors/ian_mcDiarmid.jpg'},
          ];
          break;
        case 3:
          this.actorsName = [
            {actorName: 'Джереми Буллок'},
            {actorName: ''},
            {actorName: 'Аллан Харрис'},
            {actorName: 'Билли Ди Уильямс'},
            {actorName: 'Джон Холлис'},
            {actorName: 'Тимоти Д. Роуз'},
            {actorName: "Женевьева О'Рейли"},
            {actorName: 'Хилтон Макрей'},
            {actorName: ''},
            {actorName: 'Майк Куинн'},
          ];
  
          
          this.actorsImg = [
            {src: 'img/actors/jeremy_bullock.jpeg'},
            {src: 'img/actors/ig_88.jpg'},
            {src: 'img/actors/allan_harris.jpg'},
            {src: 'img/actors/billy_dee_williams.jpg'},
            {src: 'img/actors/john_hollis.jpg'},
            {src: 'img/actors/timothy_d_rose.jpg'},
            {src: "img/actors/genevieve_o_reilly.jpg"},
            {src: 'img/actors/hilton_mcrae.jpg'},
            {src: 'img/actors/wicket_systri_warrick.jpg'},
            {src: 'img/actors/mike_quinn.jpg'},
          ];
          break;
        case 4:
          this.actorsName = [
            {actorName: 'Лиам Нисон'},
            {actorName: 'Силас Карсон'},
            {actorName: 'Теренс Стэмп'},
            {actorName: 'Натали Портман'},
            {actorName: 'Ахмед Бест'},
            {actorName: 'Стив Спайрс'},
            {actorName: 'Брайан Блессед'},
            {actorName: 'Ральф Браун'},
            {actorName: 'Эндрю Сиком'},
            {actorName: 'Льюис Маклауд'},
          ];
  
          
          this.actorsImg = [
            {src: 'img/actors/liam_neeson.jpg'},
            {src: 'img/actors/silas_carson.jpg'},
            {src: 'img/actors/terence_stamp.jpg'},
            {src: 'img/actors/natalie_portman.jpg'},
            {src: 'img/actors/ahmed_best.jpg'},
            {src: 'img/actors/steve_speirs.jpg'},
            {src: 'img/actors/brian_blessed.jpg'},
            {src: 'img/actors/ralph_brown.jpg'},
            {src: 'img/actors/andrew_seecom.jpg'},
            {src: 'img/actors/lewis_macleod.jpg'},
          ];
          break;
        case 5:
          this.actorsName = [
            {actorName: 'Хью Куарши'},
            {actorName: 'Пернилла Аугуст'},
            {actorName: 'Рэй Парк'},
            {actorName: 'Мэттью Вуд'},
            {actorName: 'Дженнифер Хейл'},
            {actorName: ''},
            {actorName: ''},
            {actorName: ''},
            {actorName: ''},
            {actorName: 'Сэмюэл Л. Джексон'},
          ];
  
          
          this.actorsImg = [
            {src: 'img/actors/hugh_quarshi.jpg'},
            {src: 'img/actors/pernilla_august.jpg'},
            {src: 'img/actors/ray_park.jpg'},
            {src: 'img/actors/matthew_wood.jpg'},
            {src: 'img/actors/jennifer_hale.jpg'},
            {src: 'img/actors/ratts_tyerel.jpg'},
            {src: 'img/actors/dud_bolt.jpg'},
            {src: 'img/actors/gasgano.jpg'},
            {src: 'img/actors/ben_quadinaros.jpg'},
            {src: 'img/actors/samuel_l_jackson.jpg'},
          ];
          break;
        case 6:
          this.actorsName = [
            {actorName: 'Сайлас Карсон'},
            {actorName: ''},
            {actorName: 'Хассани Шапи'},
            {actorName: 'Джин Кларк'},
            {actorName: 'Хан Бонфилс'},
            {actorName: 'Мишель Тейлор'},
            {actorName: 'Алан Раскоу'},
            {actorName: 'Джером Блейк'},
            {actorName: ''},
            {actorName: ''},
          ];
  
          this.actorsImg = [
            {src: 'img/actors/silas_carson.jpg'},
            {src: 'img/actors/kit_fisto.jpg'},
            {src: 'img/actors/hassani_shapi.jpg'},
            {src: 'img/actors/gin_clarke.jpg'},
            {src: 'img/actors/khan_bonfils.jpg'},
            {src: 'img/actors/not_found.jpeg'},
            {src: 'img/actors/alan_ruscoe.png'},
            {src: 'img/actors/jerome_blake.jpg'},
            {src: 'img/actors/gregar_typho.jpg'},
            {src: 'img/actors/not_found.jpeg'},
          ];
          break;
        case 7:
          this.actorsName = [
            {actorName: 'Джек Томпсон'},
            {actorName: 'Ричард Страйд'},
            {actorName: 'Фэй Дэвид'},
            {actorName: 'Налини Кришан'},
            {actorName: 'Роуз Бирн'},
            {actorName: 'Кристофер Ли'},
            {actorName: 'Джимми Смитс'},
            {actorName: 'Темуера Моррисон'},
            {actorName: 'Лианна Уолсмен'},
            {actorName: 'Рон Фальк'},
          ];
  
          
          this.actorsImg = [
            {src: 'img/actors/jack_thompson.jpg'},
            {src: 'img/actors/richard_stride.jpg'},
            {src: 'img/actors/fay_david.jpg'},
            {src: 'img/actors/nalini_krishan.jpg'},
            {src: 'img/actors/rose_byrne.jpg'},
            {src: 'img/actors/christopher_lee.jpg'},
            {src: 'img/actors/jimmy_smits.jpg'},
            {src: 'img/actors/temuera_morrison.jpg'},
            {src: 'img/actors/leeanna_walsman.jpg'},
            {src: 'img/actors/ron_falk.jpg'},
          ];
          break;
        case 8:
          this.actorsName = [
            {actorName: 'Энтони Фелан'},
            {actorName: 'Рина Оуэн'},
            {actorName: 'Алетеа МакГрат'},
            {actorName: ''},
            {actorName: 'Кристофер Трасуэлл'},
            {actorName: 'Кристофер Трасуэлл'},
            {actorName: 'Орли Шошан'},
            {actorName: 'Джон Ди Маджо'},
            {actorName: 'Майкл Кингма'},
            {actorName: 'Роэн Николь'},
          ];
  
          
          this.actorsImg = [
            {src: 'img/actors/anthony_phelan.jpg'},
            {src: 'img/actors/rena_owen.jpg'},
            {src: 'img/actors/alethea_mcgrath.png'},
            {src: 'img/actors/r4_p17.jpg'},
            {src: 'img/actors/christopher_truswell.jpg'},
            {src: 'img/actors/christopher_truswell.jpg'},
            {src: 'img/actors/orli_shoshan.jpg'},
            {src: 'img/actors/john_dimaggio.jpeg'},
            {src: 'img/actors/michael_kingma.jpg'},
            {src: 'img/actors/rohan_nichol.jpg'},
          ];
          break;
        case 9:
          this.actorsName = [
            {actorName: 'Сэнди Финлэй'},
            {actorName: 'Брюс Спенс'},
          ];
  
          
          this.actorsImg = [
            {src: 'img/actors/sandi_finlay.jpg'},
            {src: 'img/actors/bruce_spence.jpg'},
          ];
          break;
        }

        this.actorsData(this.actorsPageNumber);
      },

      starshipsNextPage(){
        if (this.starshipsPageNumber < this.starshipsMaxPageNumber) {
          this.starshipsPageNumber++;
        }

        switch(this.starshipsPageNumber) {
          case 1:
            this.starshipsImg = [
              {src: 'img/starships/cr90_corvette.jpg'},
              {src: 'img/starships/star_destroyer.jpg'},
              {src: 'img/starships/sentinel_class_landing_craft.jpg'},
              {src: 'img/starships/death_star.jpg'},
              {src: 'img/starships/millennium_falcon.jpg'},
              {src: 'img/starships/y_wing.jpg'},
              {src: 'img/starships/x_wing.jpg'},
              {src: 'img/starships/tie_advanced_x1.png'},
              {src: 'img/starships/executor.png'},
              {src: 'img/starships/rebel_transport.jpg'},
            ];
            break;
          case 2:
            this.starshipsImg = [
              {src: 'img/starships/slave_1.jpg'},
              {src: 'img/starships/imperial_shuttle.jpg'},
              {src: 'img/starships/ef76_nebulon_b_escort_frigate.png'},
              {src: 'img/starships/calamari_cruiser.jpg'},
              {src: 'img/starships/a_wing.jpg'},
              {src: 'img/starships/b_wing.jpg'},
              {src: 'img/starships/republic_cruiser.jpg'},
              {src: 'img/starships/droid_control_ship.jpg'},
              {src: 'img/starships/naboo_fighter.jpg'},
              {src: 'img/starships/naboo_royal_starship.jpg'},
            ];
            break;
          case 3:
            this.starshipsImg = [
              {src: 'img/starships/scimitar.jpg'},
              {src: 'img/starships/j_type_diplomatic_barge.jpg'},
              {src: 'img/starships/aa_9_coruscant_freighter.JPG'},
              {src: 'img/starships/jedi_starfighter.jpg'},
              {src: 'img/starships/h_type_nubian_yacht.jpeg'},
              {src: 'img/starships/republic_assault_ship.jpeg'},
              {src: "img/starships/solar_sailer.jpg"},
              {src: 'img/starships/trade_federation_cruiser.jpg'},
              {src: 'img/starships/theta_class_t_2c_shuttle.jpg'},
              {src: 'img/starships/republic_attack_cruiser.jpg'},
            ];
            break;
          case 4:
            this.starshipsImg = [
              {src: 'img/starships/naboo_star_skiff.jpg'},
              {src: 'img/starships/jedi_interceptor.jpg'},
              {src: 'img/starships/arc_170.jpg'},
              {src: 'img/starships/banking_clan_frigte.jpg'},
              {src: 'img/starships/belbullab_22_starfighter.jpg'},
              {src: 'img/starships/v_wing.jpg'},
            ];
            break;
        }

        this.starshipsData(this.starshipsPageNumber);
      },

      starshipsPrevPage(){
        if (this.starshipsPageNumber > 1) {
          this.starshipsPageNumber--;
        }

        switch(this.starshipsPageNumber) {
          case 1:
            this.starshipsImg = [
              {src: 'img/starships/cr90_corvette.jpg'},
              {src: 'img/starships/star_destroyer.jpg'},
              {src: 'img/starships/sentinel_class_landing_craft.jpg'},
              {src: 'img/starships/death_star.jpg'},
              {src: 'img/starships/millennium_falcon.jpg'},
              {src: 'img/starships/y_wing.jpg'},
              {src: 'img/starships/x_wing.jpg'},
              {src: 'img/starships/tie_advanced_x1.png'},
              {src: 'img/starships/executor.png'},
              {src: 'img/starships/rebel_transport.jpg'},
            ];
            break;
          case 2:
            this.starshipsImg = [
              {src: 'img/starships/slave_1.jpg'},
              {src: 'img/starships/imperial_shuttle.jpg'},
              {src: 'img/starships/ef76_nebulon_b_escort_frigate.png'},
              {src: 'img/starships/calamari_cruiser.jpg'},
              {src: 'img/starships/a_wing.jpg'},
              {src: 'img/starships/b_wing.jpg'},
              {src: 'img/starships/republic_cruiser.jpg'},
              {src: 'img/starships/droid_control_ship.jpg'},
              {src: 'img/starships/naboo_fighter.jpg'},
              {src: 'img/starships/naboo_royal_starship.jpg'},
            ];
            break;
          case 3:
            this.starshipsImg = [
              {src: 'img/starships/scimitar.jpg'},
              {src: 'img/starships/j_type_diplomatic_barge.jpg'},
              {src: 'img/starships/aa_9_coruscant_freighter.JPG'},
              {src: 'img/starships/jedi_starfighter.jpg'},
              {src: 'img/starships/h_type_nubian_yacht.jpeg'},
              {src: 'img/starships/republic_assault_ship.jpeg'},
              {src: "img/starships/solar_sailer.jpg"},
              {src: 'img/starships/trade_federation_cruiser.jpg'},
              {src: 'img/starships/theta_class_t_2c_shuttle.jpg'},
              {src: 'img/starships/republic_attack_cruiser.jpg'},
            ];
            break;
          case 4:
            this.starshipsImg = [
              {src: 'img/starships/naboo_star_skiff.jpg'},
              {src: 'img/starships/jedi_interceptor.jpg'},
              {src: 'img/starships/arc_170.jpg'},
              {src: 'img/starships/banking_clan_frigte.jpg'},
              {src: 'img/starships/belbullab_22_starfighter.jpg'},
              {src: 'img/starships/v_wing.jpg'},
            ];
            break;
        }

        this.starshipsData(this.starshipsPageNumber);
      },

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

          this.actorsMaxPageNumber = Math.round(response.data.count/10)+1;

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

          this.starshipsMaxPageNumber = Math.round(response.data.count/10);

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
