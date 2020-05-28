import React, { memo, useMemo, ReactNode } from 'react'
import {
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  View,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
  StyleProp,
} from 'react-native'

import styles from './styles'

const canUseNativeFeedback = Platform.OS === 'android' && Platform.Version > 20

const AndroidTouchableComponent = memo((props: AndroidTouchableComponentProps) => {
  const { rippleColor, borderless, ...otherProps } = props

  const background = useMemo(() => {
    if (borderless) {
      return TouchableNativeFeedback.SelectableBackgroundBorderless()
    }
    return TouchableNativeFeedback.SelectableBackground()
  }, [borderless])

  const ripple = useMemo(() => (rippleColor ? TouchableNativeFeedback.Ripple(rippleColor, borderless) : null), [
    rippleColor,
    borderless,
  ])

  if (canUseNativeFeedback) {
    return (
      <TouchableNativeFeedback
        {...otherProps}
        delayPressIn={0}
        background={Platform.Version >= 21 && ripple ? ripple : background}
      >
        {props.children}
      </TouchableNativeFeedback>
    )
  }
  return null
})

export const Touchable = memo((props: TouchableProps) => {
  const {
    children,
    borderless = false,
    highlight = false,
    style,
    rippleColor,
    forceStyle,
    withoutFeedback,
    ...otherProps
  } = props

  const innerStyle = useMemo(() => {
    const flattenStyles = StyleSheet.flatten(style)
    const borderWidth = flattenStyles?.borderWidth ? Number(flattenStyles.borderWidth) : 0
    const height = flattenStyles?.height ? Number(flattenStyles.height) : 0
    const computedStyle = {
      ...flattenStyles,
      height: height - borderWidth * 2,
    }
    return borderWidth ? computedStyle : style
  }, [style])

  if (withoutFeedback) {
    return (
      <View style={[style, styles.container, forceStyle]}>
        <TouchableWithoutFeedback {...otherProps} delayPressIn={0}>
          <View style={[innerStyle, styles.inner, forceStyle]}>{children}</View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  if (Platform.OS === 'android' && borderless) {
    return (
      <AndroidTouchableComponent {...otherProps} borderless={borderless} rippleColor={rippleColor}>
        <View style={[innerStyle, forceStyle]}>{children}</View>
      </AndroidTouchableComponent>
    )
  }
  if (highlight) {
    return (
      <TouchableHighlight {...otherProps} style={[style, styles.container, forceStyle]}>
        <View style={[innerStyle, styles.inner, forceStyle]}>{children}</View>
      </TouchableHighlight>
    )
  }
  if (Platform.OS === 'android') {
    return (
      <View style={[style, styles.container, forceStyle]}>
        <AndroidTouchableComponent {...otherProps} borderless={borderless} rippleColor={rippleColor}>
          <View style={[innerStyle, styles.inner, forceStyle]}>{children}</View>
        </AndroidTouchableComponent>
      </View>
    )
  }
  return (
    <TouchableOpacity {...otherProps} style={[style, styles.container, forceStyle]}>
      <View style={[innerStyle, styles.inner, forceStyle]}>{children}</View>
    </TouchableOpacity>
  )
})

interface AndroidTouchableComponentProps {
  children: ReactNode
  borderless?: boolean
  rippleColor?: string
}

export interface TouchableProps extends TouchableOpacityProps {
  children: ReactNode | ReactNode[]
  borderless?: boolean
  highlight?: boolean
  rippleColor?: string
  forceStyle?: StyleProp<ViewStyle>
  withoutFeedback?: boolean
}
