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

export default class QuoteText extends Component {
  static displayName = 'QuoteText';

  render() {
    return (
      <Text style={[this.props.style, fonts.quote, scaled.quote]}>
        {this.props.children}
      </Text>
    );
  }
}

const scaled = StyleSheet.create({
  quote: {
    fontSize: width / scalingFactors.quote
  }
});

QuoteText.propTypes = {
  style: View.propTypes.style
};
