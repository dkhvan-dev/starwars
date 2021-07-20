const vue = new Vue({
  el: '#app',
  data: {
    // Переменные категории Films
		films: [],
		filteredFilms: [],
    
    // Переменные категории Actors
    actors: [],
    filteredActors: [],
    actorsPageNumber: 1,
    actorsName: [
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
    ],
    actorsImg: [
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
    ],
    
    // Переменные категории Starships
    starships: [],
    filteredStarships: [],
    starshipsPageNumber: 1,
    starshipsImg: [
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
    ],

    // Переменные поисковиков
    searchFilm: '',
		searchActor: '',
		searchStarship: '',
	},

	methods: {

    // Поисковик фильма
		filmSearchHandler() {
			if (this.searchFilm === '') {
				this.filteredFilms = this.films;
			}
			const regexp = new RegExp(this.searchFilm, 'i');
			this.filteredFilms = this.films.filter((good) => regexp.test(good.title));
      this.filteredFilms = this.films.filter((good) => regexp.test(good.episode_id));
      this.filteredFilms = this.films.filter((good) => regexp.test(good.director));
      this.filteredFilms = this.films.filter((good) => regexp.test(good.producer));
      this.filteredFilms = this.films.filter((good) => regexp.test(good.release_date));
      this.filteredFilms = this.films.filter((good) => regexp.test(good.created));
      this.filteredFilms = this.films.filter((good) => regexp.test(good.edited));
		},

		// Поисковик актера
		actorSearchHandler() {
			if (this.searchActor === '') {
				this.filteredActors = this.actors;
			}
			const regexp = new RegExp(this.searchActor, 'i');
			this.filteredActors = this.actors.filter((good) => regexp.test(good.actorName));
      this.filteredActors = this.actors.filter((good) => regexp.test(good.name));
		},

		// Поисковик корабля
		starshipSearchHandler() {
			if (this.searchStarship === '') {
				this.filteredStarships = this.starships;
			}
			const regexp = new RegExp(this.searchStarship, 'i');
			this.filteredStarships = this.starships.filter((good) => regexp.test(good.name));
      this.filteredStarships = this.starships.filter((good) => regexp.test(good.starship_class));
      this.filteredStarships = this.starships.filter((good) => regexp.test(good.length));
		},

    // Пагинация
    actorsNextPage(){
			this.actorsPageNumber++;

      if (this.actorsPageNumber === 9) {
        document.querySelector('.actor__next-slide').setAttribute("disabled", "disabled");
        document.querySelector('.actor__prev-slide').removeAttribute('disabled');
      } else {
        document.querySelector('.actor__prev-slide').removeAttribute('disabled');
        document.querySelector('.actor__next-slide').removeAttribute('disabled');
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

		actorsPrevPage(){
			this.actorsPageNumber--;
      if (this.actorsPageNumber == 0) {
        document.querySelector('.actor__prev-slide').setAttribute("disabled", false);
        document.querySelector('.actor__next-slide').removeAttribute('disabled');
      } else {
        document.querySelector('.actor__prev-slide').removeAttribute('disabled');
        document.querySelector('.actor__next-slide').removeAttribute('disabled');
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
			this.starshipsPageNumber++;

      if (this.starshipsPageNumber === 4) {
        document.querySelector('.starship__next-slide').setAttribute("disabled", "disabled");
        document.querySelector('.starship__prev-slide').removeAttribute('disabled');
      } else {
        document.querySelector('.starship__prev-slide').removeAttribute('disabled');
        document.querySelector('.starship__next-slide').removeAttribute('disabled');
      }

      if (this.starshipsPageNumber == 1) {
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
      }

      if (this.starshipsPageNumber == 2) {
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
      }

      if (this.starshipsPageNumber == 3) {
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
      }

      if (this.starshipsPageNumber == 4) {
        this.starshipsImg = [
          {src: 'img/starships/naboo_star_skiff.jpg'},
          {src: 'img/starships/jedi_interceptor.jpg'},
          {src: 'img/starships/arc_170.jpg'},
          {src: 'img/starships/banking_clan_frigte.jpg'},
          {src: 'img/starships/belbullab_22_starfighter.jpg'},
          {src: 'img/starships/v_wing.jpg'},
        ];
      }

      this.starshipsData(this.starshipsPageNumber);
		},

		starshipsPrevPage(){
			this.starshipsPageNumber--;
      if (this.starshipsPageNumber == 0) {
        document.querySelector('.starship__prev-slide').setAttribute("disabled", false);
        document.querySelector('.starship__next-slide').removeAttribute('disabled');
      } else {
        document.querySelector('.starship__prev-slide').removeAttribute('disabled');
        document.querySelector('.starship__next-slide').removeAttribute('disabled');
      }

      if (this.starshipsPageNumber == 1) {
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
      }

      if (this.starshipsPageNumber == 2) {
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
      }

      if (this.starshipsPageNumber == 3) {
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
      }

      if (this.starshipsPageNumber == 4) {
        this.starshipsImg = [
          {src: 'img/starships/naboo_star_skiff.jpg'},
          {src: 'img/starships/jedi_interceptor.jpg'},
          {src: 'img/starships/arc_170.jpg'},
          {src: 'img/starships/banking_clan_frigte.jpg'},
          {src: 'img/starships/belbullab_22_starfighter.jpg'},
          {src: 'img/starships/v_wing.jpg'},
        ];
      }

      this.starshipsData(this.starshipsPageNumber);
		},

    // GET запросы
    filmsData() {
      return axios.get('https://swapi.dev/api/films').then(function(response){
        let filmsImg = [
          {src: 'img/films/sw_a_new_hope.jpg'},
          {src: 'img/films/sw_the_empire_strikes_back.jpg'},
          {src: 'img/films/sw_return_of_jedi.jpg'},
          {src: 'img/films/sw_phantom_menace.jpg'},
          {src: 'img/films/sw_attack_of_the_clones.jpg'},
          {src: 'img/films/sw_revenge_of_the_sith.jpg'},
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

    actorsData(actorsPageNumber) { 

      return axios.get('https://swapi.dev/api/people/?page=' + actorsPageNumber).then(function(response){
        for(let j=0;j<response.data.results.length;j++) {
          response.data.results[j].actorName = vue.actorsName[j].actorName;
          response.data.results[j].src = vue.actorsImg[j].src;
        }
        vue.actors = response.data.results;
        vue.filteredActors = response.data.results;

        return response.data.results;
      });
    },

    starshipsData(starshipsPageNumber) { 
      return axios.get('https://swapi.dev/api/starships/?page=' + starshipsPageNumber).then(function(response){
        for(let j=0;j<response.data.results.length;j++) {
          response.data.results[j].src = vue.starshipsImg[j].src;
        }

        vue.starships = response.data.results;
        vue.filteredStarships = response.data.results;

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
});

// Vue Компоненты
Vue.component('films__list', {
  template: `<div class="film__slider"><ul class="film__slider-list">
  			<li v-for="film in vue.filteredFilms" class="film__slider-item">
  				<a href="#" class="film__list-link">
  					<img :src="film.src" class="film__list-poster">
  					<h2 class="film__list-name">{{film.title}}</h2>
  					<p class="film__list-year">Год: {{film.release_date}}</p>
            <p class="film__list-info">Номер эпизода: {{film.episode_id}}</p>
            <p class="film__list-info">Рейтинг: <span class="film__list-rating">{{film.rating}}</span></p>
  				</a>
  			</li>
  		</ul></div>`,

      props: ['filteredFilms']
});

Vue.component('actors__list', {
  template: `<div class="actor__slider">
      
  <button type="button" class="actor__prev-slide" 
					@click="vue.actorsPrevPage">
					&#10094;
			</button>
			<button type="button" class="actor__next-slide" 
          @click="vue.actorsNextPage">
					&#10095;
			</button>
      <ul class="actor__slider-list">
  			<li v-for="actor in vue.filteredActors" class="actor__slider-item">
  				<a href="#" class="actor__list-link">
  					<img :src="actor.src" class="actor__list-poster">
  					<h2 class="actor__list-name">{{actor.name}}</h2>
            <p class="actor__list-rus-name">{{actor.actorName}}</p>
  				</a>
  			</li>
  		</ul></div>`,

      props: ['filteredActors']
});

Vue.component('starships__list', {
  template: `<div class="starship__slider">
      <button type="button" class="starship__prev-slide" 
					@click="vue.starshipsPrevPage">
					&#10094;
			</button>
			<button type="button" class="starship__next-slide" 
          @click="vue.starshipsNextPage">
					&#10095;
			</button>
      <ul class="starship__slider-list">
  			<li v-for="starship in vue.filteredStarships" class="starship__slider-item">
  				<a href="#" class="starship__list-link">
  					<img :src="starship.src" class="starship__list-poster">
  					<h2 class="starship__list-name">{{starship.name}}</h2>
            <p class="starship__list-info">Класс: {{starship.starship_class}}</p>
            <p class="starship__list-info">Длина: {{starship.length}}</p>
  				</a>
  			</li>
  		</ul></div>`,

      props: ['filteredStarships']
});


