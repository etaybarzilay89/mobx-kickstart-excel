import React from 'react';
import PropTypes from 'prop-types';
import s from './Cell.scss';
import Store from '../Store/Store';
import {observer} from 'mobx-react';
import {computed} from 'mobx';


class Cell extends React.Component {
  componentWillMount() {
    const {rowIndex, cellIndex} = this.props;
    this.isSelectedStyle = computed(() => {
      return Store.getSelectedCell() === Store.cellIndexToString(rowIndex, cellIndex) ? s.selected : ' ';
    });
  }

  render() {
    const {rowIndex, cellIndex} = this.props;
    return (
      <td
        className={s.cell + ' ' + this.isSelectedStyle.get()}
        onClick={() => Store.setSelectedCell(rowIndex, cellIndex)}
        >{Store.getCellData(rowIndex, cellIndex)}</td>
    );
  }

}

Cell.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  cellIndex: PropTypes.number.isRequired
};

export default observer(Cell);
