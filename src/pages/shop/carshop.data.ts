
import car from "../../assets/1.png";
import car2 from "../../assets/2.png";
import car3 from "../../assets/3.png";
import car4 from "../../assets/4.png";
import car5 from "../../assets/5.png";
import car6 from "../../assets/6.png";
import car7 from "../../assets/7.png";
import car8 from "../../assets/8.png";
import car9 from "../../assets/9.png";

interface CarStoreItem {
    name: string;
    image: string;
    price: number | "КУПЛЕНО";
    multiply: number;
    auto: number;
    
  }
  
  export const CARSTORE_DATA_SAMPLE: CarStoreItem[]  = [
    {
        name: "Матиз",
        image: car, 
        price: 10000,
        multiply: 1,
        auto: 0,
       
    },
    {
        name: "Приус",
        image: car2, 
        price: 50000,
        multiply: 3,
        auto: 0,
        
    },
    {
        name: "Краун 97",
        image: car3, 
        price: 200000,
        multiply: 5,
        auto: 0,
        
    },
    {
        name: "Форик",
        image: car6, 
        price: 350000,
        multiply: 8,
        auto: 0,
        
    },
    {
        name: "S alta",
        image: car5, 
        price: 1000000,
        multiply: 12,
        auto: 0,
        
    },
    {
        name: "911 порше",
        image: car9, 
        price: 5000000,
        multiply: 20,
        auto: 0,
        
    },
    {
        name: "BMW m5",
        image: car7, 
        price: 7000000,
        multiply: 30,
        auto: 0,
        
    },
    {
        name: "Май Бах",
        image: car8, 
        price: 10000000,
        multiply: 50,
        auto: 0,
        
    },
    {
        name: "Роллс",
        image: car4, 
        price: 50000000,
        multiply: 150,
        auto: 0,
        
    },
];