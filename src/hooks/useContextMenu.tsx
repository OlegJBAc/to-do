import { useState } from "react"


const coordinatesDefault = { 
    projectName: null,
    top: 0, 
    left: 0, 
}
const paramsDefault = {
    height: `${100}px`,
    width: `${150}px`,
    background: 'white',
}

export const useContextMenu = ({ coordinatesCustom=coordinatesDefault, 
                                 paramsCustom=paramsDefault,
                                 sideBarIsVisible=false,
                                 isPageContent=false,
                                 htmlElem=null,
                                 contextElem='any'
                            }: useContextMenuType) => {

    const [coordinates, setCoordinates] = useState({
        projectName: coordinatesCustom.projectName,
        top: coordinatesCustom.top,
        left: coordinatesCustom.left,
    })
    const [menuParams, setMenuParams] = useState({
        height: paramsCustom.height,
        width: paramsCustom.width,
        background: paramsCustom.background,
    })
    const [localContextMenu, setLocalContextMenu] = useState(false)
    
    const returnNumberOfPixels = (value: string='100px') => {
        const getWhichContextElem = (contextElem: string) => {
            if(contextElem === 'any'){
                return 1.3
            }if(contextElem === 'setPriority'){
                return 0.05
            }else{
                return 1.4
            }
        }
        const result: string[] = []
        for( let i=0; i < value.length; i++ ){
            if(value[i] !== 'p'){
                result.push(value[i])
            }else{
                return Number(result.join('')) * getWhichContextElem(contextElem) 
            }
        }
        return Number(result.join('')) * getWhichContextElem(contextElem)
    }
    const getCoordintes = (e: any) => {
        let top: number = 0
        let left: number = 0
        if(htmlElem?.current){
            top = e.pageY - htmlElem.current.offsetTop + 20
            left = e.pageX - htmlElem.current.offsetLeft - returnNumberOfPixels(paramsCustom?.width)
        }else{
            top = e.pageY - 30
            left = e.pageX - 30
        }
        return { top, left }
    }

    const activateContextMenu = (projectName: string | null=null, e: any) => {
        e.preventDefault()
        setLocalContextMenu(localContextMenu ? false : true)
        setCoordinates({
            projectName: coordinatesCustom.projectName,
            top: getCoordintes(e).top,
            left: getCoordintes(e).left,
        })
    }
    return { coordinates, setCoordinates, menuParams, localContextMenu, setLocalContextMenu, activateContextMenu }
}


interface useContextMenuType {
    coordinatesCustom?: {
        projectName: string | null
        top: number
        left: number
    }
    paramsCustom?: {
        [key: string]: string
    }
    sideBarIsVisible?: boolean
    isPageContent?: boolean
    htmlElem?: React.RefObject<HTMLDivElement> | null
    contextElem?: 'any' | 'setPriority' | 'actions'
}