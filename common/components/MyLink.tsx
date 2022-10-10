import Link, { LinkProps } from 'next/link'
import React, { HTMLAttributeAnchorTarget } from 'react'
interface Props extends LinkProps {
  className?: string
  children?: React.ReactNode
  rel?: string | undefined
  target?: HTMLAttributeAnchorTarget | undefined
  title?: string
}
export default function MyLink(props: Props) {
  const { children, target, rel, title, className = '', ...rest } = props
  return (
    <Link passHref {...rest}>
      <a
        className={className}
        target={target}
        rel={rel}
        title={title}
        aria-label={rest['aria-label']}
      >
        {children}
      </a>
    </Link>
  )
}
