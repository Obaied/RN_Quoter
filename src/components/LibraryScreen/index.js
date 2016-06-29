'use strict';

import React, {
  Component
} from 'react';

import {
  StyleSheet,
  View,
  ListView,
  Text,
  TouchableHighlight,
  Alert
} from 'react-native';

import Reflux           from 'reflux';
import NormalText       from './../NormalText';
import Button           from './../Button';

import colors           from './../../styles/colors';
import fonts            from './../../styles/fonts';
import { QuoteActions } from './../../actions';

export default class LibraryScreen extends Component {
  static displayName = 'LibraryScreen';

  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    var myQuotes = this.props.quotes;
    this.state = {
      //Mapping??
      dataSource: ds.cloneWithRows(myQuotes)
    };

    this._renderFooter   = this._renderFooter.bind(this);
    this._renderRow      = this._renderRow.bind(this);
    this._onPressRow     = this._onPressRow.bind(this);
    this._clearAllQuotes = this._clearAllQuotes.bind(this);
  }

  render() {
    return (
      <ListView 
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow} 
        renderFooter={this._renderFooter}
        renderSeparator={(sectionID, rowID) => 
          <View 
            key={`${sectionID}-${rowID}`} 
            style={styles.separator} />}
        />
    );
  }

  _onPressRow(rowData) {
    console.log(`onPressRow(): ${rowData}`);

    this.props.navigator.push({
      name: 'viewQuote',
      data: {
        rowData: rowData
      }
    });
  }

  _clearAllQuotes() {
    QuoteActions.clearAllQuotes();

    Alert.alert(
      'Quoter',
      'All quotes cleared',
      [
        {text: 'OK', onPress: () => this.props.finish()},
      ]
    )
  }

  _renderRow(rowData) {
    var rowTitle = `${rowData.authorName}`;
    var rowSubtitle = `${rowData.text.substr(0, 60).trim()}...`

    return (
      <TouchableHighlight 
        style={styles.quoteRow}
        onPress={() => this._onPressRow(rowData)}>
        <View style={styles.row}>
          <Text style={styles.authorText}>
            {rowTitle}
          </Text>
          <Text style={styles.quoteText}>
            {rowSubtitle}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  _renderFooter() {
    return (
      <Button
        style={styles.clearQuotes}
        onPress={this._clearAllQuotes} >
        <NormalText>Clear All Quotes</NormalText>
      </Button>
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
  clearQuotes: {
    marginTop: 50,
    backgroundColor: colors.pink2,
  },
  quoteRow: {
    backgroundColor: colors.tan,
    padding: 10,
  },
  authorText: {
    fontSize: 18,
  },
  quoteText: {
    paddingTop: 5,
    fontSize: 12,
    color: colors.blue
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
});
