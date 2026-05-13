// Fix React type mismatch between @delhivery/tarmac and our project
// TDS was built with a different @types/react version
declare module '@delhivery/tarmac' {
  import React from 'react'
  
  export const ThemeProvider: React.FC<{ children?: React.ReactNode }>
  export const useTheme: () => { theme: any }
  
  export const TabGroup: React.FC<{
    orientation?: string
    size?: string
    tabType?: string
    showDivider?: boolean
    className?: string
    children?: React.ReactNode
  }>
  
  export const TabCell: React.FC<{
    tabType?: string
    orientation?: string
    tabStyle?: string
    size?: string
    isPressed?: boolean
    isSelected?: boolean
    isDisabled?: boolean
    title?: string
    subtext?: string
    badge?: React.ReactNode
    pill?: React.ReactNode
    leadingIcon?: React.ReactNode
    trailingIcon?: React.ReactNode
    onClick?: (e: any) => void
    className?: string
    children?: React.ReactNode
  }>
  
  export const Badge: React.FC<{
    variant?: 'black' | 'white' | 'coal' | 'dlv_red' | 'info' | 'success' | 'warning' | 'error' | 'cardbox' | string
    size?: 'sm' | 'md' | 'lg'
    badgeType?: 'solid' | 'subtle' | 'outlined'
    text?: string
    leadingIcon?: React.ReactNode
    trailingIcon?: React.ReactNode
    showStatus?: boolean
    isDisabled?: boolean
    className?: string
    children?: React.ReactNode
  }>
  
  export const Button: React.FC<{
    variant?: string
    size?: 'sm' | 'md' | 'lg'
    buttonStyle?: 'primary' | 'secondary' | 'tertiary'
    buttonType?: 'button' | 'iconButton'
    isLoading?: boolean
    disabled?: boolean
    leadingIcon?: React.ReactNode
    trailingIcon?: React.ReactNode
    className?: string
    onClick?: (e: any) => void
    children?: React.ReactNode
    text?: string
    borderColor?: string
    textColor?: string
    backgroundColor?: string
    hoverColor?: string
  }>
  
  export const Input: React.FC<{
    inputStyle?: string
    inputType?: string
    inputSize?: string
    styleVariant?: string
    size?: string
    variant?: string
    label?: React.ReactNode
    placeholder?: string
    value?: string
    onChange?: (e: any) => void
    leadingIcon?: React.ReactNode
    trailingIcon?: React.ReactNode
    isDisabled?: boolean
    className?: string
    [key: string]: any
  }>
  
  export const Divider: React.FC<{
    type?: string
    size?: string
    className?: string
  }>
  
  export const Tooltip: React.FC<{
    content: React.ReactNode
    variant?: string
    placement?: string
    size?: string
    maxWidth?: number
    trigger?: string
    children?: React.ReactNode
    className?: string
    [key: string]: any
  }>
  
  export const Pagination: React.FC<{
    paginationStyle?: string
    cellStyle?: string
    tarmacSize?: string
    current?: number
    total?: number
    pageSize?: number
    onChange?: (page?: number, pageSize?: number) => void
    showTotal?: (total: number, range: [number, number]) => React.ReactNode
    showTextLeft?: boolean
    showNumberCells?: boolean
    showTextRight?: boolean
    className?: string
    [key: string]: any
  }>

  export const Table: React.FC<{
    columns?: any[]
    dataSource?: any[]
    rowKey?: string | ((record: any, index?: number) => string)
    size?: string
    bordered?: boolean
    hoverable?: boolean
    striped?: boolean
    pagination?: any
    scroll?: any
    className?: string
    onChange?: (pagination: any, filters: any, sorter: any, extra: any) => void
    [key: string]: any
  }>

  export const SideNavigation: React.FC<any> & {
    Cell: React.FC<any>
    TabCell: React.FC<any>
    Divider: React.FC<any>
    Slot: React.FC<any>
    Group: React.FC<any>
  }

  export const ProgressBar: React.FC<{
    value?: number
    variant?: string
    size?: string
    className?: string
    [key: string]: any
  }>
}