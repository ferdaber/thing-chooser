import PropTypes from 'prop-types'

export const optionPropTypes = {
    label: PropTypes.string,
    value: PropTypes.any
}

export const optionsPropTypes = PropTypes.arrayOf(PropTypes.shape(optionPropTypes))

export const mergeRootProps = (getRootProps, innerRef) => {
    // used to merge the downshift rootprops and our own innerRef so they don't overwrite each other
    const rootProps = getRootProps({ refKey: 'innerRef' })
    return {
        ...rootProps,
        innerRef(el) {
            rootProps.innerRef(el)
            innerRef && innerRef(el)
        }
    }
}
