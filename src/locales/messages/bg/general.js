const messages = {
    navigation: {
        categories: 'Категории',
        category: 'Категория "{title}"',
        locality: 'Община {title}',
        localities: 'Общини ({count})',
        homepage: 'Начало',
        place: '{title}',
        places: 'Забележителности',
        region: '{title}',
        regions: 'Туристически райони'
    },
    colorMode: {
        toggleToLight: 'Превключване към светла тема',
        toggleToDark: 'Превключване към тъмна тема'
    },
    unit: {
        celsius: '°C',
        fahrenheit: '°F',
        coords: 'GPS координати - <strong>{latitude}</strong> географска ширина и <strong>{longitude}</strong> географска дължина.',
        altitude: {
            short: 'м. н.в.',
            long: 'Метра надморска височина.'
        }
    },
    nameOfDay: {
        0: 'Неделя',
        1: 'Понеделник',
        2: 'Вторник',
        3: 'Сряда',
        4: 'Четвъртък',
        5: 'Петък',
        6: 'Събота'
    },
    settings: 'Настройки',
    logout: 'Изход',
    search: 'Търсене',
    loading: 'Зареждане...',
    seeMore: 'Виж повече',
    showMore: 'Покажи повече',
    showLess: 'Покажи по-малко',
    noResults: 'Няма резултати, които да покажем.',
    close: 'Затвори',
    clear: 'Изчисти',
    filters: {
        filterBy: 'Филтрирай по',
        autosaving: 'Всеки избор, който направиш, ще се отрази в резултатите мигновено.',
        categories: 'Категории',
        categoriesCounter: 'Категории ({n})',
        regionsAndLocalities: 'Туристически райони и общини',
        regionsAndLocalitiesCounter: 'Туристически райони и общини ({n})',
        rating: 'Рейтинг',
        ratingCounter: 'Рейтинг ({n})',
        searchPlaceholder: 'Започнете да пишете...'
    },
    pagination: {
        next: 'Напред',
        previous: 'Назад',
        pages: 'Страница <strong>{current}</strong> от <strong>{total}</strong>.<br>Общо <strong>{places}</strong> забележителности.'
    },
    headerEnvironment: {
        production:
            'Това е прототип на проект с отворен код. Насочи се към <a href="{repo}" target="_blank" rel="noopener">GitHub хранилището</a>, за да допринесеш.',
        staging: 'Тестова среда',
        local: 'Среда за разработка'
    },
    footer: {
        description:
            '<p>Отправи се на пътешествие, за да откриеш тайните кътчета на България, където историята и културата са преплетени, за да създадат спиращи дъха гледки.</p><p>Нашата цел е да хвърлим светлина върху богатото наследство и уникалните истории зад всяка забележителност и да те вдъхновим да ги посетиш и изживееш.</p>',
        rights: 'всички права запазени',
        regarding: 'Относно',
        links: {
            about: 'За проекта',
            contact: 'Връзка с нас',
            terms: 'Общи условия',
            privacyPolicy: 'Лични данни',
            cookies: 'Бисквитки'
        }
    }
}

export default messages
