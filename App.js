import React from 'react'
import { StyleSheet, View } from 'react-native'
import NumPad from './components/NumPad'
import OperationPad from './components/OperationPad'
import { EVENT_TYPE } from './constants'
import Output from './components/Output'
import { buildNumberSegment, buildOperationalSegment, calculateSegments, NumberSegment } from './segment'
import UtilityPad from './components/UtilityPad'
import { cycleValue } from './utils'

const INITIAL_STATE = {
  calculationSegments: [],
  showFractionNumpad: false,
  currentSegmentEvents: [],
  solution: undefined,
  showSolution: false,
  roundingAccuracy: 16, // is equal to 1/16th,
  roundingStrategy: Math.floor
}

export default class App extends React.Component {
  state = INITIAL_STATE

  handleInput = (e) => {
    let newState = {}
    switch (e.type) {
      case EVENT_TYPE.operational:
        if (this.state.calculationSegments.length === 0 && this.state.currentSegmentEvents.length === 0 && !this.state.solution) {
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
            showSolution: false,
            solution: undefined
          }

          if (this.state.calculationSegments.length === 0 && this.state.currentSegmentEvents.length === 0 && this.state.solution) {
            // Use solution as the first value if there is no value set yet
            newState.calculationSegments.unshift(this.state.solution)
          }
        }
        break

      case EVENT_TYPE.numerator:
      case EVENT_TYPE.denominator:
      case EVENT_TYPE.integer:
        newState = {
          ...newState,
          currentSegmentEvents: [...this.state.currentSegmentEvents, e],
          showSolution: false,
          solution: undefined
        }
        break
    }

    this.setState(newState)
  }

  handleClear = ({type}) => {
    switch (type) {
      case EVENT_TYPE.numerator:
        return this.setState({currentSegmentEvents: this.state.currentSegmentEvents.filter(e => e.type !== EVENT_TYPE.numerator)})
      case EVENT_TYPE.denominator:
        return this.setState({currentSegmentEvents: this.state.currentSegmentEvents.filter(e => e.type !== EVENT_TYPE.denominator)})
      case EVENT_TYPE.integer:
        return this.setState({currentSegmentEvents: []})
    }
  }

  handleAllClear = () => this.setState({...INITIAL_STATE, roundingAccuracy: this.state.roundingAccuracy, roundingStrategy: this.state.roundingStrategy})

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

  cycleRoundingAccuracy = () => {
    const possibleDenominators = [2, 4, 8, 16, 32, 64]
    this.setState({roundingAccuracy: cycleValue(possibleDenominators, this.state.roundingAccuracy)})
  }

  cycleRoundingStrategy = () => {
    const possibleStrategies = [Math.floor, Math.ceil, Math.round]
    this.setState({roundingStrategy: cycleValue(possibleStrategies, this.state.roundingStrategy)})
  }

  handleEvaluation = () => {
    let segments = this.allCalculationSegments()
    if (segments.length < 3) {
      return this.setState({showFractionNumpad: false})
    }

    const sum = calculateSegments(segments)
    const segment = buildNumberSegment(sum, this.state.roundingStrategy, this.state.roundingAccuracy)

    this.setState({
      currentSegmentEvents: [],
      calculationSegments: [],
      showFractionNumpad: false,
      showSolution: true,
      solution: segment
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
    return (
      <View style={styles.container}>
        <View style={styles.displayContainer}>
          <Output style={styles.display}
                  segments={this.state.showSolution ? [this.state.solution] : this.allCalculationSegments()}/>
        </View>

        <View style={styles.row}>

          <View style={styles.left}>
            <UtilityPad
              onClear={this.handleAllClear}
              onRoundingAccuracyPress={this.cycleRoundingAccuracy}
              roundingAccuracy={this.state.roundingAccuracy}
              onRoundingStrategyPress={this.cycleRoundingStrategy}
              roundingStrategy={this.state.roundingStrategy}
            />

            {this.state.showFractionNumpad
              ? <View style={styles.numpad}>
                <NumPad onChange={this.handleInput} onClear={this.handleClear} eventType={EVENT_TYPE.numerator}/>
                <NumPad onChange={this.handleInput} onClear={this.handleClear} eventType={EVENT_TYPE.denominator}/>
              </View>
              : <View style={styles.numpad}>
                <NumPad onChange={this.handleInput}
                        onClear={this.handleClear}
                        eventType={EVENT_TYPE.integer}
                        openFractionNumpad={this.handleOpenFractionNumpad}/>
              </View>
            }
          </View>


          <View style={styles.right}>
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
    paddingTop: 80,
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
  left: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    flex: 3,
  },
  right: {
    flex: 1,
  },
  numpad: {
    flex: 4,
  },
  utiltyPad: {
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
    marginBottom: 40,

  },

})
