import React from 'react'
import Downshift from 'downshift'
import styled from 'styled-components'
import ChevronDown from 'react-icons/fa/chevron-down'

import {
    ValueWrapper,
    Menu,
    MenuIcon,
    MenuItem,
    MenuItemButton
} from './Common'

const Root = styled.div`
    position: relative;
    width: 320px;
`

const Input = ValueWrapper.withComponent('input').extend`
    transition: border-color 150ms linear;

    &:focus {
        border-color: #0063cc;
        outline: none;

        + ${MenuIcon} {
            color: #0063cc;
            fill: #0063cc;
        }
    }
`

export const Autocomplete = ({ onSelect, options, placeholder }) => (
    <Downshift
        onSelect={onSelect}
        itemToString={item => (item ? item.label : '')}
    >
        {({
            getRootProps,
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            selectedItem,
            highlightedIndex
        }) => {
            const filteredResults = options.filter(option =>
                option.label.toLowerCase().includes(inputValue.toLowerCase())
            )
            const isMenuOpen = !!(isOpen && filteredResults.length)
            return (
                <Root {...getRootProps({ refKey: 'innerRef' })}>
                    <Input {...getInputProps({ placeholder })} />
                    <MenuIcon isOpen={isMenuOpen}>
                        <ChevronDown />
                    </MenuIcon>
                    {isMenuOpen && (
                        <Menu>
                            {filteredResults.map((option, idx) => (
                                <MenuItem
                                    key={option.value}
                                    highlighted={idx === highlightedIndex}
                                >
                                    <MenuItemButton
                                        {...getItemProps({ item: option })}
                                        active={
                                            selectedItem &&
                                            option.value === selectedItem.value
                                        }
                                    >
                                        {option.label}
                                    </MenuItemButton>
                                </MenuItem>
                            ))}
                        </Menu>
                    )}
                </Root>
            )
        }}
    </Downshift>
)
