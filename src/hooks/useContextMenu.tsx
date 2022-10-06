import { useState } from "react"

const coordinatesDefault = { 
    projectName: null,
    top: 0, 
    left: 0, }
const paramsDefault = {
    height: `${100}px`,
    width: `${150}px`,
    background: 'white',
}

export const useContextMenu = ({ coordinatesCustom=coordinatesDefault, 
                                 paramsCustom=paramsDefault,
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
    
    const activateContextMenu = (projectName: string | null= null, e: any) => {
        console.log(e)
        e.preventDefault()
        setLocalContextMenu(localContextMenu ? false : true)
        setCoordinates({
            projectName: coordinatesCustom.projectName,
            top: e.pageY,
            left: e.pageX
        })
    }
    return { coordinates, menuParams, localContextMenu, setLocalContextMenu, activateContextMenu }
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
}