import { SquareEmptyIcon, SquareIcon } from '@public/icons'

interface Props {
  checked: boolean
  onChange?: (value: boolean) => void
}

const Checkbox = (props: Props) => {
  const { checked, onChange } = props
  return (
    <div
      onClick={() => {
        onChange && onChange(!checked)
      }}
    >
      {checked ? (
        <SquareIcon className="text-primary" />
      ) : (
        <SquareEmptyIcon className="text-neutral-500" />
      )}
    </div>
  )
}
export default Checkbox
