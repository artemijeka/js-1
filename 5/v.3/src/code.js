let view = {
  showBoard: function(table, place) {
    let placeForBoard = document.querySelector(place);
    placeForBoard.appendChild(table);
  }
};
let model = {
  generateTable: function() {
    let tr,
      td,
      box,
      color = ["white", "black", true],
      table = document.createElement("table"),
      markup = {
        0: ["8", "7", "6", "5", "4", "3", "2", "1"],
        1: ["a", "b", "c", "d", "e", "f", "g", "h"],
        2: {
          1: "&#9814;",
          2: "&#9816;",
          3: "&#9815;",
          4: "&#9812;",
          5: "&#9813;",
          6: "&#9815;",
          7: "&#9816;",
          8: "&#9814;",
          9: "&#9817;"
        }
      };
    for (let row = 0; row <= 9; row++) {
      tr = document.createElement("tr");
      for (let cell = 0; cell <= 9; cell++) {
        td = document.createElement("td");
        /**************разметка***************/
        if (row === 0 && cell > 0 && cell < 9) {
          /*первая строка*/
          td.innerText = markup[1][cell - 1];
          td.className += "flip ";
        } else if (row === 9 && cell > 0 && cell < 9) {
          /*крайняя строка*/
          td.innerText = markup[1][cell - 1];
        }
        if (cell === 0 && row > 0 && row < 9) {
          /*первый столбец*/
          td.innerText = markup[0][row - 1];
        } else if (cell === 9 && row > 0 && row < 9) {
          /*крайний столбец*/
          td.innerText = markup[0][row - 1];
          td.className += "flip ";
        }
        if (cell === 0 || row === 0 || cell === 9 || row === 9) {
          td.className += " bn";
          tr.appendChild(td);
          /**********************************************************/
        } else if ((cell > 0 && cell < 9) || (row > 0 && row < 9)) {
          box = document.createElement("span");
          box.className += " figure ";
          if (row === 2 || row === 7) {
            box.innerHTML = markup[2][9];
            if (row === 2) {
              box.className += " flip black ";
            } else {
              box.className += " white ";
            }
          } else if (row === 1 || row === 8) {
            if (row === 1) {
              box.className += " flip black ";
            } else {
              box.className += " white ";
            }
            box.innerHTML = markup[2][cell];
          }
          td.appendChild(box);
          if (row % 2 !== 0) {
            td.className += color[2] ? color[1] : color[0];
          } else {
            td.className += !color[2] ? color[1] : color[0];
          }
          color[2] = !color[2];
          tr.appendChild(td);
        }
        table.appendChild(tr);
      }
    }
    return table;
  }
};

let controller = {
  showBoardIn: function(place) {
    let table = model.generateTable();
    view.showBoard(table, place);
  }
};
controller.showBoardIn("#chessBoard");
