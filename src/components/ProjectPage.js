import Image from '@/components/Image'
import CustomPortableText from './CustomPortableText'

export default function ProjectPage({ data = {} }) {
  const { title, content, date, category, skills, contribution, timeline, mainImage, gallery } = data || {}

  return (
    <section className='project f-h c'>
      <div className='project__info f-v'>
        <h1 className='project__title t-h-1'>{title}</h1>
        <div className='project__info__details t-b-1 t-italic mobile-up-only'>
          {skills && <p>SKILLS: {skills}</p>}
          {contribution && <p>CONTRIBUTION: {contribution}</p>}
          {timeline && <p>TIMELINE: {timeline}</p>}
          {date && <p>{date}</p>}
          {category && <p className=''>{category}</p>}
        </div>
        {content && (
          <div className='project__content wysiwyg-page mobile-up-only'>
            <CustomPortableText blocks={content} />
          </div>
        )}
      </div>
      <div className='project__gallery f-v'>
        {mainImage && <Image image={mainImage} className={'project__gallery__image'} />}
        <div className='project__info__details t-b-1 t-italic mobile-down-only'>
          {date && <div className=''>{date}</div>}
          {category && <div className=''>{category}</div>}
        </div>
        {content && (
          <div className='project__content wysiwyg-page mobile-down-only'>
            <CustomPortableText blocks={content} />
          </div>
        )}
        {gallery?.map((row, i) => (
          <>
            {row?.heading && <div className='project__gallery__heading t-h-2 t-uppercase'>{row.heading}</div>}
            <div className='project__gallery__row f-h'>
              {row?.images.map((image, j) => (
                <Image image={image} className={'project__gallery__row__image'} />
              ))}
            </div>
          </>
        ))}
      </div>
    </section>
  )
}
