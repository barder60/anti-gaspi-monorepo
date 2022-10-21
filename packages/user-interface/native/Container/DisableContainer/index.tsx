import React, { Children, isValidElement, ReactElement } from 'react'
import PropTypes from 'prop-types'

interface DisableContainerProps {
  as: any,
  children: any,
  disabled: boolean
}

const DisableContainer = ({ as: Component, children, disabled, ...props }: DisableContainerProps) => {
  const child = Children.map(children, (element) => {
    if (!isValidElement(element)) {
      return element
    }
    return React.cloneElement(element as ReactElement<any>, {
      disabled
    })
  })
  if (!Component) {
    return child
  }
  return (
    <Component disabled={disabled} {...props}>
      {child}
    </Component>
  )
}

DisableContainer.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool
}

DisableContainer.defaultProps = {
  as: null,
  children: [],
  disabled: false
}

export default DisableContainer
