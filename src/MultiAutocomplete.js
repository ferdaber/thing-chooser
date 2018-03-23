import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Downshift from 'downshift'
import { FocusWithin } from 'react-focus-within'

import { Tag } from './Tag'
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
import { mergeRootProps, optionsPropTypes } from './utils'

import { bluePrimary, borderColor, nightMedLight } from '@widen/patterns-style/lib/colors'

import ArrowDown from 'react-icons/lib/md/keyboard-arrow-down'
import Plus from 'react-icons/lib/md/add'

export const InputWrapper = styled.div`
    ${bodyMixin}
    border-color: ${props => (props.isFocused ? bluePrimary : borderColor)};
    cursor: ${props => (props.isFocused ? 'text' : 'default')};
    height: auto;
    line-height: ${props => (props.height || 32) - 2}px;
    min-height: ${props => props.height || 32}px;
    overflow-x: hidden;
    transition: all 150ms linear;
`

export const InputSizer = styled.div`
    position: absolute;
    visibility: hidden;
    top: 0;
    left: 8px;
    white-space: pre;
`

export const Input = styled.input`
    background: none;
    border: none;
    /* at least show the text cursor */
    min-width: 1px;
    max-width: 100%;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: ${nightMedLight};
    }
`

export const Icon = CommonIcon.extend`
    cursor: default;
`

export const PlusIcon = styled(Plus)`
    margin-top: -1px;
`

export const OverflowSelectionLabel = styled.span`
    display: inline-block;
    vertical-align: middle;
`

export const SelectionTag = ({ innerRef, height, ...props }) => (
    <span>
        <Tag ref={innerRef} height={height ? height - 8 : undefined} {...props} />{' '}
    </span>
)
SelectionTag.propTypes = {
    innerRef: PropTypes.func,
    ...Tag.propTypes
}

export class MultiAutocomplete extends React.Component {
    selectedItemsRef = {}

    state = {
        inputWidth: 0
    }

