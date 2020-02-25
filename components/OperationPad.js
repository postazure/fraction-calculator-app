import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { EVENT_TYPE } from '../constants'

const style = StyleSheet.create({
  pad: {
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
    backgroundColor: '#C0C0C0',
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

export default class OperationPad extends React.Component {

  renderOperation = (value) => <TouchableOpacity style={style.button} onPress={() => {this.props.onChange({value, type: EVENT_TYPE.operational})}}>
    <Text style={style.text}>{value}</Text>
  </TouchableOpacity>

  renderEvaluate = () => <TouchableOpacity style={[style.button, {backgroundColor: '#778899'}]} onPress={this.props.onEvaluate}>
    <Text style={style.text}>=</Text>
  </TouchableOpacity>

  render () {
    return (
      <View style={style.pad}>
        {this.renderOperation('/')}
        {this.renderOperation('*')}
        {this.renderOperation('-')}
        {this.renderOperation('+')}
        {this.renderEvaluate()}
      </View>
    )
  }
}

