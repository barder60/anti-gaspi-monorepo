import React, { ReactNode } from 'react'
import PropTypes from 'prop-types'
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select'
import { Dimensions } from 'react-native'
import { get, isEmpty } from 'lodash'

const { width, height } = Dimensions.get('window')

interface PickerStyle {
  value: any,
  items: any[],
  style: Object, 
  placeholder: string, 
  disabled: boolean, 
  backgroundColor: string,
  onValueChange: (value: any, index: number) => void
}

const AppPicker = ({ items, style, value, placeholder, disabled, backgroundColor, onValueChange, ...props }: PickerStyle) => {
  const containerStyle = {
    position: 'relative',
    minWidth: '100%',
    paddingTop: 8,
    marginTop: 2.5,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor,
    borderWidth: 1,
    borderColor: disabled ? 'grey' : 'black',
    borderRadius: 5,
    marginBottom: 20,
    ...get(style, 'containerStyle', {})
  }

  const commonInput = {
    color: disabled ? 'grey' : 'black',
    fontFamily: 'SourceSansPro_700Bold',
    fontSize: 18,
    paddingRight: 20,
    ...get(style, 'inputStyle', {})
  }

  const customStyle = {
    ...style,
    placeholder: {
      color: disabled ? 'grey' : 'black',
      ...get(style, 'placeholder', {})
    },
    viewContainer: {
      ...containerStyle,
      ...get(style, 'viewContainer', {})
    },
    headlessAndroidContainer: {
      ...containerStyle,
      ...get(style, 'headlessAndroidContainer', {})
    },
    headlessAndroidPicker: {
      width,
      height
    },
    inputIOS: {
      ...commonInput,
      ...get(style, 'inputIOS', {})
    },
    inputAndroid: {
      ...commonInput,
      ...get(style, 'inputAndroid', {})
    }
  }
  const pickerPlaceholder = isEmpty(placeholder) ? {} : { label: placeholder, value: null }
  
  return (
    <>
      <RNPickerSelect
        items={items}
        disabled={disabled}
        style={customStyle}
        onValueChange={onValueChange}
        fixAndroidTouchableBug={true}
        useNativeAndroidPickerStyle={false}
        placeholder={pickerPlaceholder}
        {...props}/>
    </>
  )
}

AppPicker.propTypes = {
  items: PropTypes.array.isRequired,
  onValueChange: PropTypes.func.isRequired,
  style: PropTypes.object,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool
}

AppPicker.defaultProps = {
  style: {},
  placeholder: '',
  disabled: false
}

export default AppPicker
