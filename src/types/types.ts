export interface taskType {
    id: string
    name: string
    description: string
    priority: taskPriorityType
    addedAt: string
    currentProject: string
}
export type taskPriorityType = 'red' | 'orange' | 'purple' | 'none'
export interface projectsType {
    [key: string]: taskType[]
}
export interface defaultProjectsType {
    today: taskType[]
}