import { RadioChecked, RadioEmpty } from '@public/icons'

interface Props {
  checked: boolean
  onChange?: (value: boolean) => void
}

const Radio = (props: Props) => {
  const { checked, onChange } = props
  return (
    <div
      onClick={() => {
        onChange && onChange(!checked)
      }}
    >
      {checked ? (
        <RadioChecked className="text-primary" />
      ) : (
        <RadioEmpty className="text-neutral-500" />
      )}
    </div>
  )
}
export default Radio
