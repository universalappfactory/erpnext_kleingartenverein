export interface TableRow {

}

export enum ColumnMode {
    Default,
    DoubleEntry
}

export interface TableColumn {
    DisplayTitle: string
    PropertyNames: string[]
    Mode: ColumnMode
}