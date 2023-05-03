import React, { useEffect, useRef } from 'react'
import ColorThief from 'colorthief'
// import { usePlayer } from '../contexts/PlayerContext'

const GradientBackground = ({ imageUrl }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const colorThief = new ColorThief()
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const image = new Image()
    image.src = imageUrl
    image.crossOrigin = 'anonymous'

    image.onload = () => {
      const gradient = context.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      )

      const [r, g, b] = colorThief.getColor(image)
      const rgbaColor = `rgba(${r}, ${g}, ${b}, 0.8)`
      gradient.addColorStop(0, rgbaColor)
      gradient.addColorStop(1, 'rgba(0,0,0,0)')

      context.fillStyle = gradient
      context.fillRect(0, 0, canvas.width, canvas.height)

      setCurrentSong((prevState) => ({
        ...prevState,
        background: canvas.toDataURL('image/png'),
      }))
    }
  }, [imageUrl, setCurrentSong])

  return (
    <canvas
      className='absolute top-0 left-0 w-full h-full'
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  )
}

export default GradientBackground
