'use strict';

import { StyleSheet } from 'react-native';

const fonts = StyleSheet.create({
  big: {
    alignSelf:   'center',
    fontFamily:  'Avenir Medium'
  },
  normal: {
    fontFamily:  'Avenir Medium'
  },
  quote: {
    fontFamily:  'Avenir Medium',
    fontStyle:   'italic'
  }
});

const scalingFactors = {
  quote:   17,
  normal:  15,
  big:     7,
}

module.exports = {fonts, scalingFactors};
