export const copyToClipboard = (text: string) => {
  const textArea = document.createElement('textarea')
  textArea.value = text

  // Avoid scrolling to bottom
  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.position = 'fixed'

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    var successful = document.execCommand('copy')
    return successful
  } catch (err) {
    return false
  } finally {
    document.body.removeChild(textArea)
  }
}

export const formatTimeVideo = (time?: number) => {
  if (!time) {
    return '00:00'
  }
  let hour = Math.floor(time / (60 * 60))
  let min = Math.floor((time - hour * 60 * 60) / 60)
  let sec = Math.floor(time - min * 60 - hour * 60 * 60)
  let string = ''
  if (hour) {
    string += hour.toString()
    string += ':'
  }
  if (min >= 10) {
    string += min.toString()
    string += ':'
  } else {
    string += `0${min}`
    string += ':'
  }
  if (sec >= 10) {
    string += sec.toString()
  } else {
    string += `0${sec}`
  }
  return string
}

export function formatView(view: number) {
  if (view < 1000) return `${view} `

  if (view > 1000000000) {
    return `${Math.floor(view / 1000000000)}B `
  }

  if (view > 1000000) {
    return `${Math.floor(view / 1000000)}M `
  }

  if (view > 1000) {
    return `${Math.floor(view / 1000)}K `
  }
}
