import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

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
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center'
  }
})

export default class NumPad extends React.Component {

  handleInput = (value) => () => {
    this.props.onChange({value, type: this.props.eventType})
  }

  renderNumber = (value) => <TouchableOpacity
    style={{...style.button, backgroundColor: this.props.color || 'orange'}}
    onPress={this.handleInput(value)}
  ><Text
    style={style.text}
  >{value}</Text></TouchableOpacity>

  renderClear = () => <TouchableOpacity
    style={{...style.button, backgroundColor: this.props.color || 'orange'}}
    onPress={() => this.props.onClear({type: this.props.eventType})}
  ><Text
    style={style.text}
  >CLR</Text></TouchableOpacity>

  renderFrac = () => <TouchableOpacity
    style={{...style.button, backgroundColor: this.props.color || 'orange'}}
    onPress={this.props.openFractionNumpad}
  ><Text
    style={style.text}
  >Frac</Text></TouchableOpacity>

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
          {this.props.openFractionNumpad ? this.renderFrac() : null}
        </View>
      </View>
    )
  }
}

