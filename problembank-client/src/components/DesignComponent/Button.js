import React, { PureComponent } from "react";
import Theme from "./Theme";
import PropTypes from "prop-types";

class Button extends PureComponent {
  render() {
    const {
      children,
      disabled,
      large,
      xlarge,
      small,
      xsmall,
      primary,
      secondary,
      type,
      onPress,
      test,
      contest,
    } = this.props;
    const { color, size, unit, depth, fontWeight } = Theme;
    const styles = {
      default: {
        border: 1,
        borderStyle: "none",
        borderColor: color.default,
        borderRadius: unit,
        color: color.default,
        fontSize: size.md,
        fontWeight: fontWeight.bold,
        padding: unit * 2,
        paddingLeft: unit * 4,
        paddingRight: unit * 4,
        outline: 0,
        cursor: "pointer",
        ":hover": {
          backgroundColor: color.grayLight,
        },
        ":focus": {
          boxShadow: "0 0 0px 2px rgba(0, 0, 0, 0.3)",
        },
      },
      xlarge: {
        fontSize: size.xg,
        padding: unit * 2.5,
      },
      large: {
        fontSize: size.lg,
        padding: unit * 2.5,
      },
      small: {
        fontSize: size.sm,
        padding: unit * 1.5,
      },
      xsmall: {
        fontSize: size.xs,
        padding: unit,
      },
      primary: {
        borderColor: color.primary,
        color: color.white,
        backgroundColor: color.primary,
        ":hover": {
          backgroundColor: color.primaryDark,
        },
      },
      secondary: {
        borderColor: color.secondary,
        color: color.secondary,
      },
      test: {
        backgroundColor: color.test,
        color: color.white,
      },
      contest: {
        backgroundColor: color.contest,
        color: color.white,
      },
      disabled: {
        borderColor: color.grayDark,
        color: color.grayLight,
        cursor: "default",
        opacity: 0.5,
        backgroundColor: color.gray,
        ":hover": {
          backgroundColor: color.gray,
        },
      },
    };
    const computedStyle = {
      ...styles.default,
      ...(xsmall && styles.xsmall),
      ...(small && styles.small),
      ...(xlarge && styles.xlarge),
      ...(secondary && styles.secondary),
      ...(primary && styles.primary),
      ...(disabled && styles.disabled),
      ...(test && styles.test),
      ...(contest && styles.contest),
    };
    return (
      <button
        style={computedStyle}
        disabled={disabled}
        onClick={onPress}
        type={type}
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  xsmall: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  xlarge: PropTypes.bool,
  secondary: PropTypes.bool,
  primary: PropTypes.bool,
  type: PropTypes.string,
  onPress: PropTypes.func,
};
Button.defaultProps = {
  onPress: () => {},
  xsmall: false,
  small: false,
  large: false,
  xlarge: false,
  secondary: false,
  primary: false,
};

export default Button;
