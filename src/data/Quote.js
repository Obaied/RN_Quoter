'use strict';

import md5 from 'md5';

export default class Quote {
  constructor(authorName, text) {
    this.id         = md5(text.substring(0, 30));
    this.authorName = authorName;
    this.text       = text;
  }

  setFromObject(obj) {
    this.id         = obj.id;
    this.authorName = obj.authorName;
    this.text       = obj.text;
  }

  static fromObject(obj) {
    let quote = new Quote(obj.authorName, obj.text);
    quote.setFromObject(obj);
    return quote;
  }
}
