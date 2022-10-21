import React from 'react'
import PropTypes from 'prop-types'
import { useRoute } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'

interface AnalyticsTouchableOpacityProps {
  children: any, 
  name: string, 
  onPress: Function, 
  event: string
}

const AnalyticsTouchableOpacity = ({ children, name, onPress, event, ...props }: AnalyticsTouchableOpacityProps) => {

  const onPressHandler = async () => {
    await Promise.all([
      await onPress()
    ])
  }

  return (
    <TouchableOpacity onPress={onPressHandler} {...props}>
      {children}
    </TouchableOpacity>
  )
}

AnalyticsTouchableOpacity.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  event: PropTypes.string
}

AnalyticsTouchableOpacity.defaultProps = {
  event: 'press_event'
}

export default AnalyticsTouchableOpacity
