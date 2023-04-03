import * as THREE from 'three'
import dynamic from 'next/dynamic'
import { useMemo, useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useFrame } from '@react-three/fiber'
import { Line, useCursor } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import SLICE from '@/media/models/slice.glb';
import { useGLTF } from '@react-three/drei'



export default function Cake({ route, ...props }) {

    const router = useRouter()
    const mesh = useRef(null)
    const [hovered, hover] = useState(false)
    // const points = useMemo(() => new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100), [])
    const { nodes } = useGLTF('http://localhost:3000/slice1.glb')
    // const { nodes } = useGLTF(SLICE.src)
    // const gltf = useLoader(GLTFLoader, 'http://localhost:3000/slice.gltf');
    // console.log(gltf)
    // console.log(SLICE)
    // useEffect(() => {
    //     const loader = new GLTFLoader();
    //     loader.load(SLICE, async (gltf) => {
    //         const nodes = await gltf.parser.getDependencies("node");
    //         console.log(nodes)
    //     })
    // })

    let counter = 0;
    useCursor(hovered)
    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime()
        if (t < 2) {
            mesh.current.translateZ(-Math.PI / 720);
            // counter++;

        }
        // console.log(t)
        // else if (counter >= 100 && counter < 200) {
        //     mesh.current.translateZ(Math.PI / 720);
        //     counter++;
        // }
        // else {
        //     counter = 0;
        // }

        // mesh.current.translateZ(Math.cos(t) * Math.PI / 720);

        // console.log(mesh.current.children)
        // for (let m of mesh.current.children) {
        //     m.translateZ(-Math.PI / 1006);
        //     // m.translateX(-Math.PI / 1006);
        // }
        // mesh.current.translateZ(-Math.PI / 2000);

        // mesh[0].current.translateZ(Math.cos(t) * Math.PI / 1006);
        // mesh.current.position.z = Math.cos(t) * (Math.PI / 8)
        // mesh.current.rotation.x = Math.cos(t) * (Math.PI / 8)
        // mesh.current.rotation.z -= delta / 4
    })

    return (
        <group ref={mesh} {...props}>
            {/* <primitive
                object={gltf.scene}
                position={[0, 1, 0]}
                children-0-castShadow
            /> */}
            {/* <mesh castShadow receiveShadow geometry={nodes.Cylinder.geometry} position={[0, 0, 0]} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}> */}
            <mesh castShadow receiveShadow geometry={nodes.Cylinder.geometry} position={[0, 0, 0]} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
                <meshPhongMaterial shininess={30} emissive={'black'} color={hovered ? 'hotpink' : 'lightpink'} />
            </mesh>
            {/* <mesh castShadow receiveShadow geometry={nodes.Cylinder.geometry} rotation-y={Math.PI / 8 * 2} position={[0, 0, 0]} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
                <meshPhongMaterial shininess={30} emissive={'black'} color={hovered ? 'hotpink' : 'lightpink'} />
            </mesh>
            <mesh castShadow receiveShadow geometry={nodes.Cylinder.geometry} rotation-y={Math.PI / 8 * 3} position={[0, 0, 0]} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
                <meshPhongMaterial shininess={30} emissive={'black'} color={hovered ? 'hotpink' : 'lightpink'} />
            </mesh>
            <mesh castShadow receiveShadow geometry={nodes.Cylinder.geometry} rotation-y={Math.PI / 8 * 4} position={[0, 0, 0]} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
                <meshPhongMaterial shininess={30} emissive={'black'} color={hovered ? 'hotpink' : 'lightpink'} />
            </mesh>
            <mesh castShadow receiveShadow geometry={nodes.Cylinder.geometry} rotation-y={Math.PI / 8 * 5} position={[0, 0, 0]} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
                <meshPhongMaterial shininess={30} emissive={'black'} color={hovered ? 'hotpink' : 'lightpink'} />
            </mesh>
            <mesh castShadow receiveShadow geometry={nodes.Cylinder.geometry} rotation-y={Math.PI / 8 * 6} position={[0, 0, 0]} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
                <meshPhongMaterial shininess={30} emissive={'black'} color={hovered ? 'hotpink' : 'lightpink'} />
            </mesh>
            <mesh castShadow receiveShadow geometry={nodes.Cylinder.geometry} rotation-y={Math.PI / 8 * 7} position={[0, 0, 0]} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
                <meshPhongMaterial shininess={30} emissive={'black'} color={hovered ? 'hotpink' : 'lightpink'} />
            </mesh> */}

            {/* @ts-ignore */}
            {/* <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} rotation={[0, 0, 1]} /> */}
            {/* @ts-ignore */}
            {/* <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} rotation={[0, 0, -1]} />
            <mesh onClick={() => router.push(route)} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
                <sphereGeometry args={[0.55, 64, 64]} />
                <meshPhysicalMaterial roughness={0} color={hovered ? 'hotpink' : '#1fb2f5'} />
            </mesh> */}
        </group>
    )
}
