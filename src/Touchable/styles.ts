import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  container: {
    ...Platform.select({
      android: {
        overflow: 'hidden',
      },
    }),
    padding: 0,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  inner: {
    ...Platform.select({
      android: {
        elevation: 0,
        borderRadius: 0,
      },
      ios: {
        overflow: 'hidden',
        shadowOpacity: 0,
      },
    }),
    margin: 0,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    marginHorizontal: 0,
    marginVertical: 0,
    borderWidth: 0,
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})
