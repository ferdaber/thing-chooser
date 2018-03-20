import styled, { css } from 'styled-components'

export const Root = styled.div`
    position: relative;
    width: 320px;
`

export const baseButtonMixin = css`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
`

export const ValueWrapper = styled.div`
    width: 100%;
    padding-left: 8px;
    padding-right: 32px;
    height: 32px;
    box-sizing: border-box;
    border-radius: 1px;
    border: 1px solid #b6c1ce;
    line-height: 32px;
`

export const MenuIcon = styled.span`
    position: absolute;
    top: 0;
    right: 0;
    height: 32px;
    width: 32px;
    transition: all 150ms linear;
    transform: ${props => (props.isOpen ? 'rotate(0.5turn)' : 'none')};
    transform-origin: center;
    display: flex;

    svg {
        margin: auto;
    }

    ${ValueWrapper}:focus + & {
        color: #0063cc;
        fill: #0063cc;
    }
`

export const Menu = styled.ul`
    background: #fff;
    padding: 8px 0;
    list-style-type: none;
    min-width: 320px;
    position: absolute;
    top: 100%;
    left: 0;
    border: 1px solid #b6c1ce;
    border-radius: 2px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.117647),
        0 1px 4px rgba(0, 0, 0, 0.117647);
    margin: 0;
    box-sizing: border-box;
    max-height: 280px;
    overflow-y: auto;
    z-index: 1;
`

export const MenuItem = styled.li`
    padding: 0 24px;
    width: 100%;
    box-sizing: border-box;
    background: ${props => (props.highlighted ? '#ebf4ff' : 'none')};
`

export const MenuItemButton = styled.button`
    ${baseButtonMixin} width: 100%;
    line-height: 32px;
    text-align: left;
    color: ${props => (props.active ? '#0076f5' : 'inherit')};

    &:active {
        color: #0076f5;
    }
`
