export type Language = "ky" | "ru";

export type LocalizedText = Readonly<{ ky: string; ru: string }>;
export type LocalizedList = Readonly<{ ky: readonly string[]; ru: readonly string[] }>;
export type LocalizableText = string | LocalizedText;

export type TimelineItem = Readonly<{
  time: string;
  title: LocalizedText;
  description?: LocalizedText;
}>;

export type DetailItem = Readonly<{
  title: LocalizedText;
  text: LocalizedText;
}>;

export type CountdownUnit = Readonly<{
  ky: string;
  ru: readonly [one: string, few: string, many: string];
}>;

export type WeddingConfig = Readonly<{
  defaultLanguage: Language;
  languages: ReadonlyArray<Readonly<{ code: Language; shortLabel: string; htmlLang: string }>>;
  couple: Readonly<{ groom: string; bride: string }>;
  event: Readonly<{
    date: string;
    startTime: string;
    timezone: string;
    displayDate: LocalizedText;
  }>;
  hosts: LocalizableText;
  venue: Readonly<{
    name: LocalizableText;
    address: LocalizableText;
    mapUrl: string;
    image: string;
    intro: LocalizedText;
    note: LocalizedText;
  }>;
  timeline: readonly TimelineItem[];
  details: readonly DetailItem[];
  dressCode: Readonly<{
    intro: LocalizedText;
    paletteImage: string;
    women: Readonly<{ title: LocalizedText; text: LocalizedText; images: readonly string[] }>;
    men: Readonly<{ title: LocalizedText; text: LocalizedText; images: readonly string[] }>;
  }>;
  contact: Readonly<{
    name: string;
    phone: string;
    text: LocalizedText;
    socials: readonly Readonly<{ type: "phone" | "whatsapp" | "telegram"; href: string; ariaLabel: string; target: "_self" | "_blank" }>[];
  }>;
  assets: Readonly<{
    introVideo: Readonly<{ webm?: string; mp4: string; poster: string }>;
    music: string;
    programmePhoto: string;
    closingPhoto: string;
    decor: Readonly<{
      flower: string;
      leaf: string;
      clusters: Readonly<{
        topLeft: string;
        topRight: string;
        left1: string;
        left2: string;
        right1: string;
        right2: string;
        bottomLeft: string;
        bottomRight: string;
      }>;
    }>;
    ogImage?: string;
  }>;
  copy: Readonly<{
    loading: LocalizedText;
    heroSubtitle: LocalizedText;
    invitation: Readonly<{
      heading: LocalizedText;
      paragraphs: LocalizedList;
      loveLine: LocalizedText;
    }>;
    timelineTitle: LocalizedText;
    quote: LocalizedText;
    locationTitle: LocalizedText;
    locationButton: LocalizedText;
    detailsTitle: LocalizedText;
    dressCodeTitle: LocalizedText;
    rsvp: Readonly<{
      title: LocalizedText;
      intro: LocalizedText;
      attendanceLabel: LocalizedText;
      attendanceYes: LocalizedText;
      attendanceNo: LocalizedText;
      nameLabel: LocalizedText;
      nameHint: LocalizedText;
      namePlaceholder: LocalizedText;
      guestCountLabel: LocalizedText;
      drinksLabel: LocalizedText;
      drinksHint: LocalizedText;
      drinks: readonly Readonly<{ id: string; label: LocalizedText }>[];
      submit: LocalizedText;
      submitting: LocalizedText;
      success: LocalizedText;
      error: LocalizedText;
      validation: Readonly<{ name: LocalizedText; attendance: LocalizedText; guestCount: LocalizedText }>;
    }>;
    countdown: Readonly<{
      title: LocalizedText;
      units: Readonly<{ days: CountdownUnit; hours: CountdownUnit; minutes: CountdownUnit; seconds: CountdownUnit }>;
    }>;
    contactsTitle: LocalizedText;
    footer: Readonly<{ thankYou: LocalizedText; hostsLabel: LocalizedText }>;
    order: Readonly<{
      title: LocalizedText;
      subtitle: LocalizedText;
      name: LocalizedText;
      namePlaceholder: LocalizedText;
      phone: LocalizedText;
      phonePlaceholder: LocalizedText;
      telegram: LocalizedText;
      telegramPlaceholder: LocalizedText;
      button: LocalizedText;
      noticeTitle: LocalizedText;
      note: LocalizedText;
      privacy: LocalizedText;
      brand: string;
      credit: string;
    }>;
    accessibility: Readonly<{
      languageSwitcher: LocalizedText;
      switchToKy: LocalizedText;
      switchToRu: LocalizedText;
      playMusic: LocalizedText;
      pauseMusic: LocalizedText;
      openInvitation: LocalizedText;
    }>;
  }>;
}>;

