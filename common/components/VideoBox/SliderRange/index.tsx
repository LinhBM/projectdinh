import { getTrackBackground, Range } from 'react-range'

interface Props {
  min?: number
  max?: number
  values: number[]
  onChange: (value: number[]) => void
  className?: string
  onMouseDown?: (e: any) => void
  onMouseUp?: (e: any) => void
  hiddenThumb?: boolean
  loadedTime?: number
}

const SliderRange = (props: Props) => {
  const {
    className,
    min = 0,
    max = 100,
    values,
    onMouseDown,
    onMouseUp,
    onChange,
    hiddenThumb,
    loadedTime,
  } = props
  // console.log('max', min, max)
  return (
    <div className={className}>
      <Range
        min={0}
        max={max}
        step={1}
        values={values}
        onChange={onChange}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={(e) => {
              props.onMouseDown(e)
              onMouseDown && onMouseDown(e)
            }}
            onTouchStart={(e) => {
              props.onTouchStart(e)
              onMouseDown && onMouseDown(e)
            }}
            onMouseUp={(e) => {
              onMouseUp && onMouseUp(e)
            }}
            onTouchEnd={(e) => {
              onMouseUp && onMouseUp(e)
            }}
            style={{
              ...props.style,
              height: '24px',
              display: 'flex',
              width: '100%',
            }}
          >
            <div
              ref={props.ref}
              className={'h-0.5 w-full rounded'}
              style={{
                background: getTrackBackground({
                  values: [...values, loadedTime].filter(Boolean) as any,
                  colors: ['#00CDB4', '#47474C', '#B0B0B8'],
                  min: min,
                  max: max,
                  // rtl,
                }),
                alignSelf: 'center',
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className={'flex h-3 w-3 items-center justify-center outline-none'}
          >
            <div
              id="thumb-range"
              className={
                'shrink-0 origin-center rounded-full bg-primary transition-all ' +
                (hiddenThumb ? 'h-0.5 w-0.5' : 'h-3 w-3')
              }
            ></div>
          </div>
        )}
      />
    </div>
  )
}

export default SliderRange
