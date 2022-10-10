import { some } from '@common/constants'
import { ReportIcon } from '@public/icons'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

interface Props {
  data: some
}

const ReportBox = (props: Props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  console.log('first')
  return (
    <>
      <button
        className="flex  items-center gap-2"
        onClick={() => setOpen(true)}
      >
        <ReportIcon />
        <p className="caption1">
          <FormattedMessage id="report" />
        </p>
      </button>
    </>
  )
}

export default ReportBox
