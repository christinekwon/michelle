import dynamic from 'next/dynamic'
import Instructions from '@/components/dom/Instructions'
import Intro from '@/components/dom/Message'

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Logo = dynamic(() => import('@/components/canvas/Logo'), { ssr: false })
const Cake = dynamic(() => import('@/components/canvas/Cake'), { ssr: false })

// Dom components go here
export default function Page(props) {
  return (
    <Intro>
      <span className='text-pink-200 font-serif'>Michelle Minsuh Kwon artist portfolio</span>
    </Intro>
  )
}

const cakes = [];
for (let i = 0; i < 12; i++) {
  cakes.push(<Cake scale={[1.01, 1, 1]} route='/blob' position-y={0} rotation-y={Math.PI / 6 * i} />)
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
// Page.canvas = (props) => <Logo scale={1} route='/blob' position-y={-1} />

Page.canvas = (props) => cakes;
//   [<Cake scale={1} route='/blob' position-y={0} rotation-y={0} />,
// <Cake scale={[1, 0.5, 1]} route='/blob' position-y={0} rotation-y={Math.PI / 8 * 2} />
//     <Cake scale={1} route='/blob' position-y={0} rotation-y={Math.PI / 8*3} />,
//     <Cake scale={1} route='/blob' position-y={0} rotation-y={Math.PI / 8*4} />,
//     <Cake scale={1} route='/blob' position-y={0} rotation-y={Math.PI / 8*5} />,
//     <Cake scale={1} route='/blob' position-y={0} rotation-y={Math.PI / 8*5} />,
//     <Cake scale={1} route='/blob' position-y={0} rotation-y={Math.PI / 8} />,
//     <Cake scale={1} route='/blob' position-y={0} rotation-y={Math.PI / 8} />,
//     <Cake scale={1} route='/blob' position-y={0} rotation-y={Math.PI / 8} />,
//     <Cake scale={1} route='/blob' position-y={0} rotation-y={Math.PI / 8} />,
//     <Cake scale={1} route='/blob' position-y={0} rotation-y={Math.PI / 8} />,
//     <Cake scale={1} route='/blob' position-y={0} rotation-y={Math.PI / 8} />,

// <Cake scale={1} route='/blob' position-y={0} rotation-y={Math.PI / 6 * 2} />,
// <Cake scale={1} route='/blob' position-y={0} rotation-y={Math.PI / 6 * 3} />,
// <Cake scale={1} route='/blob' position-y={0} rotation-y={Math.PI / 6 * 4} />,
// <Cake scale={1} route='/blob' position-y={0} rotation-y={Math.PI / 6 * 5} />,
// <Cake scale={1} route='/blob' position-y={0} rotation-y={Math.PI} />,
// <Cake scale={1} route='/blob' position-y={0} rotation-y={Math.PI / 6 * 7} />,
// <Cake scale={1} route='/blob' position-y={0} rotation-y={Math.PI / 6 * 8} />,
// <Cake scale={1} route='/blob' position-y={0} rotation-y={Math.PI / 6 * 9} />,
// <Cake scale={1} route='/blob' position-y={0} rotation-y={Math.PI / 6 * 10} />,
// <Cake scale={1} route='/blob' position-y={0} rotation-y={Math.PI / 6 * 11} />,
// ]


export async function getStaticProps() {
  return { props: { title: 'Index' } }
}
