import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import NumPad from './components/NumPad'
import OperationPad from './components/OperationPad'
import { EVENT_TYPE } from './constants'

const INITIAL_STATE = {
  calculationSegments: [],
  showFractionNumpad: false,
  currentSegment: []
}

export default class App extends React.Component {
  state = INITIAL_STATE

  handleInput = (e) => {
    let newState = {}
    switch (e.type) {
      case EVENT_TYPE.clear:
        newState = INITIAL_STATE
        break

      case EVENT_TYPE.operational:
        if (this.state.calculationSegments.length === 0 && this.state.currentSegment.length === 0) {
          // Prevent starting calculations with an operation
        } else {
          newState = {
            ...newState,
            showFractionNumpad: false,
            currentSegment: [],
            calculationSegments: [...this.state.calculationSegments, ...this.state.currentSegment, e]
          }
        }
        break
      case EVENT_TYPE.integer:
        newState = {
          ...newState,
          currentSegment: [...this.state.currentSegment, e],
        }
        break

      case EVENT_TYPE.evaluational:
        const result = this.evaluate()

        newState = {
          currentSegment: [],
          calculationSegments: [{value: result, type: EVENT_TYPE.integer}],
          showFractionNumpad: false
        }
        break
    }

    this.setState(newState)
  }

  handleOpenFractionNumpad = () => {
    this.setState({showFractionNumpad: true})
  }

  evaluate = () => {
    return eval([...this.state.calculationSegments, ...this.state.currentSegment].map(e => e.value).join(''))
  }

  render () {
    let displayString = [...this.state.calculationSegments, ...this.state.currentSegment].map(e => e.value).join('')
    debugger
    return (
      <View style={styles.container}>
        <View style={styles.displayContainer}>
          <Text style={styles.display} adjustsFontSizeToFit={true}>{displayString}</Text>
        </View>
        <View style={styles.row}>
          {this.state.showFractionNumpad
            ? <View style={styles.numpad}>
              <NumPad onChange={this.handleInput} openFractionNumpad={this.handleOpenFractionNumpad}/>
              <NumPad onChange={this.handleInput} openFractionNumpad={this.handleOpenFractionNumpad}/>
            </View>
            : <View style={styles.numpad}>
              <NumPad onChange={this.handleInput} openFractionNumpad={this.handleOpenFractionNumpad}/>
            </View>
          }


          <View style={styles.operationpad}>
            <OperationPad onChange={this.handleInput}/>
          </View>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
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
    height: 100,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'yellow',
    width: '100%',
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  display: {
    color: 'white',
    textAlign: 'right',
    width: '100%',
    height: '100%',

    fontSize: 999, // Set to large and use auto scaling
  }
})
