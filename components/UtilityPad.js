import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const style = StyleSheet.create({
  pad: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flex: 1
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1
  },
  button: {
    backgroundColor: '#4682B4',
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
    alignSelf: 'center',
    color: 'white'
  },
  strategy: {
    fontSize: 50
  }
})

export default class UtilityPad extends React.Component {
  render () {
    return (
      <View style={style.pad}>

        <PadButton label={'C'} onPress={this.props.onClear}/>
        <PadButton label={getLabelForAccuracy(this.props.roundingAccuracy)}
                   onPress={this.props.onRoundingAccuracyPress}/>
        <PadButton label={getLabelForStrategy(this.props.roundingStrategy)} onPress={this.props.onRoundingStrategyPress} styles={style.strategy}/>
      </View>
    )
  }
}

const getLabelForAccuracy = (roundingAccuracy) => {
  switch (roundingAccuracy) {
    case 2:
      return '½'
    case 4:
      return '¼'
    case 8:
      return '⅛'
    case 16:
      return '¹⁄₁₆'
    case 32:
      return '¹⁄₃₂'
    case 64:
      return '¹⁄₆₄'
  }
}

const getLabelForStrategy = (roundingStrategy) => {
  switch (roundingStrategy) {
    case Math.ceil:
      return '⥘'
    case Math.floor:
      return '⥕'
    case Math.round:
      return '⥮'
  }
}

const PadButton = ({label, onPress, styles}) => <TouchableOpacity
  style={style.button}
  onPress={onPress}>
  <Text style={[style.text, styles]}>{label}</Text>
</TouchableOpacity>