const gallery_women = [
  "https://static.tildacdn.com/tild6466-6131-4132-b931-323762336566/IMG_3770_tilda280014.jpeg",
  "https://static.tildacdn.com/tild6536-6232-4132-b338-376262373933/IMG_7691.JPG",
  "https://static.tildacdn.com/tild6431-3161-4863-a266-303963383230/IMG_9244_tilda266609.jpeg",
  "https://static.tildacdn.com/tild6665-3363-4331-a231-626361313134/754a6b28-2b5c-4517-b.jpg",
  "https://static.tildacdn.com/tild6332-3534-4466-b664-343462313565/0be964deae5e6757ac7e.jpg",
  "https://static.tildacdn.com/tild6566-6264-4130-a662-393935373430/_WhatsApp_2024-02-01.jpg",
  "https://static.tildacdn.com/tild3330-6162-4466-b731-633033376634/IMG_7640.JPG",
] as const;

const gallery_man = [
  "https://static.tildacdn.com/tild3531-6165-4235-a534-393834616666/c381cdbb017aa19af394.jpg",
  "https://static.tildacdn.com/tild6132-3939-4031-b963-393136366233/23809cd177f050611d37.jpg",
  "https://static.tildacdn.com/tild6565-3738-4262-b736-663162346264/IMG_0464_tilda265365.jpeg",
  "https://static.tildacdn.com/tild6566-3565-4161-b562-353538323832/IMG_0012_tilda276016.JPG",
  "https://static.tildacdn.com/tild3932-3463-4461-b535-386362363466/a11ff53814be76dd77f7.jpg",
  "https://static.tildacdn.com/tild3132-3465-4464-b961-303265366535/WhatsApp_Image_2024-.jpeg",
  "https://static.tildacdn.com/tild3463-3262-4934-a139-383832653562/630F5250-9DFB-45A7-8.jpeg",
  "https://static.tildacdn.com/tild3736-3333-4264-a337-373732646665/5044B139-F55E-472B-A.jpeg",
] as const;

