import React from 'react'
import Downshift from 'downshift'
import ChevronDown from 'react-icons/fa/chevron-down'

import {
    Root,
    ValueWrapper,
    MenuIcon,
    Menu,
    MenuItem,
    MenuItemButton
} from './Common'

const DropdownButton = ValueWrapper.withComponent('button').extend`
    cursor: pointer;
    transition: all 150ms linear;
    color: ${props => (props.isPlaceholder ? 'gray' : 'inherit')};
    text-align: left;

    &:hover,
    &:focus,
    &:active {
        border-color: #0063cc;
        outline: none;
    }
`

const DropdownMenuIcon = MenuIcon.extend`
    transition: all 150ms linear;
    transform-origin: center;
    color: initial;
    fill: initial;

    ${DropdownButton}:hover &,
    ${DropdownButton}:focus &,
    ${DropdownButton}:active & {
        outline: none;
        color: #0063cc;
        fill: #0063cc;
    }

    ${DropdownButton}:active & {
        transform: scale(1.1, 1.1);
    }
`

export const Dropdown = ({ options, onSelect }) => (
    <Downshift
        onSelect={onSelect}
        itemToString={item => (item ? item.label : '')}
    >
        {({
            getButtonProps,
            getItemProps,
            getRootProps,
            highlightedIndex,
            isOpen,
            selectedItem
        }) => (
            <Root {...getRootProps({ refKey: 'innerRef' })}>
                <DropdownButton
                    {...getButtonProps()}
                    isPlaceholder={!selectedItem}
                >
                    {selectedItem ? selectedItem.label : 'Select a fruit'}
                    <DropdownMenuIcon isOpen={isOpen}>
                        <ChevronDown />
                    </DropdownMenuIcon>
                </DropdownButton>
                {isOpen && (
                    <Menu>
                        {options.map((option, idx) => (
                            <MenuItem
                                key={option.value}
                                highlighted={idx === highlightedIndex}
                            >
                                <MenuItemButton
                                    active={
                                        selectedItem &&
                                        option.value === selectedItem.value
                                    }
                                    {...getItemProps({ item: option })}
                                >
                                    {option.label}
                                </MenuItemButton>
                            </MenuItem>
                        ))}
                    </Menu>
                )}
            </Root>
        )}
    </Downshift>
)
