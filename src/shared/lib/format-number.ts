export const numberToSpecialFormat = (number) => {
  if(number === "КУПЛЕНО") return number
  if (!number) return 0;

  // Определяем степень тысячи
  let exponent = Math.floor(Math.log(number) / Math.log(1000));

  // Если число меньше 1000, возвращаем его как есть
  if (exponent === 0) return number.toString();

  // Получаем букву, соответствующую степени тысячи
  let letter = String.fromCharCode(65 + exponent - 1);

  // Вычисляем значение перед буквой
  let value = (number / Math.pow(1000, exponent)).toFixed(1);

  // Форматируем результат
  return `${value}${letter}`;
};
