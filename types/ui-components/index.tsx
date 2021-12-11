export interface PaneWindowCoordinates {
  key?: string | undefined
  link: string
  title: string
  nw: [number, number] // [row, column]
  se: [number, number] // [row, column]
}

export interface PaneWindowsTab {
  tabTitle: string
  tabContent: PaneWindowCoordinates[]
} 