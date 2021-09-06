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
          {src: '/actors/mark_hamill.jpg' as string},
          {src: '/actors/anthony_daniels.jpg' as string},
          {src: '/actors/kenny_baker.jpg' as string},
          {src: '/actors/david_prowse.jpg' as string},
          {src: '/actors/carrie_fisher.jpg' as string},
          {src: '/actors/joel_edgerton.jpeg' as string},
          {src: '/actors/bonnie_piesse.jpg' as string},
          {src: '/actors/r5_d4.jpg' as string},
          {src: '/actors/garrick_hagon.jpg' as string},
          {src: '/actors/ewan_mcgregor.jpg' as string},
        ],
        
        // Переменные категории Starships
        starships: [] as any,
        filteredStarships: [] as any,
        starshipsPageNumber: 1 as number,
        starshipsMaxPageNumber: 1 as number,
        starshipsImg: [
          {src: '/starships/cr90_corvette.jpg' as string},
          {src: '/starships/star_destroyer.jpg' as string},
          {src: '/starships/sentinel_class_landing_craft.jpg' as string},
          {src: '/starships/death_star.jpg' as string},
          {src: '/starships/millennium_falcon.jpg' as string},
          {src: '/starships/y_wing.jpg' as string},
          {src: '/starships/x_wing.jpg' as string},
          {src: '/starships/tie_advanced_x1.png' as string},
          {src: '/starships/executor.png' as string},
          {src: '/starships/rebel_transport.jpg' as string},
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
          {src: '/actors/mark_hamill.jpg'},
          {src: '/actors/anthony_daniels.jpg'},
          {src: '/actors/kenny_baker.jpg'},
          {src: '/actors/david_prowse.jpg'},
          {src: '/actors/carrie_fisher.jpg'},
          {src: '/actors/joel_edgerton.jpeg'},
          {src: '/actors/bonnie_piesse.jpg'},
          {src: '/actors/r5_d4.jpg'},
          {src: '/actors/garrick_hagon.jpg'},
          {src: '/actors/ewan_mcgregor.jpg'},
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
            {src: '/actors/hayden_christensen.jpg'},
            {src: '/actors/peter_cushing.jpg'},
            {src: '/actors/peter_mayhew.jpg'},
            {src: '/actors/harrison_ford.jpg'},
            {src: '/actors/paul_blake.jpg'},
            {src: '/actors/david_barclay.jpg'},
            {src: '/actors/colin_higgins.jpg'},
            {src: '/actors/william_hutkins.jpg'},
            {src: '/actors/yoda.jpg'},
            {src: '/actors/ian_mcDiarmid.jpg'},
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
            {src: '/actors/jeremy_bullock.jpeg'},
            {src: '/actors/ig_88.jpg'},
            {src: '/actors/allan_harris.jpg'},
            {src: '/actors/billy_dee_williams.jpg'},
            {src: '/actors/john_hollis.jpg'},
            {src: '/actors/timothy_d_rose.jpg'},
            {src: "/actors/genevieve_o_reilly.jpg"},
            {src: '/actors/hilton_mcrae.jpg'},
            {src: '/actors/wicket_systri_warrick.jpg'},
            {src: '/actors/mike_quinn.jpg'},
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
            {src: '/actors/liam_neeson.jpg'},
            {src: '/actors/silas_carson.jpg'},
            {src: '/actors/terence_stamp.jpg'},
            {src: '/actors/natalie_portman.jpg'},
            {src: '/actors/ahmed_best.jpg'},
            {src: '/actors/steve_speirs.jpg'},
            {src: '/actors/brian_blessed.jpg'},
            {src: '/actors/ralph_brown.jpg'},
            {src: '/actors/andrew_seecom.jpg'},
            {src: '/actors/lewis_macleod.jpg'},
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
            {src: '/actors/hugh_quarshi.jpg'},
            {src: '/actors/pernilla_august.jpg'},
            {src: '/actors/ray_park.jpg'},
            {src: '/actors/matthew_wood.jpg'},
            {src: '/actors/jennifer_hale.jpg'},
            {src: '/actors/ratts_tyerel.jpg'},
            {src: '/actors/dud_bolt.jpg'},
            {src: '/actors/gasgano.jpg'},
            {src: '/actors/ben_quadinaros.jpg'},
            {src: '/actors/samuel_l_jackson.jpg'},
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
            {src: '/actors/silas_carson.jpg'},
            {src: '/actors/kit_fisto.jpg'},
            {src: '/actors/hassani_shapi.jpg'},
            {src: '/actors/gin_clarke.jpg'},
            {src: '/actors/khan_bonfils.jpg'},
            {src: '/actors/not_found.jpeg'},
            {src: '/actors/alan_ruscoe.png'},
            {src: '/actors/jerome_blake.jpg'},
            {src: '/actors/gregar_typho.jpg'},
            {src: '/actors/not_found.jpeg'},
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
            {src: '/actors/jack_thompson.jpg'},
            {src: '/actors/richard_stride.jpg'},
            {src: '/actors/fay_david.jpg'},
            {src: '/actors/nalini_krishan.jpg'},
            {src: '/actors/rose_byrne.jpg'},
            {src: '/actors/christopher_lee.jpg'},
            {src: '/actors/jimmy_smits.jpg'},
            {src: '/actors/temuera_morrison.jpg'},
            {src: '/actors/leeanna_walsman.jpg'},
            {src: '/actors/ron_falk.jpg'},
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
            {src: '/actors/anthony_phelan.jpg'},
            {src: '/actors/rena_owen.jpg'},
            {src: '/actors/alethea_mcgrath.png'},
            {src: '/actors/r4_p17.jpg'},
            {src: '/actors/christopher_truswell.jpg'},
            {src: '/actors/christopher_truswell.jpg'},
            {src: '/actors/orli_shoshan.jpg'},
            {src: '/actors/john_dimaggio.jpeg'},
            {src: '/actors/michael_kingma.jpg'},
            {src: '/actors/rohan_nichol.jpg'},
          ];
          break;
        case 9:
          this.actorsName = [
            {actorName: 'Сэнди Финлэй'},
            {actorName: 'Брюс Спенс'},
          ];
  
          this.actorsImg = [
            {src: '/actors/sandi_finlay.jpg'},
            {src: '/actors/bruce_spence.jpg'},
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
          {src: '/actors/mark_hamill.jpg'},
          {src: '/actors/anthony_daniels.jpg'},
          {src: '/actors/kenny_baker.jpg'},
          {src: '/actors/david_prowse.jpg'},
          {src: '/actors/carrie_fisher.jpg'},
          {src: '/actors/joel_edgerton.jpeg'},
          {src: '/actors/bonnie_piesse.jpg'},
          {src: '/actors/r5_d4.jpg'},
          {src: '/actors/garrick_hagon.jpg'},
          {src: '/actors/ewan_mcgregor.jpg'},
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
            {src: '/actors/hayden_christensen.jpg'},
            {src: '/actors/peter_cushing.jpg'},
            {src: '/actors/peter_mayhew.jpg'},
            {src: '/actors/harrison_ford.jpg'},
            {src: '/actors/paul_blake.jpg'},
            {src: '/actors/david_barclay.jpg'},
            {src: '/actors/colin_higgins.jpg'},
            {src: '/actors/william_hutkins.jpg'},
            {src: '/actors/yoda.jpg'},
            {src: '/actors/ian_mcDiarmid.jpg'},
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
            {src: '/actors/jeremy_bullock.jpeg'},
            {src: '/actors/ig_88.jpg'},
            {src: '/actors/allan_harris.jpg'},
            {src: '/actors/billy_dee_williams.jpg'},
            {src: '/actors/john_hollis.jpg'},
            {src: '/actors/timothy_d_rose.jpg'},
            {src: "/actors/genevieve_o_reilly.jpg"},
            {src: '/actors/hilton_mcrae.jpg'},
            {src: '/actors/wicket_systri_warrick.jpg'},
            {src: '/actors/mike_quinn.jpg'},
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
            {src: '/actors/liam_neeson.jpg'},
            {src: '/actors/silas_carson.jpg'},
            {src: '/actors/terence_stamp.jpg'},
            {src: '/actors/natalie_portman.jpg'},
            {src: '/actors/ahmed_best.jpg'},
            {src: '/actors/steve_speirs.jpg'},
            {src: '/actors/brian_blessed.jpg'},
            {src: '/actors/ralph_brown.jpg'},
            {src: '/actors/andrew_seecom.jpg'},
            {src: '/actors/lewis_macleod.jpg'},
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
            {src: '/actors/hugh_quarshi.jpg'},
            {src: '/actors/pernilla_august.jpg'},
            {src: '/actors/ray_park.jpg'},
            {src: '/actors/matthew_wood.jpg'},
            {src: '/actors/jennifer_hale.jpg'},
            {src: '/actors/ratts_tyerel.jpg'},
            {src: '/actors/dud_bolt.jpg'},
            {src: '/actors/gasgano.jpg'},
            {src: '/actors/ben_quadinaros.jpg'},
            {src: '/actors/samuel_l_jackson.jpg'},
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
            {src: '/actors/silas_carson.jpg'},
            {src: '/actors/kit_fisto.jpg'},
            {src: '/actors/hassani_shapi.jpg'},
            {src: '/actors/gin_clarke.jpg'},
            {src: '/actors/khan_bonfils.jpg'},
            {src: '/actors/not_found.jpeg'},
            {src: '/actors/alan_ruscoe.png'},
            {src: '/actors/jerome_blake.jpg'},
            {src: '/actors/gregar_typho.jpg'},
            {src: '/actors/not_found.jpeg'},
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
            {src: '/actors/jack_thompson.jpg'},
            {src: '/actors/richard_stride.jpg'},
            {src: '/actors/fay_david.jpg'},
            {src: '/actors/nalini_krishan.jpg'},
            {src: '/actors/rose_byrne.jpg'},
            {src: '/actors/christopher_lee.jpg'},
            {src: '/actors/jimmy_smits.jpg'},
            {src: '/actors/temuera_morrison.jpg'},
            {src: '/actors/leeanna_walsman.jpg'},
            {src: '/actors/ron_falk.jpg'},
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
            {src: '/actors/anthony_phelan.jpg'},
            {src: '/actors/rena_owen.jpg'},
            {src: '/actors/alethea_mcgrath.png'},
            {src: '/actors/r4_p17.jpg'},
            {src: '/actors/christopher_truswell.jpg'},
            {src: '/actors/christopher_truswell.jpg'},
            {src: '/actors/orli_shoshan.jpg'},
            {src: '/actors/john_dimaggio.jpeg'},
            {src: '/actors/michael_kingma.jpg'},
            {src: '/actors/rohan_nichol.jpg'},
          ];
          break;
        case 9:
          this.actorsName = [
            {actorName: 'Сэнди Финлэй'},
            {actorName: 'Брюс Спенс'},
          ];
  
          
          this.actorsImg = [
            {src: '/actors/sandi_finlay.jpg'},
            {src: '/actors/bruce_spence.jpg'},
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
              {src: '/starships/cr90_corvette.jpg'},
              {src: '/starships/star_destroyer.jpg'},
              {src: '/starships/sentinel_class_landing_craft.jpg'},
              {src: '/starships/death_star.jpg'},
              {src: '/starships/millennium_falcon.jpg'},
              {src: '/starships/y_wing.jpg'},
              {src: '/starships/x_wing.jpg'},
              {src: '/starships/tie_advanced_x1.png'},
              {src: '/starships/executor.png'},
              {src: '/starships/rebel_transport.jpg'},
            ];
            break;
          case 2:
            this.starshipsImg = [
              {src: '/starships/slave_1.jpg'},
              {src: '/starships/imperial_shuttle.jpg'},
              {src: '/starships/ef76_nebulon_b_escort_frigate.png'},
              {src: '/starships/calamari_cruiser.jpg'},
              {src: '/starships/a_wing.jpg'},
              {src: '/starships/b_wing.jpg'},
              {src: '/starships/republic_cruiser.jpg'},
              {src: '/starships/droid_control_ship.jpg'},
              {src: '/starships/naboo_fighter.jpg'},
              {src: '/starships/naboo_royal_starship.jpg'},
            ];
            break;
          case 3:
            this.starshipsImg = [
              {src: '/starships/scimitar.jpg'},
              {src: '/starships/j_type_diplomatic_barge.jpg'},
              {src: '/starships/aa_9_coruscant_freighter.JPG'},
              {src: '/starships/jedi_starfighter.jpg'},
              {src: '/starships/h_type_nubian_yacht.jpeg'},
              {src: '/starships/republic_assault_ship.jpeg'},
              {src: "/starships/solar_sailer.jpg"},
              {src: '/starships/trade_federation_cruiser.jpg'},
              {src: '/starships/theta_class_t_2c_shuttle.jpg'},
              {src: '/starships/republic_attack_cruiser.jpg'},
            ];
            break;
          case 4:
            this.starshipsImg = [
              {src: '/starships/naboo_star_skiff.jpg'},
              {src: '/starships/jedi_interceptor.jpg'},
              {src: '/starships/arc_170.jpg'},
              {src: '/starships/banking_clan_frigte.jpg'},
              {src: '/starships/belbullab_22_starfighter.jpg'},
              {src: '/starships/v_wing.jpg'},
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
              {src: '/starships/cr90_corvette.jpg'},
              {src: '/starships/star_destroyer.jpg'},
              {src: '/starships/sentinel_class_landing_craft.jpg'},
              {src: '/starships/death_star.jpg'},
              {src: '/starships/millennium_falcon.jpg'},
              {src: '/starships/y_wing.jpg'},
              {src: '/starships/x_wing.jpg'},
              {src: '/starships/tie_advanced_x1.png'},
              {src: '/starships/executor.png'},
              {src: '/starships/rebel_transport.jpg'},
            ];
            break;
          case 2:
            this.starshipsImg = [
              {src: '/starships/slave_1.jpg'},
              {src: '/starships/imperial_shuttle.jpg'},
              {src: '/starships/ef76_nebulon_b_escort_frigate.png'},
              {src: '/starships/calamari_cruiser.jpg'},
              {src: '/starships/a_wing.jpg'},
              {src: '/starships/b_wing.jpg'},
              {src: '/starships/republic_cruiser.jpg'},
              {src: '/starships/droid_control_ship.jpg'},
              {src: '/starships/naboo_fighter.jpg'},
              {src: '/starships/naboo_royal_starship.jpg'},
            ];
            break;
          case 3:
            this.starshipsImg = [
              {src: '/starships/scimitar.jpg'},
              {src: '/starships/j_type_diplomatic_barge.jpg'},
              {src: '/starships/aa_9_coruscant_freighter.JPG'},
              {src: '/starships/jedi_starfighter.jpg'},
              {src: '/starships/h_type_nubian_yacht.jpeg'},
              {src: '/starships/republic_assault_ship.jpeg'},
              {src: "/starships/solar_sailer.jpg"},
              {src: '/starships/trade_federation_cruiser.jpg'},
              {src: '/starships/theta_class_t_2c_shuttle.jpg'},
              {src: '/starships/republic_attack_cruiser.jpg'},
            ];
            break;
          case 4:
            this.starshipsImg = [
              {src: '/starships/naboo_star_skiff.jpg'},
              {src: '/starships/jedi_interceptor.jpg'},
              {src: '/starships/arc_170.jpg'},
              {src: '/starships/banking_clan_frigte.jpg'},
              {src: '/starships/belbullab_22_starfighter.jpg'},
              {src: '/starships/v_wing.jpg'},
            ];
            break;
        }

        this.starshipsData(this.starshipsPageNumber);
      },

      // GET запросы
      filmsData() {
        return axios.get('https://swapi.dev/api/films').then(function(response){
          let filmsImg = [
            {src: '/films/sw_a_new_hope.jpg'},
            {src: '/films/sw_the_empire_strikes_back.jpg'},
            {src: '/films/sw_return_of_jedi.jpg'},
            {src: '/films/sw_phantom_menace.jpg'},
            {src: '/films/sw_attack_of_the_clones.jpg'},
            {src: '/films/sw_revenge_of_the_sith.jpg'},
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
