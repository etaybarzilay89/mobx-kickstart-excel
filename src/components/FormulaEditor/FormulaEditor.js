import React from 'react';
import PropTypes from 'prop-types';
import s from './FormulaEditor.scss';
import {observer} from 'mobx-react';
import Store from '../Store/Store';

class InputWithState extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);

    this.state = {
      value: props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({value: nextProps.value});
    }
  }

  onKeyPress(e) {
    s;
    if (e.key === 'Enter') {
      this.props.onChange(this.state.value);
    }
  }

  onChange(e) {
    this.setState({value: e.target.value});
  }

  render() {
    return (
      <input
        type="text"
        className={s.formulaInput}
        onChange={this.onChange}
        onKeyPress={this.onKeyPress}
        value={this.state.value}
        />
    );
  }
}

InputWithState.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

const InputWithStateObserver = observer(InputWithState);

// const selectedCellDataString = function () {
//   const selectedCellData = Store.getSelectedCellData();
//   return selectedCellData ? selectedCellData : '';
// };

const selectedCellString = function () {
  const selectedCellArray = Store.cellStringToIndex(Store.getSelectedCell());
  const letter = String.fromCharCode(parseInt(selectedCellArray[1]) + 'A'.charCodeAt(0));
  const number = parseInt(selectedCellArray[0]) + 1;
  return letter + number;
};

const cellValueFromString = function(cellDataString) {
  return 0 + 1;
};

const setSelectedCellData = function (data) {
  const cellDataString = data.substr(1);
  const cellDataValue = cellValueFromString(cellDataString);
  Store.setSelectedCellData(eval(cellDataValue));
};

const FormulaEditor = observer(() => (
  <div className={s.formulaEditor}>
        Formula: <InputWithStateObserver value={'=' + selectedCellString()} onChange={data => setSelectedCellData(data)}/>
  </div>

));

export default FormulaEditor;
