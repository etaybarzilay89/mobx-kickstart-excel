import React from 'react';
import PropTypes from 'prop-types';
import s from './Cell.scss';
import Store from '../Store/Store';
import {observer} from 'mobx-react';

function Cell({rowIndex, cellIndex}) {
  return (
    <td className={s.cell} onClick={() => Store.setSelectedCell(rowIndex, cellIndex)}>{Store.getCellData(rowIndex, cellIndex)}</td>
  );
}

Cell.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  cellIndex: PropTypes.number.isRequired
};

export default observer(Cell);
