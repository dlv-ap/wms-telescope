import Tooltip from './Tooltip'

interface InfoIconProps {
  tooltip: string
}

export default function InfoIcon({ tooltip }: InfoIconProps) {
  return (
    <Tooltip content={tooltip}>
      <span className="material-icons-outlined text-[12px] text-status-info pt-[3px] cursor-help">
        info
      </span>
    </Tooltip>
  )
}