import React from 'react'
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native'
import { EVENT_TYPE } from '../constants'

const style = StyleSheet.create({
  numpad: {

    width: '100%',
    display: 'flex',
    flex: 1
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1
  },
  button: {
    backgroundColor: 'orange',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  }
})

export default class NumPad extends React.Component {

  handleInput = (value) => () => {
    this.props.onChange({value, type: EVENT_TYPE.integer})
  }

  renderNumber = (value) => <TouchableHighlight
    style={style.button}
    onPress={this.handleInput(value)}
  ><Text
    style={style.text}
  >{value}</Text></TouchableHighlight>

  renderClear = () => <TouchableHighlight
    style={style.button}
    onPress={() => this.props.onChange({type: EVENT_TYPE.clear})}
  ><Text
    style={style.text}
  >CLR</Text></TouchableHighlight>

  renderFrac = () => <TouchableHighlight
    style={style.button}
    onPress={this.props.openFractionNumpad}
  ><Text
    style={style.text}
  >⅛</Text></TouchableHighlight>

  render () {
    return (
      <View style={style.numpad}>
        <View style={style.row}>
          {this.renderNumber(7)}
          {this.renderNumber(8)}
          {this.renderNumber(9)}
        </View>
        <View style={style.row}>
          {this.renderNumber(4)}
          {this.renderNumber(5)}
          {this.renderNumber(6)}
        </View>
        <View style={style.row}>
          {this.renderNumber(1)}
          {this.renderNumber(2)}
          {this.renderNumber(3)}
        </View>
        <View style={style.row}>
          {this.renderNumber(0)}
          {this.renderClear()}
          {this.renderFrac()}
        </View>
      </View>
    )
  }
}

