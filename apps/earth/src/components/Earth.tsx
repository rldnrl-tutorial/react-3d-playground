import { Mesh, TextureLoader } from 'three'
import { useFrame, useLoader } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { DoubleSide } from 'three'

import EarthDayMap from '../assets/textures/8k_earth_daymap.jpg'
import EarthNormalMap from '../assets/textures/8k_earth_normal_map.jpg'
import EarthSpecularMap from '../assets/textures/8k_earth_specular_map.jpg'
import EarthCloudsMap from '../assets/textures/8k_earth_clouds.jpg'
import { useRef } from 'react'
import isNull from '../utils/isNull'

const Earth = () => {
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  )

  const earthRef = useRef<Mesh | null>(null)
  const cloudRef = useRef<Mesh | null>(null)

  useFrame(({ clock }) => {
    if (isNull(earthRef.current)) return
    if (isNull(cloudRef.current)) return

    const elapsedTime = clock.getElapsedTime()
    earthRef.current.rotation.y = elapsedTime / 6
    cloudRef.current.rotation.y = elapsedTime / 6
  })

  return (
    <>
      <pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={1.2} />
      <Stars
        radius={300}
        depth={60}
        count={10000}
        factor={7}
        saturation={0}
        fade={true}
      />
      <mesh ref={cloudRef} position={[0, 0, 3]}>
        <sphereGeometry args={[1.005, 32, 32]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          depthWrite={true}
          transparent={true}
          side={DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef} position={[0, 0, 3]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.4}
          roughness={0.7}
        />
      </mesh>
    </>
  )
}

export default Earth
