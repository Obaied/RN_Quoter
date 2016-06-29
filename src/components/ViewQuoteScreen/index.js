'use strict';

import React, {
  Component
} from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import Reflux from 'reflux';
import colors from './../../styles/colors';
import QuoteText from './../QuoteText';
import HeadingText from './../HeadingText';

export default class ViewQuoteScreen extends Component {
  static displayName = 'ViewQuoteScreen';

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <HeadingText style={styles.authorText}>
          {this.props.rowData.authorName}
        </HeadingText>

        <QuoteText style={styles.quoteText}>
          {this.props.rowData.text}
        </QuoteText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#F5FCFF',
  },
  authorText: {
  },
  quoteText: {
    paddingTop: 20,
  },
});
