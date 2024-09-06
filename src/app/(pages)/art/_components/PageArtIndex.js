'use client'
import WorkGallery from '@/components/WorkGallery'
import { useEffect } from 'react'
import { Suspense } from 'react'

export default function PageArtIndex({ data }) {
  const { title, paginationMethod } = data || {}

  return (
    <div className='work-index c f-v'>
      <section className='work-index__heading'>
        <h1 className='t-h-1'>Art</h1>
      </section>
      <WorkGallery data={data} path='art' />
    </div>
  )
}