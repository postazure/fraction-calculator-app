import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SEGMENT_TYPE } from '../constants'

export default class Output extends React.Component {
  render () {
    const decoratedSegments = this.props.segments.map((segment) => {
      const key = Math.random()
      if (segment.type === SEGMENT_TYPE.number) {
        return (
          <>
            {parseInt(segment.integer) !== 0 ? <IntegerOutput value={segment.integer} key={'int_' + key}/> : null}
            {parseInt(segment.numerator)!== 0 || parseInt(segment.denominator) !== 0
              ? <FractionalOutput key={'frac_' + key} numerator={segment.numerator} denominator={segment.denominator}/>
              : null}
          </>
        )
      } else {
        return <OperationOutput value={segment.operation} key={'op_' + key}/>
      }
    })

    return (
      <View style={style.display}>
        {decoratedSegments}
      </View>
    )
  }
}

const IntegerOutput = (props) => <Text adjustsFontSizeToFit={true} style={style.text}>{props.value}</Text>
const FractionalOutput = (props) => <View style={style.fraction}>
  <Text style={[style.numerator, style.text]} adjustsFontSizeToFit={true}>{props.numerator.toString()}</Text>
  <View style={style.vinculum}/>
  <Text style={[style.denominator, style.text]} adjustsFontSizeToFit={true}>{props.denominator.toString()}</Text>
</View>
const OperationOutput = (props) => <Text adjustsFontSizeToFit={true} style={[style.text, style.operation]}>{props.value}</Text>

const style = StyleSheet.create({
  display: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  text: {
    color: 'white',
    fontSize: 999, // Set to large and use auto scaling
    textAlign: 'center'
  },
  operation: {
    color: 'grey'
  },
  fraction: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  vinculum: {
    height: 3,
    backgroundColor: 'white'
  },
  numerator: {
    flex: 1,
  },
  denominator: {
    flex: 1,
  },
})