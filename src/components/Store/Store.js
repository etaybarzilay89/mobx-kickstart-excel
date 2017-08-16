import * as mobx from 'mobx';
const {observable} = mobx;


const Store = observable({
  sheet: observable.map({}),
  selectedCell: '',
  getCellFormula(row, column) {
    return this.sheet.get(this.cellIndexToString(row, column));
  },
  cellIndexToString(row, column) {
    return row + '_' + column;
  },
  cellStringToIndex(cellString) {
    return cellString.split('_');
  },
  getSelectedCell() {
    return this.selectedCell;
  },
  getSelectedCellFormula() {
    const cellIndexArray = this.cellStringToIndex(this.selectedCell);
    return this.getCellFormula(cellIndexArray[0], cellIndexArray[1]);
  },
  setSelectedCellFormula(formula) {
    const cellIndexArray = this.cellStringToIndex(this.selectedCell);
    this.setCellFormula(cellIndexArray[0], cellIndexArray[1], formula);
  },
  computeValue(formula) {
    const computedFormula = parseFormula(formula);
    return computedFormula;
  },
  setSelectedCell: mobx.action(function (row, column) {
    this.selectedCell = this.cellIndexToString(row, column);
  }),
  setCellFormula: mobx.action(function (row, column, formula) {
    const cellIndexString = this.cellIndexToString(row, column);
    this.sheet.set(cellIndexString, '' + formula);
  }),
});

const parseFormula = formula => {
  const stringformula = '' + formula;
  if (!stringformula) {
    return '';
  } else if (stringformula.length === 1) {
    return eval(stringformula);
  }

  const cellRegex = new RegExp('([A-J][1-9][0-9]*)', 'g');

  const replacedFormula = stringformula.replace(cellRegex, (x, match) => {
    return parseFormula(cellStringToVal(match));
  });

  return eval(replacedFormula);
};

const cellStringToVal = cellString => {
  const letter = cellString[0];
  const number = parseInt(cellString.substr(1));
  const arrayIndexFromLetter = letter.charCodeAt(0) - 65;
  return Store.getCellFormula(number - 1, arrayIndexFromLetter);
};



window.Store = Store;
export default Store;
