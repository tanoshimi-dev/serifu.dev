import { Fragment, useEffect, useState } from 'react'
import fallbackImage from "../public/images/no_image_square.jpg";
import Image from 'next/image'


const ImageWithFallback = ({
  fallback = fallbackImage,
  // @ts-ignore
  alt,
  // @ts-ignore
  src,
  ...props
}) => {
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null)
  }, [src])

  return (
    <Image
      alt={alt}
      className="max-w-36 max-h-36 object-contain object-cover object-center"
      // @ts-ignore
      onError={setError}
      src={error ? fallbackImage : src}
      {...props}
    />
  )
}

export default ImageWithFallback;
