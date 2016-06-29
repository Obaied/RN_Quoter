'use strict';

import React, {
  Component
} from 'react';

import {
  StyleSheet,
  View,
  Image
} from 'react-native';

import HeadingText from './../HeadingText';

export default class Heading extends Component {
  static displayName = 'Heading';

  render() {
    return (
      <View style={styles.heading}>
        <HeadingText>QUOTER</HeadingText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  }
});
