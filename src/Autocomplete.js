import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Downshift from 'downshift'

import {
    bodyMixin,
    CommonContainer,
    CommonIcon,
    Menu,
    MenuItem,
    MenuItemButton,
    DEFAULT_HEIGHT,
    DEFAULT_WIDTH,
    DEFAULT_MENU_HEIGHT
} from './shared-styles'
import { mergeRootProps, optionsPropTypes } from './utils'

import { bluePrimary, iconColorActive, nightMedLight } from '@widen/patterns-style/lib/colors'

import ArrowDown from 'react-icons/lib/md/keyboard-arrow-down'

export const Input = styled.input`
    ${bodyMixin} transition: border-color 150ms linear;

    &:focus {
        border-color: ${bluePrimary};
        outline: none;
    }

    &::placeholder {
        color: ${nightMedLight};
    }
`

export const Icon = CommonIcon.extend`
    ${Input}:focus + & {
        color: ${iconColorActive};
        fill: ${iconColorActive};
    }
`

export const Autocomplete = ({
    className,
    filter,
    height,
    innerRef,
    maxMenuHeight,
    onSelect,
    options,
    placeholder,
    width
}) => (
    <Downshift onSelect={onSelect} itemToString={item => (item ? item.label : '')} defaultHighlightedIndex={0}>
        {({ getRootProps, getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex }) => {
            const filteredResults =
                filter === false
                    ? options
                    : typeof filter === 'function'
                        ? options.filter((option, index, options) =>
                              filter({ index, inputValue, option, options, selectedItem })
                          )
                        : options.filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()))
            const isMenuOpen = !!(isOpen && filteredResults.length)
            return (
                <CommonContainer {...mergeRootProps(getRootProps, innerRef)} className={className} width={width}>
                    <Input {...getInputProps({ placeholder })} height={height} />
                    <Icon isOpen={isMenuOpen} height={height}>
                        <ArrowDown focusable="false" />
                    </Icon>
                    {isMenuOpen && (
                        <Menu width={width} maxMenuHeight={maxMenuHeight}>
                            {filteredResults.map((option, idx) => (
                                <MenuItem key={option.value} isHighlighted={idx === highlightedIndex}>
                                    <MenuItemButton
                                        {...getItemProps({ item: option })}
                                        isActive={selectedItem && option.value === selectedItem.value}
                                    >
                                        {option.label}
                                    </MenuItemButton>
                                </MenuItem>
                            ))}
                        </Menu>
                    )}
                </CommonContainer>
            )
        }}
    </Downshift>
)

Autocomplete.defaultProps = {
    height: DEFAULT_HEIGHT,
    width: DEFAULT_WIDTH,
    maxMenuHeight: DEFAULT_MENU_HEIGHT
}

Autocomplete.propTypes = {
    className: PropTypes.string,
    filter: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.func]),
    height: PropTypes.number,
    innerRef: PropTypes.func,
    maxMenuHeight: PropTypes.number,
    onSelect: PropTypes.func,
    options: optionsPropTypes.isRequired,
    placeholder: PropTypes.string,
    width: PropTypes.number
}
