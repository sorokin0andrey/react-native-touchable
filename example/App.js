import React, { memo, useCallback } from 'react'
import { StyleSheet, Text, SafeAreaView, View, Image } from 'react-native'
import { Touchable } from '@busfor/react-native-touchable'

const iconSource = require('./icon.png')

const Button = memo(({ title, ...props }) => {
  return (
    <Touchable style={styles.buttonTouchable} {...props}>
      <View style={styles.buttonInner}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Touchable>
  )
})

export default memo(() => {
  const onPress = useCallback(() => console.log('it works!'), [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.fullWidth, styles.item]}>
        <Button onPress={onPress} title='Full width button' />
      </View>
      <View style={styles.item}>
        <Button onPress={onPress} title='Button' />
      </View>
      <View style={styles.item}>
        <Button onPress={onPress} highlight title='Button with highlight' />
      </View>
      <View style={styles.item}>
        <Button onPress={onPress} withoutFeedback title='Button without feedback' />
      </View>
      <View style={styles.item}>
        <Touchable style={styles.addTapArea} borderless onPress={onPress}>
          <Image style={styles.icon} source={iconSource} />
        </Touchable>
      </View>
      <Touchable style={styles.bar} rippleColor='#ffb8c1' onPress={onPress}>
        <Text>Press here</Text>
      </Touchable>
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonTouchable: {
    backgroundColor: '#F9253F',
    height: 56,
    borderRadius: 16,
    elevation: 3,
  },

  buttonInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  title: {
    color: '#fff',
    fontSize: 16,
  },

  fullWidth: {
    width: '100%',
    paddingHorizontal: 16,
  },

  item: {
    marginBottom: 40,
  },

  icon: {
    tintColor: '#F9253F',
  },

  addTapArea: {
    padding: 16,
    margin: -16,
  },

  bar: {
    height: 56,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F9253F',
  },
})
