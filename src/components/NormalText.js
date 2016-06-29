'use strict';

import React, {
  Component
} from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {fonts, scalingFactors} from './../styles/fonts';
import Dimensions from 'Dimensions';

let { width } = Dimensions.get('window');

export default class NormalText extends Component {
  static displayName = 'NormalText';

  render() {
    return (
      <Text style={[this.props.style, fonts.normal, scaled.normal]}>
        {this.props.children}
      </Text>
    );
  }
}

const scaled = StyleSheet.create({
  normal: {
    fontSize: width / scalingFactors.normal
  }
});

NormalText.propTypes = {
  style: Text.propTypes.style
};
