import * as mobx from 'mobx';
const {observable} = mobx;

const Store = observable({
  sheet: observable.map({}),
  selectedCell: '',
  getCellData(row, column) {
    return this.sheet.get(this.cellIndexToString(row, column));
  },
  setCellData(row, column, data) {
    const cellIndexString = this.cellIndexToString(row, column);
    this.sheet.set(cellIndexString, '' + data);
  },
  cellIndexToString(row, column) {
    return row + '_' + column;
  },
  cellStringToIndex(cellString) {
    return cellString.split('_');
  },
  getSelectedCellData() {
    const cellIndexArray = this.cellStringToIndex(this.selectedCell);
    return this.getCellData(cellIndexArray[0], cellIndexArray[1]);
  },
  setSelectedCell: mobx.action(function (row, column) {
    this.selectedCell = this.cellIndexToString(row, column);
  }),
});

window.Store = Store;
export default Store;
