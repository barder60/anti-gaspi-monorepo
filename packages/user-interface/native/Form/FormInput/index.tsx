import React, { Component, useState } from 'react'

import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Text, TextInput, View, Keyboard } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { get, isEmpty, map } from 'lodash'
import { Icon } from 'react-native-elements'
import AppPicker from '../../Picker'
import DisableContainer from '../../Container/DisableContainer'
import AnalyticsTouchableOpacity from '../../AnalyticsTouchableOpacity'


interface StyledError {
  error: object,
  disabled: boolean
}

const InputWrapper = styled(View)<StyledError>`
  flex-direction: row;
  ${({ error, disabled }) => `border: 1px solid ${disabled ? 'grey' : error ? 'orange' : 'blue'}`};
  margin-top: 5px;
  margin-bottom: ${({ error }) => error ? 0 : 17}px;
  border-radius: 5px;
  background-color: 'white';
`

const StyledInputMasked = styled(TextInputMask)<StyledError>`
  flex: 1;
  font-family: 'SourceSansPro_400Regular';
  font-size: 18px;
  color: ${({ error, disabled }) => disabled ? 'grey' : error ? 'orange' : 'blue'};
  padding-left: 15px;
  padding-right: 15px;
  height: 100%;
  max-height: 100%;
  min-width: 200px;
  min-height: 41px;
`

interface LabelStyle {
  textColor: string
}

const StyledLabel = styled(Text)<LabelStyle>`
  /* font-family: ''; */
  color: ${({ textColor }) => textColor || '#fff'};
  font-size: 16px;
  margin-bottom: 11px;
`

interface InputStyle {
  error: Object,
  disabled: Boolean
} 

const StyledInput = styled(TextInput)<InputStyle>`
  flex: 1;
  font-family: 'SourceSansPro_400Regular';
  font-size: 18px;
  color: ${({ error, disabled }) => disabled ? 'grey' : error ? 'red' : 'white'};
  padding-left: 15px;
  padding-right: 15px;
  height: 100%;
  max-height: 100%;
  min-width: 200px;
  marginBottom: 18
`

interface ErrorStyling {
  color: string,
  error: Object,
  errorColor: string,
  borderColor?: string,
  rowSpan: number,
  multiline: true,
  value: any, 
  placeholder: string,
}

const StyledTextArea = styled(TextInput)<ErrorStyling>`
  font-family: 'SourceSansPro_400Regular';
  margin-top: 10px;
  margin-bottom: 20px;
  background-color: #fff;
  font-size: 18px;
  color: ${({ color, errorColor, error }) => error ? errorColor : color};
  border: 1px solid ${({ borderColor }) => borderColor };
  border-radius: 5px;
  padding: 15px;
  min-height: 250px;
  text-align-vertical: top;
`

const StyledInputDisplay = styled(TextInput)<StyledError>`
  flex: 1;
  font-family: 'SourceSansPro_400Regular';
  font-size: 18px;
  color: ${({ theme, error, disabled }) => get(theme, disabled ? 'grey' : error ? 'textOrange' : 'textBlue', '#fff')};
  padding-left: 15px;
  padding-right: 15px;
  height: 100%;
  max-height: 100%;
  min-width: 200px;
  marginBottom: 18px;
`

interface DisplayedInputProps {
  mask: object
}

const DisplayedInput = ({ mask={}, error={}, disabled=false,...props }: DisplayedInputProps & StyledError) => {
  if (mask) {
    return (
      <StyledInputMasked
        type={get(mask, 'type')}
        options={get(mask, 'options')}
        includeRawValueInChangeText={true}
        error={error}
        disabled={disabled}
        {...props} />
    )
  }

  return (
      <StyledInputDisplay 
      error={error}
      disabled={disabled}
      {...props} />
  )
}

const ErrorText = styled(Text)`
  font-size: 12px;
  color: 'red';
  text-align: center;
`

const SecureIconContainer = styled(AnalyticsTouchableOpacity)`
  margin-right: 15px;
`

