import { useFormik } from 'formik'
import * as Yup from 'yup'
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { FormInputs } from 'user-interface'
import { get, trim } from 'lodash'
import axios from 'axios'
import { date } from 'yup/lib/locale'

const INPUTS = [{
  name: 'title',
  placeholder: 'titre',
  autoCapitalize: 'none'
}, {
  name: 'description',
  placeholder: 'description',
  autoCapitalize: 'none'
}, {
  name: 'companyName',
  placeholder: 'nom de l\'entreprise',
  autoCapitalize: 'none'
}, {
  name: 'address',
  placeholder: 'addresse',
  autoCapitalize: 'none'
}, {
  name: 'availability',
  placeholder: 'date de disponibilité',
  autoCapitalize: 'none'
}, {
  name: 'expiration',
  placeholder: 'date d\'expiration',
  autoCapitalize: 'none'
}, {
  name: 'status',
  placeholder: 'status',
  autoCapitalize: 'none'
}, {
  name: 'email',
  placeholder: 'email',
  keyboardType: 'email-address',
  autoCapitalize: 'none'
}, {
  name: 'password',
  placeholder: 'mot de passe',
  secureTextEntry: true
}]

interface formFieldsProps {
  title: string,
  email: string,
  description: string,
  companyName: string,
  address: string,
  availability: string,
  expiration: string,
  status: string
}

export const registerAd = async (formFields: formFieldsProps) => await axios.post('/offers', {
  title: trim(get(formFields, 'title')),
  email: trim(get(formFields, 'email')),
  description: trim(get(formFields, 'description')),
  companyName: trim(get(formFields, 'companyName')),
  address: trim(get(formFields, 'address')),
  availability: trim(get(formFields, 'address')),
  expiration: trim(get(formFields, 'expiration')),
  status: trim(get(formFields, 'status'))
})

export const CreateAd = (): JSX.Element => {

  const sendData = async (formFields: formFieldsProps) => {
    try {
      registerAd(formFields)
    } catch (err) {
      console.log(err)
    }
  }


  const registerSchema = Yup.object().shape({
    username: Yup.string().email('merci d ecrire un email valide').trim().required('vous devez indiquer votre email'),
    password: Yup.string()
      .min(8, 'mot de passe trop court')
      .max(30, 'mot de passe trop long')
      .matches(/[A-Z]{1,}/, { excludeEmptyString: true, message: 'Majuscule necessaire au 1er charactere' })
      .trim()
      .required('vous devez indiquer un mot de passe')
    })
  
  const { values, handleChange, errors, submitCount } = useFormik({
    initialValues: {
      title: '',
      email: '',
      description: '',
      companyName: 'SOAT',
      address: '',
      availability: Date.now().toString(),
      expiration: Date.now().toString(),
      status: ''
    },
    validationSchema: registerSchema,
    onSubmit: sendData
  })

  return (
  <>
    <FormInputs
      key='createAd'
      inputs={INPUTS}
      submitCount={submitCount}
      errors={errors}
      values={values}
      handleChange={handleChange}
    />
  </>
  )
}