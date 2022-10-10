export const getTimePlay = (time: string) => {
  let totalSeconds = Number(time)
  let hours = Math.floor(totalSeconds / 3600) + ''
  totalSeconds %= 3600
  let minutes = Math.floor(totalSeconds / 60) + ''
  let seconds = (totalSeconds % 60) + ''
  if (hours != '0') {
    return (
      (hours.length == 1 ? '0' + hours : hours) +
      ':' +
      (minutes.length == 1 ? '0' + minutes : minutes) +
      ':' +
      (seconds.length == 1 ? '0' + seconds : seconds)
    )
  } else {
    if (minutes) {
      return (
        (minutes.length == 1 ? '0' + minutes : minutes) +
        ':' +
        (seconds.length == 1 ? '0' + seconds : seconds)
      )
    } else {
      return seconds.length == 1 ? '0' + seconds : seconds
    }
  }
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
