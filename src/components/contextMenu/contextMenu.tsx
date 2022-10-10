import React from "react"
import styled, { css } from 'styled-components'
import { useAppSelector } from "../../hooks/hooks";
import { getAppTheme } from "../../redux/selectors";
import s from './contextMenu.module.scss'
import cnBind from 'classnames/bind'


export const ContextMenuStyles = styled.div<ContextMenuProps>` 
    border-radius: 4px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    box-shadow: 0 0 10px rgb(198, 196, 196);
    z-index: 100;
    border: 1px solid rgb(205, 197, 197);
    ${({ top, left, menuParams }: ContextMenuProps) => css`
        top: ${top + 10}px;
        left: ${left}px;
        @media screen and (max-width: 768px){
            top: ${top + menuParams.top}px ;
            left: ${left + menuParams.left}px ;
        }
    `}

    button{
        word-break: initial;
        background: purple;
        color: white;
        font-size: 1rem;
    }
`;

export const ContextMenuBody: React.FC<propsType> = React.memo(({ ...props }) => {
    const appTheme = useAppSelector(getAppTheme) 
    const cx = cnBind.bind(s)

    return (
        <div className={cx('context__menu', {
            light: appTheme === 'Light',
            dark: appTheme === 'Dark',
        })}>
            {props.bodyComponent}
        </div>
    )
})


type propsType = {
    bodyComponent: React.ReactElement<any, any>
}
type ContextMenuProps = {
    top: number;
    left: number;
    menuParams: {
        [key: string]: number
    }
};