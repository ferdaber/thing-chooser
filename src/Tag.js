import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { withFocusWithin } from 'react-focus-within'
import Times from 'react-icons/lib/md/close'
import { borderColor, bluePrimary, grayBackgroundLighter, iconColorActive } from '@widen/patterns-style/lib/colors'
import { fontSizeSmall, borderRadiusSmall } from '@widen/patterns-style/lib/vars'

export const tagMixin = css`
    background: ${grayBackgroundLighter};
    border-radius: ${borderRadiusSmall};
    border: 1px solid ${borderColor};
    box-sizing: border-box;
    font-size: ${fontSizeSmall};
    height: ${props => props.height || 24}px;
    line-height: 1;
    padding: 4px 8px;
    position: relative;
    transition: border 150ms linear;
    white-space: pre;
`

export const Button = styled.button`
    ${tagMixin} &:hover,
    &:focus,
    &:active {
        border: 1px solid ${bluePrimary};
        outline: none;
    }
`

export const Wrapper = withFocusWithin(styled.span`
    ${tagMixin} 
    align-items: center;
    ${props => (props.hasButton ? 'padding-right: 20px;' : '')}
    border: 1px solid ${props => (props.isFocused ? bluePrimary : borderColor)};
    display: inline-flex;
    vertical-align: center;
`)

export const CloseButton = styled.button`
    display: flex;
    height: 100%;
    position: absolute;
    right: 4px;
    top: 0;
    transform-origin: center;
    transition: all 150ms linear;
    width: 16px;

    svg {
        margin: auto;
    }

    &:focus,
    &:active,
    &:hover {
        color: ${iconColorActive};
        fill: ${iconColorActive};
        outline: none;
        transform: scale(1.1, 1.1);
    }
`

export class Tag extends React.Component {
    render() {
        const { asButton, children, height, ...buttonProps } = this.props
        const hasCloseButton = !!buttonProps.onClick
        return asButton ? (
            <Button {...buttonProps} height={height} innerRef={el => (this.button = el)}>
                {children}
            </Button>
        ) : (
            <Wrapper hasButton={hasCloseButton} height={height}>
                {children}
                {hasCloseButton && (
                    <CloseButton {...buttonProps} innerRef={el => (this.button = el)}>
                        <Times focusable="false" />
                    </CloseButton>
                )}
            </Wrapper>
        )
    }
}

Tag.defaultProps = {
    height: 24
}

Tag.propTypes = {
    asButton: PropTypes.bool,
    height: PropTypes.number
}

export default Tag
