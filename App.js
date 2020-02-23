import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import NumPad from './components/NumPad'
import OperationPad from './components/OperationPad'
import { EVENT_TYPE, SEGMENT_TYPE } from './constants'
import Output from './components/Output'
import { buildNumberSegment, buildOperationalSegment, calculateSegments, NumberSegment } from './segment'

const INITIAL_STATE = {
  calculationSegments: [],
  showFractionNumpad: false,
  currentSegmentEvents: []
}

const ROUNDING_ACCURACY = 16 // is equal to 1/16th
const ROUNDING_STRATEGY = Math.floor // floor, ceiling, straight

export default class App extends React.Component {
  state = INITIAL_STATE

  handleInput = (e) => {
    let newState = {}
    switch (e.type) {
      case EVENT_TYPE.clear:
        newState = INITIAL_STATE
        break

      case EVENT_TYPE.operational:
        if (this.state.calculationSegments.length === 0 && this.state.currentSegmentEvents.length === 0) {
          // Prevent starting calculations with an operation
        } else {
          newState = {
            ...newState,
            showFractionNumpad: false,
            currentSegmentEvents: [],
            calculationSegments: [
              ...this.state.calculationSegments,
              ...(this.state.currentSegmentEvents.length > 0 ? [this.truncateValueSegment()] : []),
              buildOperationalSegment(e.value)
            ],
          }
        }
        break

      case EVENT_TYPE.numerator:
      case EVENT_TYPE.denominator:
      case EVENT_TYPE.integer:
        newState = {
          ...newState,
          currentSegmentEvents: [...this.state.currentSegmentEvents, e],
        }
        break
    }

    this.setState(newState)
  }

  truncateValueSegment = () => {
    const segment = NumberSegment()

    this.state.currentSegmentEvents.forEach(e => {
      segment[e.type] = segment[e.type] + e.value.toString()
    })

    return segment
  }

  handleOpenFractionNumpad = () => {
    this.setState({showFractionNumpad: true})
  }

  handleEvaluation = () => {
    const sum = calculateSegments(this.allCalculationSegments())
    const segment = buildNumberSegment(sum, ROUNDING_STRATEGY, ROUNDING_ACCURACY)

    this.setState({
      currentSegmentEvents: [],
      calculationSegments: [segment],
      showFractionNumpad: false
    })
  }

  allCalculationSegments = () => {
    const segments = [...this.state.calculationSegments]

    if (this.state.currentSegmentEvents.length > 0) {
      segments.push(this.truncateValueSegment(this.state.currentSegmentEvents))
    }

    return segments
  }

  render () {
    console.log(this.state)
    return (
      <View style={styles.container}>
        <View style={styles.displayContainer}>
          <Output style={styles.display} segments={this.allCalculationSegments()}/>
        </View>
        <View style={styles.row}>
          {this.state.showFractionNumpad
            ? <View style={styles.numpad}>
              <NumPad onChange={this.handleInput} eventType={EVENT_TYPE.numerator}/>
              <NumPad onChange={this.handleInput} eventType={EVENT_TYPE.denominator}/>
            </View>
            : <View style={styles.numpad}>
              <NumPad onChange={this.handleInput} eventType={EVENT_TYPE.integer}
                      openFractionNumpad={this.handleOpenFractionNumpad}/>
            </View>
          }


          <View style={styles.operationpad}>
            <OperationPad onChange={this.handleInput} onEvaluate={this.handleEvaluation}/>
          </View>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1
  },
  numpad: {
    flex: 3,
  },
  operationpad: {
    flex: 1,
  },
  displayContainer: {
    height: 140,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'yellow',
    width: '100%',
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: 100,

  },

})
