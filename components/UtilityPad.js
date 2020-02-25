import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'

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
    backgroundColor: 'teal',
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
    alignSelf: 'center',
    color: 'white'
  }
})

export default class UtilityPad extends React.Component {
  render () {
    return (
      <View style={style.pad}>

        <PadButton label={'C'} onPress={this.props.onClear}/>
        {/*<PadButton label={'¹⁄₁₆'} onPress={()=>{}}/>*/}
        {/*<PadButton label={'↕'} onPress={()=>{}}/>*/}
      </View>
    )
  }
}

//⅛ ¹⁄₁₆ ¹⁄₃₂ ¹⁄₆₄
//↥ ↧

const PadButton = ({label, onPress}) => <TouchableHighlight
  style={style.button}
  onPress={onPress}>
  <Text style={style.text}>{label}</Text>
</TouchableHighlight>

