import react, { FC, Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Button, TextInput, View } from 'react-native'
import { Formik } from 'formik'
import { get, isEqual, map } from 'lodash'
import FormInput from '../FormInput'

export type FormInputsProps = {
  inputs: any,
  values: any,
  handleChange: any,
  errors: Object,
  submitCount: number
}

type Field = {
  name: string,
  input: FC
  rules: Function
}

type Input = {
  name: string,
  placeholder: string,
  secureText: Boolean,
  label: string,
  color: string,
  error: object,
  multiline: boolean,
  mask: object,
  textColor: string
}

const FormInputs = ({ inputs, values, handleChange, errors, submitCount }: FormInputsProps) => {
  return (
    <>
     {
      map(inputs, (input: Input) => {
        return (
          <Fragment key={input.name}>
            <FormInput
            label={input.label} 
            placeholder={input.placeholder} 
            textColor={input.color} 
            error={input.error} 
            multiline={input.multiline} 
            mask={input.mask} />
          </Fragment>
          )
     })
    }
    </>
  )
}
  

FormInputs.propTypes = {
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  submitCount: PropTypes.number.isRequired,
  inputs: PropTypes.arrayOf(PropTypes.object).isRequired
}
  

export default FormInputs