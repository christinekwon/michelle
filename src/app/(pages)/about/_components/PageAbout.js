'use client'
import React from 'react'
import Image from '@/components/Image'
import CustomPortableText from '@/components/CustomPortableText'

export default function PageAbout({ data }) {
  const { title, content, image } = data || {}

  return (
    <section className='about c f-v'>
      <h1 className='about__title t-h-1'>{title}</h1>
      <div className='about__content f-h f-j-c'>
        {image && <Image image={image} className={'about__content__image'} />}
        {content && (
          <div className='about__content__text wysiwyg'>
            <CustomPortableText blocks={content} />
          </div>
        )}
      </div>
    </section>
  )
}
