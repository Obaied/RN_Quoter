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
let {width} = Dimensions.get('window');

export default class HeadingText extends Component {
  static displayName = 'HeadingText';

  render() {
    return (
      <Text style={[this.props.style, fonts.big, scaled.big]}>
        {this.props.children}
      </Text>
    );
  }
}

const scaled = StyleSheet.create({
  big: {
    fontSize: width / scalingFactors.big
  }
});

HeadingText.propTypes = {
  style: View.propTypes.style
};
