// создание таблицы для доски
var chessBoard = document.createElement("table");
// добавление ей класса
chessBoard.id = "chess-board";
// добавление этой таблицы в конец body
document.body.appendChild(chessBoard);

// создаю массив для последующей нумирации строк таблицы
var numbers = ['1', '2', '3', '4', '5', '6', '7', '8'];
// создаю массив для последующей нумирации столбцов таблицы
var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];



// цикл для отрисовки шахматной сетки
// n счетчик для строк
for (n = 7; n >= 0; n--) {


  // создание строки таблицы
  var rows = document.createElement("tr");
  // добавление строки в таблицу
  chessBoard.appendChild(rows);


  // цикл для создания ячеек в текущей строке
  // i счетчик для ячеек
  for (i = 0; i <= 7; i++) {

    // создание ячейки в строке таблицы
    var cols = document.createElement("td");


    // если это первая ячейка
    if (i === 0) {
      // то записать в первую ячейку (в span) число из массива равное n

      // создание span в переменную rowNumber для записи номера строки
      rowNumber = document.createElement("span");
      // присвоение класса элементу span для последующего смещения вправо через css
      rowNumber.className = "row-number";
      // здесь берется счетчик n от счетчика строк
      rowNumber.innerHTML = numbers[n];
      // добавление этого span внутрь каждого первого td каждой строки tr
      cols.appendChild(rowNumber);
    }


    // если это крайняя строка tr 
    // 0 потому что сделал счетчик наоборот, чтобы с массивом взаимодействовать
    if (n === 0) {
      // то записать в первую ячейку (в span) число из массива равное i

      // создание span в переменную colNumber для записи номера столбца
      colLetter = document.createElement("span");
      // присвоение класса элементу span для последующего смещения вниз через css
      colLetter.className = "col-letter";
      // здесь берется счетчик i от счетчика столбцов
      colLetter.innerHTML = letters[i];
      // добавление этого span внутрь каждого td последней строки tr
      cols.appendChild(colLetter);
    }


    // выбираю нечетный ячейки в нечетных строках для отрисовки светлым цветом
    if (n % 2 === 1 && i % 2 === 0) {
      cols.className = "cell-white";
    }

    // выбираю в четных строках четные ячейки для отрисовки светлым цветом
    if (n % 2 === 0 && i % 2 === 1) {
      cols.className = "cell-white";
    }


    // добавление ячейки в строку
    rows.appendChild(cols);

  }

}
