/** Хелпер для разделения логики работы с матрицей */

import {MATRIX_SIZE} from 'Constants/game';

import {
  Direction,
  IMoveParams,
  ITile,
  IMoveTile, ICanMove,
} from '../types';

/** Правила сдвигов */
const DIRECTION_RULE : Record<Direction, IMoveParams>= {
  [Direction.LEFT]: {
    iStart: 0,
    iMax: MATRIX_SIZE,
    jStart: 1,
    jMax: MATRIX_SIZE,
  },
  [Direction.RIGHT]: {
    iStart: 0,
    iMax: MATRIX_SIZE,
    jStart: MATRIX_SIZE - 2,
    jMax: 0,
  },
  [Direction.UP]: {
    iStart: 1,
    iMax: MATRIX_SIZE,
    jStart: 0,
    jMax: MATRIX_SIZE,
  },
  [Direction.DOWN]: {
    iStart: MATRIX_SIZE - 2,
    iMax: 0,
    jStart: 0,
    jMax: MATRIX_SIZE,
  },
};

// const TEST_MATRIX = [
//   [2, 2, 0, 0],
//   [2, 0, 0, 0],
//   [0, 0, 0, 0],
//   [2, 0, 2, 2],
// ];

export function move(tileList : ITile[][], direction :Direction) {
  console.log(`Helper Move direction : ${direction.toUpperCase()}`);
  return moving(tileToMatrix(tileList), DIRECTION_RULE[direction])
}

function tileToMatrix(tileList) : number[][] {
  return tileList.map((el) => el.map((subEl) => subEl.value));
}

function moving(
    matrix : number[][],
    rules : IMoveParams
) {
  const {iStart, iMax, jStart, jMax} = rules;
  // @ts-ignore
  let moveList : IMoveTile[] = matrix.reduce((acc, el, i) => {
    const list = el.map((subEl, j) => {
      return {
        oldPosition: {
          x: j,
          y: i,
          value: subEl,
        },
        newPosition: {
          x: j,
          y: i,
          value: subEl,
        },
      }
    }).filter((el) => el.oldPosition.value !== 0);
    // @ts-ignore
    acc = acc.concat(list);
    return acc;
  }, []);
  drowMatrix(matrix);

  const iDirection = iStart < iMax;
  const jDirection = jStart < jMax;
  const mainDirection = iStart !== 0 && iStart !== MATRIX_SIZE;

  for (let i = iStart; iDirection ? i < iMax : i >= iMax; iDirection ? i++ : i--) {
    for (let j = jStart; jDirection ? j < jMax : j >= jMax; jDirection ? j++ : j--) {
      if (matrix[i][j] !== 0) {
        const mainIndex = mainDirection ? i : j;
        const direction = mainDirection ?
          iDirection ? -1 : 1 :
          jDirection ? -1 : 1;

        let index = mainIndex + direction;
        while ((index > 0 && index < MATRIX_SIZE - 1) && (mainDirection ? matrix[index][j] === 0 : matrix[i][index] === 0)) {
          index += direction
        }
        console.log(`'Ряд : ${i}, Столбец : ${j}, Значение : ${matrix[i][j]} Индекс : ${index}`)
        /* Крайний ряд по идее не трогаем, но нужно добавить анимацию стояния на месте =)))
         * Для начала проверяем что крайний элемент не равен 0 */

        const res = swipe(matrix, i, j, index, mainDirection, direction, moveList);
        matrix = res[0];
        moveList = res[1];
      }
    }
  }
  drowMatrix(matrix);
  return [matrix, moveList];
}

function swipe(matrix, i, j, index, pos, direction, moveList) {
  /** Ищем в противоположном направлении */
  direction = -1 * direction;
  let current = matrix[i][j];
  let swiped : number = pos ? matrix[index][j] : matrix[i][index];

  /** Если не можем сложить значения - идем на клетку выше */
  if (swiped !== 0 && current !== swiped) {
    if ((direction > 0 && index === matrix.length) ||
      (direction < 0 && index === 0)
    ) {
      return [matrix, moveList];
    }
    index += direction;
    /** Если после перестановки index мы попадаем на текущий элемент -
     *  значит переставлять нечего
     * */
    if ((pos && index === i) ||
      (!pos && index === j)
    ) {
      return [matrix, moveList];
    }
    /** Пересчитываем значение заменяемой клетки */
    swiped = pos ? matrix[index][j] : matrix[i][index];
  }
  /** Если позиция занята не 0 значением и равна нашей
   *  Удваиваем ее и удаляем текущий квадрат
   *  */
  if (current === swiped) {
    current += swiped;
    swiped = 0;
  }

  if (pos) {
    return swap(matrix, moveList, index, j, i, j, current, swiped);
  } else {
    return swap(matrix, moveList, i, index, i, j, current, swiped);
  }
}

