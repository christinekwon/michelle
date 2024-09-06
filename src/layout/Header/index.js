import React, { useEffect, useRef, useState } from 'react'
import cx from 'classnames'
import { usePathname } from 'next/navigation'
import { scrollEnable, scrollDisable } from '@/lib/helpers'
import Link from 'next/link'
import Menu from '@/components/Menu'
import MobileMenuTrigger from './mobile-menu-trigger'
import Img from '@/components/Image'
import useWindowDimensions from '@/hooks/useWindowDimensions'

export default function Header({ siteData, data }) {
  const pathname = usePathname()
  const headerRef = useRef()
  const headerTitleRef = useRef()
  const headerMenuRef = useRef()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { width, height } = useWindowDimensions()
  const { keyText, menu, mobileImage } = data

  useEffect(() => {
    document.documentElement.style.setProperty('--s-header-y', `${headerTitleRef?.current?.offsetHeight || 0}px`)
    const links = document.querySelector('.js-header-links')
    links && document.documentElement.style.setProperty('--header-menu-width', `${links.clientWidth}px`)
  }, [width])

  const onToggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    isMobileMenuOpen ? scrollEnable() : scrollDisable()
  }

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header
        ref={headerRef}
        className={cx('header no-text-space', {
          'is-open': isMobileMenuOpen,
        })}>
        <div ref={headerTitleRef} className='header__title'>
          {keyText &&
            keyText.split(' ').map((word, i) => (
              <div key={i} className={cx('header__title__word f-h', { 'mobile-up-only': i == 1 })}>
                {Array.from(word)?.map((char, j) =>
                  char != ' ' ? (
                    <div
                      key={j}
                      className={cx(`header__title__block t-h-2`, {
                        'mobile-up-only': i == 0 && j != 0,
                      })}
                      style={{
                        '--num': `${Math.floor(Math.random() * 30 - 20) * (Math.round(Math.random()) == 0 ? 1 : -1)}px`,
                      }}>
                      {char}
                    </div>
                  ) : (
                    <></>
                  ),
                )}
              </div>
            ))}
          {mobileImage && (
            <div className='header__title__block f-h f-a-c f-j-c child-contain mobile-down-only'>
              <Img image={mobileImage} className={'child-contain'} />
            </div>
          )}
        </div>
        {/* <Link className='g-header__logo' href='/'>
          <span className='t-b-1'>{siteData?.title ?? 'Title'}</span>
        </Link> */}

        {menu?.items && (
          <Menu
            items={menu.items}
            className='header__links user-select-disable mobile-up-only js-header-links'
            ulClassName='f-v f-a-e t-h-3 user-select-disable'
          />
        )}
        <MobileMenuTrigger isMobileMenuOpen={isMobileMenuOpen} onHandleClick={onToggleMenu} />
      </header>

      <div
        className={cx('g-mobile-menu p-fill bg-white', {
          'is-open': isMobileMenuOpen,
        })}>
        {/* <MobileMenuTrigger isMobileMenuOpen={isMobileMenuOpen} onHandleClick={onToggleMenu} /> */}
        {data?.menu && (
          <Menu items={data?.menu?.items} className='g-mobile-menu__links' ulClassName='f-v f-j-s f-a-c t-h-1' />
        )}
      </div>
    </>
  )
}
