import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo';

export default class AccelerometerSensor extends React.Component {
  state = {
    accelerometerData: {},
  };

  componentDidMount() {
    this._toggle();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  };

  

  _subscribe = () => {
    this._subscription = Accelerometer.addListener(
      accelerometerData => {
        this.setState({ accelerometerData });
      }
    ); 
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove(); 
    this._subscription = null;
  };

  render() {
    let { x,y,z} = this.state.accelerometerData; 
	var gForce=(Math.sqrt (Math.pow(x,2) + Math.pow(y,2) + Math.pow(z,2)) )/ 9.81;
	var a=round(gForce);
	if (a < 0.08){
		var st= "Accident Alert";
		this._unsubscribe();
	}	
	else 
		var st= "Safe";
    return (
      <View style={styles.sensor}>
        <Text>Accelerometer:</Text>
        <Text>x: {round(x)} y: {round(y)} z: {round(z)}</Text>
        <Text>gForce:{round(gForce)}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._toggle} style={styles.button}>
          <Text>Toggle</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>Status:{st}value:{round(gForce)} </Text>
        </View>
      </View>
    );
  }
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#29F1CF',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sensor: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
});