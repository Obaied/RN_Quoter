'use strict';

import React, {
  Component
} from 'react';

import {
  StyleSheet,
  View,
  Text,
  Navigator,
  TouchableHighlight,
  Alert,
  BackAndroid,
} from 'react-native';

import MainScreen      from './MainScreen';
import NewQuoteScreen  from './NewQuoteScreen';
import LibraryScreen   from './LibraryScreen';
import ViewQuoteScreen from './ViewQuoteScreen';

import Reflux          from 'reflux';
import Colors          from '../styles/colors';

import QuotesStore     from './../stores/QuotesStore';

export default class Quoter extends Component {
  static displayName = 'Quoter';

  constructor(props) {
    super(props);

    this._renderScene   = this._renderScene.bind(this);
    this.newQuote       = this.newQuote.bind(this);
    this.viewLibrary    = this.viewLibrary.bind(this);
    this.goHome         = this.goHome.bind(this);
    this.onQuotesChange = this.onQuotesChange.bind(this);

    this.state = {
      quotes: []
    }
  }

  componentDidMount() {
    console.log('Quoter.js: componentDidMount: >>>>>')
    this.unsubscribe = QuotesStore.listen(this.onQuotesChange);
  }

  componentWillUnmount() {
    console.log('Quoter.js: componentWillUnmount:')
    this.unsubscribe();
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.refs.navigator.getCurrentRoutes().length === 1  ) {
        return false;
      }
      this.refs.navigator.pop();
      return true;
    });
  }

  onQuotesChange(quotes) {
    console.log('Quoter.js: onQuotesChange()')
    this.setState({
      quotes: quotes
    });
  }

  newQuote() {
    this.refs.navigator.push({
      name: 'newQuote',
      data: {
      }
    });
  }

  viewLibrary() {
    var quotes = this.state.quotes;
    if (quotes.length == 0) {
      Alert.alert(
        'Quoter',
        'Please add quotes first to access the library',
        [
          {text: 'OK', 
            onPress: () => {}},
        ]
      )
      return;
    }

    this.refs.navigator.push({
      name: 'library',
      data: {
        quotes: quotes
      }
    });
  }

  goHome() {
    this.refs.navigator.popToTop();
  }

  _renderScene(route, navigator) {
    switch (route.name) {
      case 'mainScreen':
        return <MainScreen
          newQuote={this.newQuote}
          viewLibrary={this.viewLibrary} />;

        case 'newQuote':
          return <NewQuoteScreen
            navigator={navigator}
            newQuote={this.newQuote}
            finish={this.goHome}
            {...route.data} />;

          case 'library':
            return <LibraryScreen
              navigator={navigator}
              finish={this.goHome}
              {...route.data} />;

            case 'viewQuote':
              return <ViewQuoteScreen
                navigator={navigator}
                finish={this.goHome}
                {...route.data} />;

              default:
                console.error('Encountered unexpected route: ' + route.name);
    }

    return <MainScreen />;
  }

  _configureScene(route) {
    return Navigator.SceneConfigs.FadeAndroid;
  }

  render() {
    return (
      <Navigator
        ref='navigator'
        style={styles.navigator}
        initialRoute={{name: 'mainScreen'}}
        renderScene={this._renderScene}
        configureScene={this._configureScene}
        />
    );
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if(index > 0) {
      return (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => { 
            if (index > 0) { 
              navigator.pop() 
            } 
          }}>
          <Text style={ styles.leftNavButtonText }>Back</Text>
        </TouchableHighlight>)
    } 
    else { return null }
  },

  RightButton(route, navigator, index, navState) {
  },

  Title(route, navigator, index, navState) {
    return (
      <Text style={ styles.navBarTitle }>
        Quoter
      </Text>
    )
  }
};

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
  leftNavButtonText: {
    paddingLeft: 10,
    marginVertical: 10,
  },
  navBarTitle: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBar: {
    height: 60,
    backgroundColor: Colors.gray2
  },
});
