import { some } from '@common/constants'
import { AddListIcon } from '@public/icons'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import WatchLaterModal from '../WatchLaterModal/WatchLaterModal'

interface Props {
  data: some
}

const WatchLaterBox = (props: Props) => {
  const { data } = props
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className="flex  items-center gap-2"
        onClick={() => setOpen(true)}
      >
        <AddListIcon />
        <p className="caption1">
          <FormattedMessage id="add" />
        </p>
      </button>
      <WatchLaterModal
        data={data}
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      />
    </>
  )
}

export default WatchLaterBox
