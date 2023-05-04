import { useState, useRef, useEffect } from 'react'

const useImageColor = (url) => {
  const [color, setColor] = useState({ r: 0, g: 0, b: 0 })

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = url

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height

      if (img.complete && img.naturalWidth !== 0) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        let r = 0,
          g = 0,
          b = 0

        for (let i = 0; i < data.length; i += 4) {
          r += data[i]
          g += data[i + 1]
          b += data[i + 2]
        }

        r = Math.floor(r / (data.length / 4))
        g = Math.floor(g / (data.length / 4))
        b = Math.floor(b / (data.length / 4))

        setColor({ r, g, b })
      }
    }
  }, [url])

  return { color, canvasRef }
}

export default useImageColor
