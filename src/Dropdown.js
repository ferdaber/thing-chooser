import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Downshift from 'downshift'

import {
    CommonContainer,
    CommonIcon,
    bodyMixin,
    Menu,
    MenuItem,
    MenuItemButton,
    DEFAULT_HEIGHT,
    DEFAULT_WIDTH,
    DEFAULT_MENU_HEIGHT
} from './shared-styles'
import { optionsPropTypes, mergeRootProps } from './utils'

import { bluePrimary, iconColorActive, iconColorHover, nightMedLight } from '@widen/patterns-style/lib/colors'

import ArrowDown from 'react-icons/lib/md/keyboard-arrow-down'

export const Button = styled.button`
    ${bodyMixin}
    color: ${props => (props.hasPlaceholder ? nightMedLight : 'inherit')};
    cursor: pointer;
    text-align: left;
    transition: all 150ms linear;

    &:hover,
    &:focus,
    &:active {
        border-color: ${bluePrimary};
        outline: none;
    }
`

export const Icon = CommonIcon.extend`
    ${Button}:hover & {
        color: ${iconColorHover};
        fill: ${iconColorHover};
    }

    ${Button}:focus &,
    ${Button}:active & {
        color: ${iconColorActive};
        fill: ${iconColorActive};
        outline: none;
    }

    ${Button}:active & {
        transform: scale(1.1, 1.1);
    }
`

export const Dropdown = ({ className, height, innerRef, maxMenuHeight, onSelect, options, placeholder, width }) => (
    <Downshift onSelect={onSelect} itemToString={item => (item ? item.label : '')}>
        {({ getButtonProps, getItemProps, getRootProps, highlightedIndex, isOpen, selectedItem }) => (
            <CommonContainer {...mergeRootProps(getRootProps, innerRef)} className={className} width={width}>
                <Button {...getButtonProps()} hasPlaceholder={!selectedItem} height={height}>
                    {selectedItem ? selectedItem.label : placeholder}
                    <Icon isOpen={isOpen} height={height}>
                        <ArrowDown focusable="false" />
                    </Icon>
                </Button>
                {isOpen && (
                    <Menu width={width} maxMenuHeight={maxMenuHeight}>
                        {options.map((option, idx) => (
                            <MenuItem key={option.value} isHighlighted={idx === highlightedIndex}>
                                <MenuItemButton
                                    isActive={selectedItem && option.value === selectedItem.value}
                                    {...getItemProps({ item: option })}
                                >
                                    {option.label}
                                </MenuItemButton>
                            </MenuItem>
                        ))}
                    </Menu>
                )}
            </CommonContainer>
        )}
    </Downshift>
)

Dropdown.defaultProps = {
    height: DEFAULT_HEIGHT,
    width: DEFAULT_WIDTH,
    maxMenuHeight: DEFAULT_MENU_HEIGHT
}

Dropdown.propTypes = {
    className: PropTypes.string,
    height: PropTypes.number,
    innerRef: PropTypes.func,
    maxMenuHeight: PropTypes.number,
    onSelect: PropTypes.func,
    options: optionsPropTypes.isRequired,
    placeholder: PropTypes.string,
    width: PropTypes.number
}

export default Dropdown
