import Image from './Image'
import CustomLink from './CustomLink'

export default function WorkGallery({ data = {}, path = '' }) {
  // Extract module data
  return (
    <div className='work-index__gallery'>
      {data.map((project, i) => (
        <div key={i} className='work-index__gallery__item f-h'>
          <div className='work-index__gallery__item__image bg-subtle child-cover'>
            {project?.thumbnail && <Image image={project.thumbnail} />}
          </div>
          <div className='work-index__gallery__item__info f-v mobile-up-only'>
            {project?.title && <div className='work-index__gallery__item__title t-h-1'>{project.title}</div>}
            {project?.category && (
              <ul className='t-h-4'>
                {project.category.split('\n').map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )}
          </div>
          <CustomLink link={{ route: `/${path}/${project.slug}` }} className={'p-fill'}></CustomLink>
        </div>
      ))}
    </div>
  )
}
