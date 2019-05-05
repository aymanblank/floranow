/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Animated, Easing } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {

  state = {
    num: 0,
    numWidth: new Animated.Value(50),
    numHeight: new Animated.Value(50),
    numFontSize: new Animated.Value(0),
    minusWidth: 50,
    minusHeight: 50,
    plusWidth: new Animated.Value(100),
    plusMarginLeft: new Animated.Value(0),
    plusHeight: new Animated.Value(100),
    plusFirstTime: true,
    total: 29,
  }

  handlePlus = () => {
    if (this.state.plusFirstTime) {
      Animated.timing(this.state.plusWidth, {
        toValue: 50,
        duration: 500,
      }).start();
      Animated.timing(this.state.plusHeight, {
        toValue: 50,
        duration: 500,
      }).start();
      Animated.timing(this.state.plusMarginLeft, {
        toValue: 100,
        duration: 500,
      }).start();
      Animated.timing(this.state.numWidth, {
        toValue: 100,
        duration: 500,
      }).start();
      Animated.timing(this.state.numHeight, {
        toValue: 100,
        duration: 500,
      }).start();
      this.setState({ plusFirstTime: false, num: this.state.num + 1 });
    } else {
      this.setState({ numFontSize: new Animated.Value(0) }, () => {
        Animated.timing(this.state.numFontSize, {
          toValue: 200,
          duration: 500,
        }).start();
        const newNum = this.state.num + 1;
        this.setState({ num: newNum, total: 29 * newNum });
      })
    }
  }

  handleMinus = () => {
    this.setState({ numFontSize: new Animated.Value(0) }, () => {
      Animated.timing(this.state.numFontSize, {
        toValue: 200,
        duration: 500,
      }).start();
      const newNum = this.state.num - 1;
      this.setState({ num: newNum, total: 29 * newNum });
    })
  }

  render() {

    const plusBtnStyle = {
      position: 'absolute',
      zIndex: 3,
      backgroundColor: '#0d98ba',
      borderRadius: 50,
      borderWidth: 0,
      justifyContent: 'center',
      marginLeft: this.state.plusMarginLeft,
      width: this.state.plusWidth,
      height: this.state.plusHeight
    };

    const minusBtnStyle = {
      position: 'absolute',
      zIndex: 2,
      backgroundColor: 'white',
      borderRadius: 50,
      borderWidth: 2,
      borderColor: 'gray',
      justifyContent: 'center',
      width: this.state.minusWidth,
      height: this.state.minusHeight
    };

    const numberViewStyle = {
      position: 'absolute',
      zIndex: 1,
      backgroundColor: '#d3d3d3',
      borderRadius: 50,
      borderWidth: 0,
      justifyContent: 'center',
      width: this.state.numWidth,
      height: this.state.numHeight,
      marginLeft: 25,
    };

    const textSize = this.state.numFontSize.interpolate({
      inputRange: [0, 100, 200],
      outputRange: [30, 20, 30],
    });

    const numTextStyle = {
      color: '#adadad',
      textAlign: 'center',
      fontSize: textSize,
    }
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.total}>{`$${this.state.total}`}</Text>
          <View style={styles.section}>
            <Animated.View style={numberViewStyle}>
              <Animated.Text style={numTextStyle}>{this.state.num}</Animated.Text>
            </Animated.View>
            <Animated.View style={minusBtnStyle}>
              <TouchableOpacity onPress={this.handleMinus}>
                <Text style={styles.minusText}>-</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={plusBtnStyle}>
              <TouchableOpacity onPress={this.handlePlus}>
                <Text style={styles.plusText}>+</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  section: {
    flex: 1,
    justifyContent: 'center'
  },
  numberView: {
    position: 'absolute',
    zIndex: 1,
    width: 50,
    height: 50,
    backgroundColor: '#d3d3d3',
    borderRadius: 50,
    borderWidth: 0,
    justifyContent: 'center'
  },
  minusBtn: {
    position: 'absolute',
    zIndex: 2,
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'gray',
    justifyContent: 'center'
  },
  plusBtn: {
    position: 'absolute',
    zIndex: 3,
    width: 100,
    height: 100,
    backgroundColor: '#0d98ba',
    borderRadius: 50,
    borderWidth: 0,
    justifyContent: 'center'
  },
  minusText: {
    fontSize: 40,
    color: 'gray',
    textAlign: 'center',
  },
  plusText: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
  },
  numText: {
    fontSize: 30,
    color: '#adadad',
    textAlign: 'center',
  },
  total: {
    width: '50%',
    fontSize: 50,
    color: '#adadad',
    textAlign: 'left',
  }
});
