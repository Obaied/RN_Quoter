'use strict';

import React, {
  Component
} from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native';

import colors from './../styles/colors';

export default class Button extends Component {
  static displayName = 'Button';

  render() {
    let opacity = this.props.disabled ? 1 : 0.5;

    return (
      <TouchableOpacity
        activeOpacity={opacity}
        onPress={this.props.onPress}
        style={[styles.wideButton, this.props.style]}>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  wideButton: {
    justifyContent:   'center',
    alignItems:       'center',
    flex:             1,
    padding:          10,
    margin:           10,
    backgroundColor:  colors.pink
  }
});

Button.propTypes = {
  onPress:   React.PropTypes.func.isRequired,
  style:     View.propTypes.style,
  chidlren:  React.PropTypes.object,
  disabled:  React.PropTypes.bool
};

Button.defaultProps = {
  disabled:  false
};
