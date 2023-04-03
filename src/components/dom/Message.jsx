export default function Message({ children }) {
  return (
    <div
      className='absolute top-16 left-1/2 max-w-lg -translate-x-1/2 rounded-lg bg-zinc-800 px-10 py-8 text-sm shadow-xl md:text-base'
      style={{ maxWidth: 'calc(100% - 28px)' }}>
      <p className='mb-8 hidden md:block'>{children}</p>
      <div className='tracking-wider'>
        {/* Michelle Minsuh Kwon artist portfolio */}
        {/* <br /> */}

      </div>
    </div>
  )
}
