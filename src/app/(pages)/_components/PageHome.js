'use client'
import { useEffect } from 'react'
import Image from '@/components/Image'
export default function PageHome({ data }) {
  const { titleEnglish, titleKorean, titleImage, mainImage } = data || {}

  useEffect(() => {
    console.log(data)
  }, [])

  return (
    <div className='home'>
      <div className='home__content c f-h f-a-e'>
        {titleImage && <Image image={titleImage} className={'home__title-image'} />}
        <div className='home__content__right f-v f-a-e'>
          {titleKorean && (
            <div class='home__korean f-h f-j-e'>
              {titleKorean.split('\n').map((word, i) => (
                <div class='home__korean__word'>{word}</div>
              ))}
            </div>
          )}
          {mainImage && <Image image={mainImage} className={'home__main-image'} />}
        </div>
      </div>

      {/* {titleEnglish && (
        <div class='home__title'>
          {titleEnglish.split('\n').map((val, i) => (
            <span>{val}</span>
          ))}
        </div>
      )} */}
    </div>
  )
}
