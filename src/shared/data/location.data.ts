import musorka from "../../assets/musorka2.png";
import garaj from "../../assets/garajfull.png";

export const LOCATIONS_DATA = [
  {
    width: "90%",
    title: "Помойка",
    location: "trash",
    price: 0,
    image: musorka,
    info: "Здесь, на Помойке, Валера стал символом того, что даже в самом тёмном и забытом уголке можно найти силу и уверенность, чтобы двигаться вперёд. Это место, где начинаются и заканчиваются пути многих, но для Валеры оно стало точкой отсчёта для его восхождения на вершину блатной иерархии.",
    multiply: 1,
  },
  {
    width: "90%",
    title: "Гараж",
    location: "garage",
    price: 18000,
    image: garaj,
    lvl: 2,
    info: "Гараж — это не просто убежище для старых автомобилей и их верных хранителей. Это целый мир, где каждый уголок, каждая запылённая полка и пролитая капля масла рассказывают истории о мастерстве, упорстве и братстве. Здесь, среди запахов бензина и металла, Валера обрёл свою вторую семью, своё призвание и свою страсть. Гараж стал для него ареной творчества и испытаний, местом, где рождаются мечты и воплощаются в жизнь.",
    advantages: ["Покупка авто"],
    multiply: 2,
  },
  {
    width: "90%",
    title: "Площадка",
    active: false,
    price: 500000,
    lvl: 20,
  },
  {
    width: "90%",
    title: "Больница",
    active: false,
    price: 500000,
    lvl: 25,
  },
  {
    width: "90%",
    title: "Отель",
    active: false,
    price: 500000,
    lvl: 30,
  },
  {
    width: "90%",
    title: "Квартира в центре Владивостока",
    active: false,
    price: 500000,
    lvl: 35,
  },
  {
    width: "90%",
    title: "Квартира на угольной",
    active: false,
    price: 500000,
    lvl: 40,
  },

  {
    width: "90%",
    title: "Полицейский участок",
    active: false,
    price: 500000,
    lvl: 45,
  },
  {
    width: "90%",
    title: "Полицейский участок",
    active: false,
    price: 500000,
    lvl: 50,
  },
];
