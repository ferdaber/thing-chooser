import styled, { css } from 'styled-components'

import {
    bluePrimary,
    bluePrimaryLight,
    iconColorActive,
    iconColor,
    white,
    grayText
} from '@widen/patterns-style/lib/colors'
import { boxShadowStandard, border, zindexGreatest, borderRadiusSmall } from '@widen/patterns-style/lib/vars'

export const DEFAULT_HEIGHT = 32
export const DEFAULT_WIDTH = 320
export const DEFAULT_MENU_HEIGHT = 280

export const CommonContainer = styled.div`
    min-width: 160px;
    position: relative;
    width: ${props => props.width || DEFAULT_WIDTH}px;
`

export const bodyMixin = css`
    border-radius: 1px;
    border: ${border};
    box-sizing: border-box;
    height: ${props => props.height || DEFAULT_HEIGHT}px;
    line-height: ${props => props.height || DEFAULT_HEIGHT}px;
    padding-left: 8px;
    padding-right: 32px;
    width: 100%;
    background: none;
    color: ${grayText};
`

export const CommonIcon = styled.span`
    color: ${props => (props.isFocused ? iconColorActive : iconColor)};
    display: flex;
    fill: ${props => (props.isFocused ? iconColorActive : iconColor)};
    height: ${props => (props.height || DEFAULT_HEIGHT) - 2}px;
    position: absolute;
    right: 1px;
    top: 1px;
    transform-origin: center;
    transform: ${props => (props.isOpen ? 'rotate(0.5turn)' : 'none')};
    transition: all 150ms linear;
    width: 32px;

    svg {
        margin: auto;
    }
`

export const Menu = styled.ul`
    background: ${white};
    border-radius: ${borderRadiusSmall};
    border: ${border};
    box-shadow: ${boxShadowStandard};
    box-sizing: border-box;
    left: 0;
    list-style-type: none;
    margin: 0;
    max-height: ${props => props.maxMenuHeight || DEFAULT_MENU_HEIGHT}px;
    min-width: ${props => props.width || DEFAULT_WIDTH}px;
    overflow-y: auto;
    padding: 8px 0;
    position: absolute;
    top: 100%;
    z-index: ${zindexGreatest};
`

export const MenuItem = styled.li`
    background: ${props => (props.isHighlighted ? bluePrimaryLight : 'none')};
    box-sizing: border-box;
    padding: 0 24px;
    width: 100%;
`

export const MenuItemButton = styled.button.attrs({
    tabIndex: -1
})`
    color: ${props => (props.isActive ? bluePrimary : 'inherit')};
    line-height: 32px;
    padding: 0;
    text-align: left;
    width: 100%;

    &:active {
        color: ${bluePrimary};
    }
`
