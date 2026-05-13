/**
 * InfoIcon - Uses TDS Tooltip pattern
 * Since TDS types have React version mismatch, we use the component via createElement
 */
import React from 'react'
import * as Tarmac from '@delhivery/tarmac'

interface InfoIconProps {
  tooltip: string
}

const TDSTooltip = Tarmac.Tooltip as unknown as React.FC<{
  content: string
  variant?: string
  placement?: string
  size?: string
  maxWidth?: number
  children?: React.ReactNode
}>

export default function InfoIcon({ tooltip }: InfoIconProps) {
  return (
    <TDSTooltip
      content={tooltip}
      variant="black"
      placement="top"
      size="sm"
      maxWidth={200}
    >
      <span className="material-icons-outlined text-[12px] text-[#1d7dd1] pt-[3px] cursor-help">
        info
      </span>
    </TDSTooltip>
  )
}