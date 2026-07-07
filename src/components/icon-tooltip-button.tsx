import type { ReactNode } from 'react'
import { Button, type buttonVariants } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { VariantProps } from 'class-variance-authority'

interface IconTooltipButtonProps {
  label: string
  icon: ReactNode
  onClick?: () => void
  className?: string
  size?: VariantProps<typeof buttonVariants>['size']
  variant?: VariantProps<typeof buttonVariants>['variant']
}

export function IconTooltipButton({
  label,
  icon,
  onClick,
  className,
  size = 'icon-sm',
  variant = 'ghost',
}: IconTooltipButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size={size}
          variant={variant}
          className={className}
          onClick={onClick}
          aria-label={label}
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}
