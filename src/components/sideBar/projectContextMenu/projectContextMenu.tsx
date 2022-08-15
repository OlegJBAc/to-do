import React from "react"
import styled, { css } from 'styled-components'


export const ProjectContextMenuStyles = styled.div<ContextMenuProps>` 
    border-radius: 4px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100px;
    height: 100px;
    padding: 2em;
    background-color: white;
    box-shadow: 0 0 8px gray;
    ${({ top, left }: ContextMenuProps) => css`
        top: ${top}px;
        left: ${left}px;
    `}
    button{
        word-break: initial;
        background: purple;
        color: white;
        font-size: 1rem;
    }
`;

export const ProjectContextMenuBody: React.FC<propsType> = React.memo(({ 
                                            projectName, 
                                            setProjectWasDelete}) => {
    return(
        <div>
            <button onClick={() => {
                setProjectWasDelete({ wasDelete: true, projectName: projectName })
            }}>
                <span>Delete</span>
            </button>
        </div>
    )
})


type propsType = {
    projectName: string
    setProjectWasDelete: ({ wasDelete, projectName }: { wasDelete: boolean, projectName: string }) => void
}
type ContextMenuProps = {
    top: number;
    left: number;
  };