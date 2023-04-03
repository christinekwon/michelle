import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import SLICE from './slice.gltf';

export default function Scene({ children, ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped

  // const gltf = useLoader(GLTFLoader, './slice.gltf');
  return (
    <Canvas {...props} camera={{ fov: 50, position: [0, 5, 0] }}>
      {/* <primitive object={gltf.scene} /> */}
      {/* <directionalLight intensity={0.75} color={'red'} /> */}
      <directionalLight position={[0, 10, 10]} intensity={0.75} color={'white'} />
      <ambientLight intensity={0.5} color={'black'} />
      {children}
      <Preload all />
      <OrbitControls />
    </Canvas>
  )
}
