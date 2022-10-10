import { some } from '@common/constants'
import Checkbox from '../Checkbox'
import { useState } from 'react'
interface Props {
  item: some
  checked: boolean
  saveToPlaylist(item, status): void
}
const PlaylistItem = (props: Props) => {
  const { item, checked, saveToPlaylist } = props
  return (
    <div
      className="flex items-center gap-2 p-3"
      key={item.id}
      onClick={() => {
        console.log(item, 'item')

        saveToPlaylist(item, !checked)
      }}
    >
      <Checkbox checked={checked} />
      <p>{item.name}</p>
    </div>
  )
}
export default PlaylistItem
