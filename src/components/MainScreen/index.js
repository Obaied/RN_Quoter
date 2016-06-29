'use strict';

import React, {
  Component
} from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import Reflux from 'reflux';
import NormalText from './../NormalText';
import Button from './../Button';
import Heading from './../Heading';

import colors from './../../styles/colors';

class NewQuoteButton extends Component {
  static displayName = 'NewQuoteButton';

  render() {
    return (
      <Button
        style={styles.newQuote}
        onPress={this.props.onPress}>
        <NormalText>
          {'New Quote'}
        </NormalText>
      </Button>
    );
  }
}

class LibraryButton extends Component {
  static displayName = 'LibraryButton';

  render() {
    return (
      <Button
        style={styles.library}
        onPress={this.props.onPress}>
        <NormalText>Library</NormalText>
      </Button>
    );
  }
}

export default class MainScreen extends Component {
  static displayName = 'MainScreen';

  constructor(props) {
    super(props);

    this._newQuote = this._newQuote.bind(this);
    this._viewLibrary = this._viewLibrary.bind(this);
  }

  _newQuote() {
    this.props.newQuote();
  }

  _viewLibrary() {
    this.props.viewLibrary();
  }

  render() {
    return (
      <View style={styles.container}>
        <Heading/>
        <NewQuoteButton
          onPress={this._newQuote} />
        <LibraryButton
          onPress={this._viewLibrary} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
  },
  library: {
    backgroundColor: colors.blue
  },
  newQuote: {
    backgroundColor: colors.blue,
  }
});