    render() {
        const {
            height,
            innerRef,
            maxMenuHeight,
            onSelect,
            placeholder,
            className,
            renderSelectedItem,
            width
        } = this.props
        return (
            <FocusWithin onBlur={() => this.setState({ inputWidth: 0 })}>
                {({ isFocused, focusProps }) => {
                    const onFocus = event => {
                        // this prevents the expand button from immediately unmounting since it is only mounted when
                        // the entire autocomplete does not have focus
                        if (this.expandButton && this.expandButton.button === event.target) {
                            return
                        }
                        focusProps.onFocus(event)
                    }
                    return (
                        <Downshift
                            onSelect={onSelect}
                            itemToString={_ => ''}
                            onStateChange={this.resizeInput}
                            defaultHighlightedIndex={0}
                        >
                            {({
                                getInputProps,
                                getItemProps,
                                getRootProps,
                                highlightedIndex,
                                inputValue,
                                isOpen,
                                selectItem,
                                selectedItem: selectedItems
                            }) => {
                                const filteredResults = this.getFilteredResults(selectedItems, inputValue)
                                const isMenuOpen = !!(isOpen && filteredResults.length)
                                const hasSelections = !!(selectedItems && selectedItems.length)
                                return (
                                    <CommonContainer
                                        {...focusProps}
                                        {...mergeRootProps(getRootProps, innerRef)}
                                        className={className}
                                        width={width}
                                        onFocus={onFocus}
                                    >
                                        <InputWrapper
                                            onMouseDown={this.focusInput}
                                            innerRef={el => (this.inputWrapper = el)}
                                            isFocused={isFocused}
                                            height={height}
                                        >
                                            {hasSelections &&
                                                (isFocused
                                                    ? selectedItems.map((item, idx) => (
                                                          <SelectionTag
                                                              height={height}
                                                              key={item.value}
                                                              onClick={() =>
                                                                  this.removeItem(item, selectedItems, selectItem)
                                                              }
                                                              onKeyDown={event => this.handleItemKeyDown(event, idx)}
                                                              innerRef={item =>
                                                                  this.setSelectedItemsRef(selectedItems, item, idx)
                                                              }
                                                          >
                                                              {this.renderSelectedItemTag(item)}
                                                          </SelectionTag>
                                                      ))
                                                    : [
                                                          <SelectionTag
                                                              height={height}
                                                              key={selectedItems[0].value}
                                                              onClick={() =>
                                                                  this.removeItem(
                                                                      selectedItems[0],
                                                                      selectedItems,
                                                                      selectItem
                                                                  )
                                                              }
                                                          >
                                                              {this.renderSelectedItemTag(selectedItems[0])}
                                                          </SelectionTag>,
                                                          selectedItems.length > 1 && (
                                                              <SelectionTag
                                                                  height={height}
                                                                  asButton={true}
                                                                  key="__overflow"
                                                                  onClick={() => this.input.focus()}
                                                                  innerRef={el => (this.expandButton = el)}
                                                              >
                                                                  <PlusIcon />
                                                                  <OverflowSelectionLabel>
                                                                      {selectedItems.length - 1}
                                                                  </OverflowSelectionLabel>
                                                              </SelectionTag>
                                                          )
                                                      ])}
                                            <InputSizer innerRef={el => (this.inputSizer = el)}>
                                                {inputValue}
                                            </InputSizer>
                                            <Input
                                                {...getInputProps({
                                                    onKeyDown: this.getInputKeydownHandler(selectedItems, selectItem),
                                                    placeholder: hasSelections ? undefined : placeholder
                                                })}
                                                innerRef={el => (this.input = el)}
                                                style={{
                                                    width: hasSelections ? `${this.state.inputWidth}px` : '100%'
                                                }}
                                            />
                                            <Icon isOpen={isMenuOpen} isFocused={isFocused} height={height}>
                                                <ArrowDown focusable="false" />
                                            </Icon>
                                        </InputWrapper>
                                        {isMenuOpen && (
                                            <Menu width={width} maxMenuHeight={maxMenuHeight}>
                                                {filteredResults.map((option, idx) => (
                                                    <MenuItem
                                                        key={option.value}
                                                        isHighlighted={idx === highlightedIndex}
                                                    >
                                                        <MenuItemButton
                                                            {...getItemProps({
                                                                item: hasSelections
                                                                    ? selectedItems.concat(option)
                                                                    : [option]
                                                            })}
                                                            isActive={
                                                                hasSelections &&
                                                                selectedItems.some(item => item.value === option.value)
                                                            }
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
                }}
            </FocusWithin>
        )
    }

    focusInput = event => {
        if (this.input && this.inputWrapper && event.target === this.inputWrapper) {
            this.input.focus()
            event.preventDefault()
        }
    }

    getFilteredResults = (selectedItems, filterValue) =>
        this.props.filter === false
            ? this.props.options
            : typeof this.props.filter === 'function'
                ? this.props.options.filter((option, index, options) =>
                      this.props.filter({ index, inputValue, option, options, selectedItem })
                  )
                : this.props.options
                      .filter(option => option.label.toLowerCase().includes(filterValue.toLowerCase()))
                      .filter(
                          option =>
                              !selectedItems || !selectedItems.some(selectedItem => selectedItem.value === option.value)
                      )

    getInputKeydownHandler = (selectedItems, selectItemCb) => event => {
        // allow either deleting the last tag in selected items or focusing to it
        // when at the leftmost edge of the input
        if (
            selectedItems &&
            selectedItems.length &&
            event.target.selectionStart === 0 &&
            event.target.selectionEnd === 0
        ) {
            if (event.key === 'Backspace') {
                const lastItem = selectedItems[selectedItems.length - 1]
                this.removeItem(lastItem, selectedItems, selectItemCb)
            } else if (this.selectedItemsRef.items && event.key === 'ArrowLeft') {
                const lastItem = this.selectedItemsRef.items[this.selectedItemsRef.items.length - 1]
                lastItem.button.focus()
            }
        }
    }

    handleItemKeyDown = (event, idx) => {
        // allow tabbing through the selected items via arrow keys
        if (event.key === 'ArrowLeft' && idx > 0) {
            const previousItem = this.selectedItemsRef.items[idx - 1]
            previousItem.button.focus()
        } else if (event.key === 'ArrowRight') {
            if (idx < this.selectedItemsRef.items.length - 1) {
                const nextItem = this.selectedItemsRef.items[idx + 1]
                nextItem.button.focus()
            } else if (this.input) {
                this.input.focus()
            }
        }
    }

    renderSelectedItemTag = item => (this.props.renderSelectedItem ? this.props.renderSelectedItem(item) : item.label)

    removeItem = (itemToRemove, selectedItems, selectItemCb) => {
        selectItemCb(selectedItems.filter(item => item.value !== itemToRemove.value))
        this.input.focus()
    }

    resizeInput = (changes, state) => {
        // an invisible "sizer" element is used to figure out the width of the input
        // it has the same text as the input so it should be the same size
        if (changes.type === Downshift.stateChangeTypes.changeInput) {
            this.props.onInputChange && this.props.onInputChange(state.inputValue)
            this.inputSizer && this.setState({ inputWidth: this.inputSizer.scrollWidth + 4 })
        }
    }

    setSelectedItemsRef = (selectedItems, item, idx) => {
        // we use a key here to recreate the array of item refs after every render
        // we could technically also clear out the array in the render method
        // but it should be free of side effects
        if (selectedItems !== this.selectedItemsRef.key) {
            this.selectedItemsRef.key = selectedItems
            this.selectedItemsRef.items = []
        }
        this.selectedItemsRef.items[idx] = item
    }
}

MultiAutocomplete.defaultProps = {
    height: DEFAULT_HEIGHT,
    width: DEFAULT_WIDTH,
    maxMenuHeight: DEFAULT_MENU_HEIGHT
}

MultiAutocomplete.propTypes = {
    className: PropTypes.string,
    filter: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.func]),
    height: PropTypes.number,
    innerRef: PropTypes.func,
    maxMenuHeight: PropTypes.number,
    onSelect: PropTypes.func,
    options: optionsPropTypes.isRequired,
    placeholder: PropTypes.string,
    renderSelectedItem: PropTypes.func,
    width: PropTypes.number
}
