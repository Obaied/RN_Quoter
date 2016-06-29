import { 
  AsyncStorage 
} from 'react-native';

import Reflux from 'reflux';
import moment from 'moment';
import QuoteActions from './../actions';
import Quote from './../data/Quote';

const QUOTE_KEY = 'quoter-quotes';

var quotesStore = Reflux.createStore({
  init() {
    this._quotes = [];
    this._loadQuotes().done();

    this.listenTo(QuoteActions.createQuote, this.createQuote);
    this.listenTo(QuoteActions.clearAllQuotes, this.clearAllQuotes);
  },

  async _loadQuotes() {
    try {
      var val = await AsyncStorage.getItem(QUOTE_KEY);
      if (val === null) {
        console.info(`${QUOTE_KEY} not found on disk`)
        return;
      }

      this._quotes = JSON.parse(val)
        .map((quoteObj) => {
          return Quote.fromObject(quoteObj);
        });
        this.emit();
    } catch (error) {
      console.error(`AsyncStorage error: ${error.message}`);
    }
  },

  async _writeQuotes() {
    try {
      await AsyncStorage.setItem(QUOTE_KEY, JSON.stringify(this._quotes));
    } catch (error) {
      console.error(`AsyncStorage error: ${error.message}`);
    }
  },

  clearAllQuotes() {
    this._quotes = [];
    this.emit();
  },

  emit() {
    this._writeQuotes().done();
    this.trigger(this._quotes);
  },

  createQuote(quote) {
    this._quotes.push(quote);
    this.emit();
  }
});

module.exports = quotesStore;