function swap(matrix, moveList, i, j, swipedI, swipedJ, current, swiped) {
  const indexVal = matrix[i][j];
  // const swappedVal = matrix[swipedI][swipedI];

  if (indexVal !== 0) {
    let move = moveList.find((el) => {
      return el.oldPosition.x === j && el.oldPosition.y === i
    })

    if (move) {
      move.newPosition = {
        x: j,
        y: i,
        value: current,
      }
    } else {
      move = moveList.find((el) => {
        return el.newPosition.x === j && el.newPosition.y === i
      })

      move.newPosition.value = current;
    }
  }
  /* Сначала ищем элемент по старой позиции, если такого нет - ищем в новой */
  const move = moveList.find((el) => {
    return el.oldPosition.x === swipedJ && el.oldPosition.y === swipedI
  });
  if (move) {
    move.newPosition = {
      x: j,
      y: i,
      value: current,
    };
  }

  matrix[i][j] = current;
  matrix[swipedI][swipedJ] = swiped;

  return [matrix, moveList];
}


export function check(tileList : ITile[][]) : ICanMove {
  console.log('Check direction');
  const state = {
    [Direction.LEFT]: false,
    [Direction.RIGHT]: false,
    [Direction.UP]: false,
    [Direction.DOWN]: false,
  };

  const matrix = tileToMatrix(tileList);
  // eslint-disable-next-line guard-for-in
  for (const direction in DIRECTION_RULE) {
    state[direction] = checkDirection(matrix, DIRECTION_RULE[direction]);
  }

  return state;
}

function checkDirection(
    matrix : number[][],
    rules : IMoveParams
) {
  const {iStart, iMax, jStart, jMax} = rules;

  const iDirection = iStart < iMax;
  const jDirection = jStart < jMax;
  const mainDirection = iStart !== 0 && iStart !== MATRIX_SIZE;

  for (let i = iStart; iDirection ? i < iMax : i >= iMax; iDirection ? i++ : i--) {
    for (let j = jStart; jDirection ? j < jMax : j >= jMax; jDirection ? j++ : j--) {
      if (matrix[i][j] !== 0) {
        const mainIndex = mainDirection ? i : j;
        const direction = mainDirection ?
          iDirection ? -1 : 1 :
          jDirection ? -1 : 1;

        let index = mainIndex + direction;
        while ((index > 0 && index < MATRIX_SIZE - 1) && (
          mainDirection ? matrix[index][j] === 0 : matrix[i][index] === 0
        )) {
          index += direction
        }
        // Проверяем, возможен ли сдвиг
        if (checkSwipe(matrix, i, j, index, mainDirection, direction)) {
          return true;
        }
      }
    }
  }
  return false;
}

function checkSwipe(matrix, i, j, index, pos, direction) {
  /** Ищем в противоположном направлении */
  direction = -1 * direction;
  const current = matrix[i][j];
  const swiped : number = pos ? matrix[index][j] : matrix[i][index];

  /** Если не можем сложить значения - идем на клетку выше */
  if (swiped !== 0 && current !== swiped) {
    if ((direction > 0 && index === matrix.length) ||
      (direction < 0 && index === 0)
    ) {
      return false
    }
    index += direction;
    /** Если после перестановки index мы попадаем на текущий элемент -
     *  значит переставлять нечего
     * */
    if ((pos && index === i) ||
      (!pos && index === j)
    ) {
      return false
    }
  }

  return true;
}


function drowMatrix(matrix : any[][]) {
  console.log('_________________');
  console.log(`i : | ${[0, 1, 2, 3].join(', ')} | <= j`);
  matrix.forEach((el, id) => {
    console.log(`${id} : [ ${el.join(', ')} ]`);
  })
  console.log('_________________');
}
