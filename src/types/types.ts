export interface taskType {
    id: string
    name: string
    description: string
    priority: string
    addedAt: string
}
export interface projectsType {
    [key: string]: taskType[]
}
export interface defaultProjectsType {
    today: taskType[]
}