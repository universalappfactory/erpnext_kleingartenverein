export enum NavigationMode {
    Router,
    External
}

export interface NavigationItem
{
    displayTitle: string
    href: string
    icon: string
    mode: NavigationMode
    openCount: number | undefined,
    read_marker_doctype: string | undefined
}

export interface ReadMarker
{
    doctype: string
    count: number
}