export const wedding: WeddingConfig = {
  defaultLanguage: "ky",
  languages: [
    { code: "ky", shortLabel: "KG", htmlLang: "ky" },
    { code: "ru", shortLabel: "RU", htmlLang: "ru" },
  ],
  couple: { groom: "Азамат", bride: "Айгерим" },
  event: {
    date: "2027-11-20",
    startTime: "17:00",
    timezone: "Asia/Bishkek",
    displayDate: { ky: "20-ноябрь, 2027", ru: "20 ноября 2027" },
  },
  hosts: { ky: "Музаффар жана Айгүл", ru: "Музаффар и Айгуль" },
  venue: {
    name: "THE SUN — VERANDA",
    address: { ky: "Бишкек, Кыргызстан", ru: "Бишкек, Кыргызстан" },
    mapUrl: "https://maps.google.com/?q=Bishkek%2C%20Kyrgyzstan",
    image: "/media/location-reference.jpg",
    intro: {
      ky: "Биздин майрамыбыз төмөнкү жерде өтөт:",
      ru: "Наш праздник пройдет на площадке:",
    },
    note: {
      ky: "Төмөндөгү карта той өтүүчү жайды тез табууга жана өз убагында жетүүгө жардам берет.",
      ru: "Карта поможет быстрее найти место торжества и добраться вовремя.",
    },
  },
  timeline: [
    {
      time: "16:00",
      title: { ky: "Конокторду тосуп алуу", ru: "Сбор гостей" },
      description: {
        ky: "Алгачкы мүнөттөрдү баарлашуу жана жылуу маанай менен өткөрөбүз.",
        ru: "Начнем вечер с общения и теплой встречи гостей.",
      },
    },
    {
      time: "16:30",
      title: { ky: "Салтанаттуу азем", ru: "Церемония" },
      description: {
        ky: "Бул өзгөчө көз ирмемди биз менен бирге бөлүшүңүздөр.",
        ru: "Разделите с нами этот важный и трогательный момент.",
      },
    },
    {
      time: "17:00",
      title: { ky: "Той башталат", ru: "Банкет" },
      description: {
        ky: "Куттуктоолор, жакшы маек жана майрамдык дасторкон.",
        ru: "Поздравления, душевные разговоры и праздничный ужин.",
      },
    },
    {
      time: "22:00",
      title: { ky: "Кеченин аякташы", ru: "Завершение" },
      description: {
        ky: "Керемет кечени жылуу эскерүүлөр менен жыйынтыктайбыз.",
        ru: "Завершим прекрасный вечер теплыми воспоминаниями.",
      },
    },
  ],
  details: [
    {
      title: { ky: "Белектер", ru: "Подарки" },
      text: {
        ky: "Сиздердин жылмаюуңуздар жана жакшы тилектериңиздер биз үчүн эң баалуу белек.",
        ru: "Ваши улыбки, теплые слова и присутствие станут для нас самым ценным подарком.",
      },
    },
    {
      title: { ky: "Гүлдөр", ru: "Цветы" },
      text: {
        ky: "Кааласаңыздар, гүлдүн ордуна кийин чогуу бөлүшө турган сүйүктүү суусундугуңуздарды алып келсеңиздер болот.",
        ru: "Вместо цветов, по желанию, можно выбрать любимый напиток, который мы позже откроем вместе.",
      },
    },
    {
      title: { ky: "Кичинекей өтүнүч", ru: "Небольшая просьба" },
      text: {
        ky: "Бул кеченин ар бир көз ирмеми табигый жана чын жүрөктөн болушун каалайбыз.",
        ru: "Нам хочется, чтобы каждый момент вечера оставался естественным, теплым и искренним.",
      },
    },
  ],
  dressCode: {
    intro: {
      ky: "Кийим тандоодо майрамдын жарашыктуу жана токтоо стилин эске алсаңыздар биз кубанабыз.",
      ru: "Будем рады, если при выборе образа вы поддержите элегантную и сдержанную атмосферу вечера.",
    },
    paletteImage: "https://static.tildacdn.com/tild3735-3463-4662-a130-306363633933/Group_1000003020.png",
    women: {
      title: { ky: "Айымдар", ru: "Девушки" },
      text: {
        ky: "Кечки көйнөктөр, костюмдар, юбкалар жана жарашыктуу аксессуарлар ылайыктуу.",
        ru: "Вечерние платья, костюмы, юбки, блузки и аккуратные аксессуары приветствуются.",
      },
      images: gallery_women,
    },
    men: {
      title: { ky: "Мырзалар", ru: "Мужчины" },
      text: {
        ky: "Классикалык же заманбап костюм, шым жана жакет сыяктуу тыкан образдар ылайыктуу.",
        ru: "Подойдут классические и современные образы: брюки, рубашка, пиджак или лаконичный костюм.",
      },
      images: gallery_man,
    },
  },
  contact: {
    name: "Екатерина",
    phone: "+7 (123) 425-11-96",
    text: {
      ky: "Той күнү суроолор жаралса, уюштуруучубузга кайрылсаңыздар болот.",
      ru: "Если в день торжества возникнут вопросы, вы можете обратиться к нашему организатору.",
    },
    socials: [
      {
        type: "phone",
        href: "tel:+71234251196",
        ariaLabel: "Телефон",
        target: "_self",
      },
      {
        type: "whatsapp",
        href: "https://wa.me/71234251196?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21%20%D0%AF%20%D0%B3%D0%BE%D1%81%D1%82%D1%8C%20%D0%B8%20%D1%83%20%D0%BC%D0%B5%D0%BD%D1%8F%20%D0%B5%D1%81%D1%82%D1%8C%20%D0%B2%D0%BE%D0%BF%D1%80%D0%BE%D1%81%20%D0%BF%D0%BE%20%D1%81%D0%B2%D0%B0%D0%B4%D1%8C%D0%B1%D0%B5",
        ariaLabel: "WhatsApp",
        target: "_blank",
      },
      {
        type: "telegram",
        href: "123",
        ariaLabel: "Telegram",
        target: "_blank",
      },
    ],
  },
  assets: {
    introVideo: {
      mp4: "https://968f8970-1acf-4a3b-a3cc-475290d4d84e.selstorage.ru/daria_dwl_A_delicate_scene_of_flowers_blooming_slowly_on_a_wh_2621a726-808b-4cdf-924b-c2b7ff952fba_1.mp4",
      poster: "/media/intro-poster.svg",
    },
    music: "https://968f8970-1acf-4a3b-a3cc-475290d4d84e.selstorage.ru/1_MUSIC_457_full_in-the-end-they-parted_0158.mp3",
    programmePhoto: "/media/event-reference.jpg",
    closingPhoto: "/media/final-reference.png",
    decor: {
      flower: "/decor/paper-flower.svg",
      leaf: "/decor/paper-leaf.svg",
      clusters: {
        topLeft: "/decor/ref-edge-top-left.png",
        topRight: "/decor/ref-edge-top-right.png",
        left1: "/decor/ref-edge-left-1.png",
        left2: "/decor/ref-edge-left-2.png",
        right1: "/decor/ref-edge-right-1.png",
        right2: "/decor/ref-edge-right-2.png",
        bottomLeft: "/decor/ref-edge-bottom-left.png",
        bottomRight: "/decor/ref-edge-bottom-right.png",
      },
    },
  },
  copy: {
    loading: {
      ky: "Чакыруу баракчасын ачуу үчүн басыңыз",
      ru: "Нажмите, чтобы открыть приглашение",
    },
    heroSubtitle: { ky: "Үйлөнүү тоюна чакыруу", ru: "Приглашение на свадьбу" },
    invitation: {
      heading: { ky: "Урматтуу коноктор!", ru: "Дорогие гости!" },
      paragraphs: {
        ky: [
          "Биз үчүн өзгөчө болгон бул күндү сиздер менен бөлүшүп, балдарыбыз [Groom] жана [Bride] баш кошкон кубанычтуу кечеге кадырлуу коногубуз болууга чакырабыз.",
          "Сиздер менен бирге жаңы үй-бүлөнүн башталышын майрамдоону чыдамсыздык менен күтөбүз.",
        ],
        ru: [
          "От всей души приглашаем вас разделить с нами особенный день — наши дети [Groom] и [Bride] создают свою семью.",
          "Будем счастливы видеть вас рядом и вместе отпраздновать начало их семейного пути.",
        ],
      },
      loveLine: { ky: "Сүйүү менен, үй-бүлөбүз", ru: "С любовью, наши семьи" },
    },
    timelineTitle: { ky: "Той программасы", ru: "Программа дня" },
    quote: {
      ky: "Бакыттын орду — ушул жерде, бакыттын убактысы — азыр",
      ru: "Место для счастья — здесь, время для счастья — сейчас",
    },
    locationTitle: { ky: "Локация", ru: "Локация" },
    locationButton: { ky: "Картаны ачуу", ru: "Открыть карту" },
    detailsTitle: { ky: "Маалымат", ru: "Детали" },
    dressCodeTitle: { ky: "Дресс-код", ru: "Дресс-код" },
    rsvp: {
      title: { ky: "Конок анкетасы", ru: "Анкета гостя" },
      intro: {
        ky: "Жоопторуңуздар тойду уюштурууда бизге чоң жардам берет.",
        ru: "Ваши ответы помогут нам лучше подготовиться к празднику.",
      },
      attendanceLabel: { ky: "Тойго катыша аласызбы?", ru: "Сможете ли вы присутствовать на торжестве?" },
      attendanceYes: { ky: "Ооба, катышам", ru: "Я приду / Мы придем" },
      attendanceNo: { ky: "Тилекке каршы, келе албайм", ru: "Прийти не получится" },
      nameLabel: { ky: "Атыңыз жана фамилияңыз", ru: "Введите имя и фамилию" },
      nameHint: {
        ky: "Эгер үй-бүлө же жуп болуп келсеңиздер, бардык коноктордун аттарын жазыңыздар.",
        ru: "Если вы будете парой или семьей, укажите имена всех гостей.",
      },
      namePlaceholder: { ky: "Атыңыз", ru: "Ваше имя" },
      guestCountLabel: { ky: "Коноктордун саны", ru: "Количество гостей" },
      drinksLabel: { ky: "Суусундук боюнча каалоолор", ru: "Предпочтения по напиткам" },
      drinksHint: { ky: "Бир нече вариантты тандасаңыз болот", ru: "Можно выбрать несколько вариантов" },
      drinks: [
        { id: "red-wine", label: { ky: "Кызыл шарап", ru: "Вино красное" } },
        { id: "white-wine", label: { ky: "Ак шарап", ru: "Вино белое" } },
        { id: "whisky", label: { ky: "Виски", ru: "Виски" } },
        { id: "vodka", label: { ky: "Арак", ru: "Водка" } },
        { id: "champagne", label: { ky: "Шампан", ru: "Шампанское" } },
        { id: "soft", label: { ky: "Алкоголсуз суусундук", ru: "Безалкогольное" } },
      ],
      submit: { ky: "Жөнөтүү", ru: "Отправить" },
      submitting: { ky: "Жөнөтүлүүдө...", ru: "Отправляем..." },
      success: { ky: "Рахмат! Жообуңуз кабыл алынды.", ru: "Спасибо! Ваш ответ принят." },
      error: { ky: "Ката кетти. Кайра аракет кылыңыз.", ru: "Произошла ошибка. Попробуйте ещё раз." },
      validation: {
        name: { ky: "Атыңызды жазыңыз.", ru: "Введите ваше имя." },
        attendance: { ky: "Катышуу вариантын тандаңыз.", ru: "Выберите вариант присутствия." },
        guestCount: { ky: "Коноктордун санын тандаңыз.", ru: "Выберите количество гостей." },
      },
    },
    countdown: {
      title: { ky: "Тойго чейин калды", ru: "До свадьбы осталось" },
      units: {
        days: { ky: "Күн", ru: ["день", "дня", "дней"] },
        hours: { ky: "Саат", ru: ["час", "часа", "часов"] },
        minutes: { ky: "Мүнөт", ru: ["минута", "минуты", "минут"] },
        seconds: { ky: "Секунд", ru: ["секунда", "секунды", "секунд"] },
      },
    },
    contactsTitle: { ky: "Байланыш", ru: "Контакты" },
    footer: {
      thankYou: { ky: "Көрүшкөнчө!", ru: "До встречи!" },
      hostsLabel: { ky: "Той ээлери", ru: "Хозяева торжества" },
    },
    order: {
      title: { ky: "Бул чакырууну азыр заказ кылыңыз", ru: "Закажите данное приглашение прямо сейчас" },
      subtitle: { ky: "... же каталогдон башка варианттарды көрүңүз", ru: "... или посмотрите другие варианты в нашем каталоге" },
      name: { ky: "Аты-жөнү", ru: "Имя Фамилия" },
      namePlaceholder: { ky: "Аты-жөнүңүз", ru: "Имя Фамилия" },
      phone: { ky: "Телефон", ru: "Телефон" },
      phonePlaceholder: { ky: "+996...", ru: "+7..." },
      telegram: { ky: "Telegram шилтемеси", ru: "Ссылка на Телеграм" },
      telegramPlaceholder: { ky: "https://t.me/сиздин_ник", ru: "https://t.me/ваш_ник" },
      button: { ky: "Заказ кылуу", ru: "Заказать" },
      noticeTitle: { ky: "Көңүл буруңуз!", ru: "Внимание!" },
      note: {
        ky: "Бардык суроо-талаптарга Telegram аркылуу гана жооп беребиз. Телефон номери туура жазылганын текшериңиз.",
        ru: "На все заявки мы отвечаем только в Телеграм. Пожалуйста, убедитесь, что номер телефона написан правильно.",
      },
      privacy: {
        ky: "«Заказ кылуу» баскычын басуу менен жеке маалыматтарды иштетүүгө макулдугуңузду бересиз.",
        ru: "Нажимая кнопку «Заказать», вы соглашаетесь на обработку персональных данных.",
      },
      brand: "DARI WITH LOVE",
      credit: "designed by dariwithlove.ru",
    },
    accessibility: {
      languageSwitcher: { ky: "Тилди тандоо", ru: "Выбор языка" },
      switchToKy: { ky: "Кыргызча", ru: "Переключить на кыргызский" },
      switchToRu: { ky: "Орусча", ru: "Переключить на русский" },
      playMusic: { ky: "Музыканы ойнотуу", ru: "Включить музыку" },
      pauseMusic: { ky: "Музыканы токтотуу", ru: "Остановить музыку" },
      openInvitation: { ky: "Чакырууну ачуу", ru: "Открыть приглашение" },
    },
  },
};
