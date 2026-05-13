import { Tooltip } from '@delhivery/tarmac'

interface InfoIconProps {
  tooltip: string
}

export default function InfoIcon({ tooltip }: InfoIconProps) {
  return (
    <Tooltip
      content={tooltip}
      variant="black"
      placement="top"
      size="sm"
      maxWidth={200}
    >
      <span className="inline-flex items-center material-icons-outlined text-[12px] text-[#1d7dd1] cursor-help align-middle">
        info
      </span>
    </Tooltip>
  )
}