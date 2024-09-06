'use client'

import React, { useEffect, useRef, useState } from 'react'
import HeadTrackingCode from '@/layout/HeadTrackingCode'
import { usePathname } from 'next/navigation'
import { siteSetup, useVsObject } from '@/hooks/useVsSetup'
import AdaSkip from './AdaSkip'
import Footer from './Footer'
import Header from './Header'
import Main from './Main'

export default function Layout({ children, siteData }) {
  const { announcement, header, footer } = siteData || {}
  const pathname = usePathname()
  // const { isMobileScreen } = useVsObject();

  useEffect(() => {
    siteSetup()
  }, [])

  if (pathname.startsWith('/sanity')) {
    return children
  }

  return (
    <>
      <AdaSkip />
      <Header data={header} />
      <Main>{children}</Main>
      {/* <Footer siteData={siteData} data={footer} /> */}
    </>
  )
}