const SecureIconItem = styled(Icon)`
  color: 'blue';
  font-size: 15px;
`

interface SecureIconProps {
  secureText: boolean,
  updateSecureText: Function
}

const SecureIcon = ({ secureText, updateSecureText }: SecureIconProps) => {
  const onPress = () => updateSecureText(!secureText)

  return (
    <SecureIconContainer
      name={secureText ? 'display-secure-text' : 'hide-secure-text'}
      onPress={onPress}>
      <SecureIconItem name={secureText ? 'eye' : 'eye-slash'} />
    </SecureIconContainer>
  )
}

interface CustomInputProps {
  value: any,
  mask: object,
  editable: boolean
  placeholder: string,
  secureTextEntry: boolean,
  placeholderTextColor: string
}

const CustomInput = ({ secureTextEntry, error, disabled, mask, editable, placeholder, ...props }: CustomInputProps & StyledError) => {
  const [secureText, updateSecureText] = useState(secureTextEntry)

  return (
    <DisableContainer disabled={disabled}>
      <InputWrapper error={error} disabled={disabled}>
        <DisplayedInput
          mask={mask}
          error={error} 
          disabled={disabled}
          {...props} />
        {secureTextEntry && <SecureIcon secureText={secureText} updateSecureText={updateSecureText} />}
      </InputWrapper>
    </DisableContainer>
  )
}


interface AppInputProps {
  multiline: boolean,
  mask: object,
  lines: number,
  value: any,
  rowSpan: number,
  placeholder: string,
  color: string,
  picker: boolean,
  options: any,
  labelInput: string,
  error: Object,
  errorColor: string,
  borderColor?: string,
  backgroundColor: string,
  onValueChange: (value: any, index: number) => void
}

const AppInput = ({ multiline, lines, picker, value, options, labelInput, error, placeholder, color, errorColor, borderColor, onValueChange, backgroundColor, mask, ...props }: AppInputProps) => {
  const disabled = get(props, 'disabled', false)
  
  if (multiline) {
    return (
      <StyledTextArea
        multiline={multiline}
        color={color}
        errorColor={errorColor}
        value={value}
        borderColor={borderColor}
        error={error}
        placeholder={placeholder}
        {...props} />
    )
  }

  if (picker) {
    const items = map(options, ({ value, label }) => ({
      label,
      value
    }))

    return (
      <AppPicker
        items={items}
        value={value}
        backgroundColor={backgroundColor}
        onValueChange={onValueChange}
        disabled={disabled}
        placeholder={placeholder}
        {...props} />
    )
  }

  return (
    <>
      <CustomInput
        mask={mask} 
        secureTextEntry={false} 
        disabled={false} 
        value={value}
        error={error}
        editable={!disabled}
        placeholder={placeholder}
        placeholderTextColor={error ? 'orange' : 'blue'}
        {...props} />
      { !isEmpty(error) && (
        <ErrorText>{}</ErrorText>
      )}
    </>
  )
}

type FormInputProps = {
  label: string,
  placeholder: string,
  textColor: string,
  error: Object,
  multiline: boolean,
  mask: object
}

const FormInput = ({ label, placeholder, textColor, error, multiline, mask, ...props }: FormInputProps) => {
  return (
    <>
      {label && <StyledLabel textColor={textColor}>{label}</StyledLabel>}
      <AppInput
        options={undefined} 
        lines={0}
        value={undefined}
        rowSpan={0}
        color={''}
        picker={false}
        labelInput={''}
        errorColor={''}
        mask={mask}
        backgroundColor={''}
        onValueChange={function (value: any, index: number): void {
          throw new Error('Function not implemented.')
        } }
        multiline={multiline}
        error={error}
        placeholder={placeholder}
        {...props} />
    </>
  )
}


FormInput.propTypes = {
  label: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  textColor: PropTypes.string,
  placeholder: PropTypes.string,
  multiline: PropTypes.string
}

FormInput.defaultProps = {
  multiline: false,
  lines: 0
}

export default FormInput