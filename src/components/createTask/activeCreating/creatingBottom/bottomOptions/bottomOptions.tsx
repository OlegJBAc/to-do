import React from "react"
import s from './bottomOptions.module.scss'
import { ReactComponent as PriorityIcon } from '../../../../../general/svgs/priorityIcon.svg'
import { useContextMenu } from "../../../../../hooks/useContextMenu"
import { ContextMenuBody, ContextMenuStyles } from "../../../../contextMenu/contextMenu"
import SetPriority from "../../../../taskPage/tasksPageCreator/page/task/actions/contextMenu/setPriority/setPriority"
import { taskType } from "../../../../../types/types"
import { useOutletContext } from "react-router-dom"

const BottomOptions: React.FC<propsType> = ({ setPriorityForCreating, task, project, pageElem }) => {
    const { sideBarIsVisible } = useOutletContext<{ sideBarIsVisible: boolean }>()

    const { coordinates, 
        menuParams,
        localContextMenu,
        setLocalContextMenu,
        activateContextMenu,
    } = useContextMenu({ sideBarIsVisible, isPageContent: true, htmlElem: pageElem, contextElem: 'setPriority' })

    const click = (e: any) => {
        e.preventDefault()
        activateContextMenu(null, e)
    }
    return (
        <div className={s.create__options}>
                <button id={s.create__options_btn} onClick={click}>
                    <PriorityIcon className={s.priority__icon}/>
                </button>
                {localContextMenu && 
                    <ContextMenuStyles className={s.projects__delete} top={coordinates.top}
                        // @ts-ignore
                        left={coordinates.left} menuParams={{...menuParams, top: 15, left: 150}}>
                        <ContextMenuBody bodyComponent={
                            <SetPriority projectName={project} 
                                         task={task}
                                         isCreating={true}
                                         setPriorityForCreating={setPriorityForCreating}
                                         setLocalContextMenu={setLocalContextMenu}
                                    />
                                }/>
                    </ContextMenuStyles>
                }
            </div>
    )
}

export default BottomOptions


interface propsType {
    setPriorityForCreating: (priorityForCreating: string) => void
    task: taskType
    project: string
    pageElem: React.RefObject<HTMLDivElement>
}