'use strict';

import React, {
  Component
} from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  Alert
} from 'react-native';

import Reflux from 'reflux';
import NormalText from './../NormalText';
import Button from './../Button';
import QuoteActions from './../../actions';

import colors from './../../styles/colors';
import fonts from './../../styles/fonts';
import QuoteModel from './../../data/Quote';

export default class NewQuoteScreen extends Component {
  static displayName = 'NewQuoteScreen';

  constructor(props) {
    super(props);

    this._onSubmit = this._onSubmit.bind(this);
    this._onClear = this._onClear.bind(this);
    this._onChange_author = this._onChange_author.bind(this);
    this._onChange_quote = this._onChange_quote.bind(this);

    this.state = {
      authorText: '',
      quoteText: ''
    };
  }

  _onChange_author(text) {
    this.setState({authorText: text})
  }

  _onChange_quote(text) {
    this.setState({quoteText: text})
  }

  _onSubmit() {
    //Create a Quote model
    let quote = new QuoteModel(this.state.authorText, 
                               this.state.quoteText);
    //Dispatch an action to create it in AsyncStorage
    QuoteActions.createQuote(quote);

    Alert.alert(
      'Quoter',
      'Quote Accepted',
      [
        {text: 'OK', onPress: () => this.props.finish()},
      ]
    )
  }

  _onClear() {
    this.setState({
      authorText: '',
      quoteText: ''
    });

    this.refs.authorInput.setNativeProps({text: ''});
    this.refs.quoteInput.setNativeProps({text: ''});
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={[styles.authorField, styles.wideButton, fonts.normal, this.props.style]}
          ref='authorInput'
          multiline={false}
          placeholder={`Author's name`}
          value={this.state.authorText}
          onChangeText={this._onChange_author}
          autoCapitalize={'words'}
          autoCorrect={true}/>

        <TextInput
          style={[styles.quoteField, styles.wideButton, fonts.normal, this.props.style]}
          ref='quoteInput'
          multiline={true}
          placeholder={`Quote`}
          autoCapitalize={'sentences'}
          value={this.state.quoteText}
          onChangeText={this._onChange_quote}
          autoCorrect={true}/>

        <View
          style={styles.buttonRow}>
          <Button
            style={styles.submitButton}
            onPress={this._onSubmit}>
            <NormalText style={{textAlign: 'center'}}>Submit Quote</NormalText>
          </Button>

          <Button
            style={styles.clearButton}
            onPress={this._onClear}>
            <NormalText style={{textAlign: 'center'}}>Clear</NormalText>
          </Button>
        </View>
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
  },
  authorField: {
    backgroundColor: colors.tan,
    height: 60
  },
  quoteField: {
    backgroundColor: colors.green,
    height: 120
  },
  wideButton: {
    justifyContent: 'center',
    flex: 1,
    padding: 10,
    margin: 10
  },
  submitButton: {
    flex: 1,
    justifyContent: 'center'
  },
  clearButton: {
    flex: 1
  },
  buttonRow: {
    flexDirection: 'row'
  }
});
