import React from "react";
import Downshift from "downshift";
import styled from "styled-components";
import ChevronDown from "react-icons/fa/chevron-down";
import Times from "react-icons/md/close";

import { FocusManager } from "./FocusManager";

import {
  baseButtonMixin,
  ValueWrapper,
  Menu,
  MenuIcon,
  MenuItem,
  MenuItemButton
} from "./Common";

const Root = styled.div`
  position: relative;
  width: 320px;
`;

const MultiAutocompleteValueWrapper = ValueWrapper.extend`
  display: block;
  transition: all 150ms linear;
  height: auto;
  min-height: 32px;
  overflow: visible;
  border-color: ${props => (props.isFocused ? "#0063cc" : "#b6c1ce")};

  ${MenuIcon} {
    color: ${props => (props.isFocused ? "#0063cc" : "initial")};
    fill: ${props => (props.isFocused ? "#0063cc" : "initial")};
  }
`;

const Tag = styled.span`
  background: #f6f7f9;
  border: 1px solid #dae0e7;
  box-sizing: border-box;
  border-radius: 2px;
  padding: 4px 16px 4px 4px;
  position: relative;
  font-size: 0.8rem;
  height: 24px;
  line-height: 14px;
  // margin-right: 8px;
`;

const TagCloseButton = styled.button`
  ${baseButtonMixin} position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 16px;
  display: flex;
  transition: all 150ms linear;

  svg {
    margin: auto;
  }

  &:focus,
  &:active,
  &:hover {
    outline: none;
    color: #0063cc;
    fill: #0063cc;
    transform: scale(1.1, 1.1);
  }
`;

const Input = styled.input`
  border: none;
  background: none;

  &:focus {
    outline: none;
  }
`;

export class MultiAutocomplete extends React.Component {
  getRemoveItemHandler = (
    { selectItem, selectedItem: selectedItems },
    itemToRemove
  ) => () =>
    selectItem(selectedItems.filter(item => item.value !== itemToRemove.value));

  getBackspaceHandler = renderProps => event => {
    const selectedItems = renderProps.selectedItem;
    if (
      selectedItems &&
      selectedItems.length &&
      event.key === "Backspace" &&
      event.target.selectionStart === 0 &&
      event.target.selectionEnd === 0
    ) {
      this.getRemoveItemHandler(
        renderProps,
        selectedItems[selectedItems.length - 1]
      )();
    }
  };

  render() {
    const { options, onSelect, placeholder } = this.props;
    return (
      <FocusManager>
        {({ isFocused, focusProps }) => (
          <Downshift onSelect={onSelect} itemToString={_ => ""}>
            {renderProps => {
              const {
                getRootProps,
                getInputProps,
                getItemProps,
                isOpen,
                inputValue,
                selectedItem: selectedItems,
                highlightedIndex
              } = renderProps;
              const filteredResults = options.filter(option =>
                option.label.toLowerCase().includes(inputValue.toLowerCase())
              );
              const isMenuOpen = !!(isOpen && filteredResults.length);
              return (
                <Root {...getRootProps({ refKey: "innerRef" })}>
                  <MultiAutocompleteValueWrapper isFocused={isFocused}>
                    {selectedItems &&
                      selectedItems.map(item => (
                        <span key={item.value}>
                          <Tag>
                            {item.label}
                            <TagCloseButton
                              onClick={this.getRemoveItemHandler(
                                renderProps,
                                item
                              )}
                            >
                              <Times />
                            </TagCloseButton>
                          </Tag>{" "}
                        </span>
                      ))}
                    <Input
                      {...getInputProps({
                        ...focusProps,
                        onKeyDown: this.getBackspaceHandler(renderProps),
                        placeholder:
                          selectedItems && selectedItems.length
                            ? undefined
                            : placeholder
                      })}
                    />
                    <MenuIcon isOpen={isMenuOpen}>
                      <ChevronDown />
                    </MenuIcon>
                  </MultiAutocompleteValueWrapper>
                  {isMenuOpen && (
                    <Menu>
                      {filteredResults.map((option, idx) => (
                        <MenuItem
                          key={option.value}
                          highlighted={idx === highlightedIndex}
                        >
                          <MenuItemButton
                            {...getItemProps({
                              item: selectedItems
                                ? selectedItems.concat(option)
                                : [option]
                            })}
                            active={
                              selectedItems &&
                              selectedItems.some(
                                item => item.value === option.value
                              )
                            }
                          >
                            {option.label}
                          </MenuItemButton>
                        </MenuItem>
                      ))}
                    </Menu>
                  )}
                </Root>
              );
            }}
          </Downshift>
        )}
      </FocusManager>
    );
  }
}
