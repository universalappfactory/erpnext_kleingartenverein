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
}