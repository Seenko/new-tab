export const preloadImageURL = (url: string): void => {
  const image = new Image()
  image.onload = () => image.remove()
  image.src = url
}