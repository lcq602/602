const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const newGameBtn = document.getElementById("new-game");
const checkBtn = document.getElementById("check");
const solveBtn = document.getElementById("solve");
const difficultySelect = document.getElementById("difficulty");

const REMOVE_COUNTS = {
  easy: 38,
  medium: 46,
  hard: 54
};

let solution = [];
let puzzle = [];

function createEmptyGrid() {
  return Array.from({ length: 9 }, () => Array(9).fill(0));
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function isValid(grid, row, col, num) {
  for (let i = 0; i < 9; i += 1) {
    if (grid[row][i] === num || grid[i][col] === num) {
      return false;
    }
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = startRow; r < startRow + 3; r += 1) {
    for (let c = startCol; c < startCol + 3; c += 1) {
      if (grid[r][c] === num) {
        return false;
      }
    }
  }

  return true;
}

function fillGrid(grid) {
  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      if (grid[row][col] === 0) {
        const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (const num of nums) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (fillGrid(grid)) {
              return true;
            }
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function makePuzzle(full, removeCount) {
  const game = full.map((row) => [...row]);
  let removed = 0;
  while (removed < removeCount) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (game[row][col] !== 0) {
      game[row][col] = 0;
      removed += 1;
    }
  }
  return game;
}

function renderBoard() {
  boardEl.innerHTML = "";
  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      const input = document.createElement("input");
      input.className = "cell";
      input.dataset.row = row;
      input.dataset.col = col;
      input.maxLength = 1;
      input.inputMode = "numeric";

      if (puzzle[row][col] !== 0) {
        input.value = puzzle[row][col];
        input.disabled = true;
        input.classList.add("fixed");
      }

      input.addEventListener("input", () => {
        input.value = input.value.replace(/[^1-9]/g, "").slice(0, 1);
        input.classList.remove("error");
      });

      boardEl.appendChild(input);
    }
  }
}

function getCurrentGrid() {
  const grid = createEmptyGrid();
  const inputs = boardEl.querySelectorAll(".cell");
  inputs.forEach((cell) => {
    const row = Number(cell.dataset.row);
    const col = Number(cell.dataset.col);
    grid[row][col] = cell.value ? Number(cell.value) : 0;
  });
  return grid;
}

function checkBoard() {
  const current = getCurrentGrid();
  let complete = true;
  let errors = 0;

  boardEl.querySelectorAll(".cell").forEach((cell) => {
    const row = Number(cell.dataset.row);
    const col = Number(cell.dataset.col);
    const value = cell.value ? Number(cell.value) : 0;

    cell.classList.remove("error");
    if (value === 0) {
      complete = false;
      return;
    }

    if (value !== solution[row][col]) {
      cell.classList.add("error");
      errors += 1;
      complete = false;
    }
  });

  if (complete && errors === 0) {
    statusEl.textContent = "🎉 恭喜你，数独完成！";
  } else if (errors > 0) {
    statusEl.textContent = `有 ${errors} 个格子不正确，再试试！`;
  } else {
    statusEl.textContent = "目前没有错误，继续加油！";
  }
}

function showSolution() {
  boardEl.querySelectorAll(".cell").forEach((cell) => {
    const row = Number(cell.dataset.row);
    const col = Number(cell.dataset.col);
    cell.value = solution[row][col];
    cell.classList.remove("error");
  });
  statusEl.textContent = "已显示答案，你可以再开一局。";
}

function startGame() {
  const full = createEmptyGrid();
  fillGrid(full);
  solution = full.map((row) => [...row]);
  const removeCount = REMOVE_COUNTS[difficultySelect.value] ?? REMOVE_COUNTS.medium;
  puzzle = makePuzzle(full, removeCount);
  renderBoard();
  statusEl.textContent = "新的一局开始了！";
}

newGameBtn.addEventListener("click", startGame);
checkBtn.addEventListener("click", checkBoard);
solveBtn.addEventListener("click", showSolution);

difficultySelect.addEventListener("change", startGame);

startGame();
