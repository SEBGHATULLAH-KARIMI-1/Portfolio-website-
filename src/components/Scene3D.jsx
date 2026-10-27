import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'

/** Spherical cloud of particles that slowly drifts. */
function Particles() {
  const ref = useRef()
  const width = useThree((s) => s.size.width)
  const count = width < 700 ? 600 : 1400

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 7
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.03
    ref.current.rotation.x += delta * 0.01
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#e67373"
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  )
}

/** Distorted blob wrapped by a wireframe shell. */
function Core() {
  const blob = useRef()
  const shell = useRef()
  const viewport = useThree((s) => s.viewport)

  // On wide screens push the object to the right, behind the portrait.
  const wide = viewport.width > 7
  const x = wide ? viewport.width * 0.25 : 0
  const scale = wide ? 1 : 0.7

  useFrame((_, delta) => {
    blob.current.rotation.x += delta * 0.15
    blob.current.rotation.y += delta * 0.2
    shell.current.rotation.x -= delta * 0.1
    shell.current.rotation.y -= delta * 0.12
  })

  return (
    <group position={[x, 0, -1]} scale={scale}>
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={1.2}>
        <mesh ref={blob} scale={1.35}>
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial
            color="#c74646"
            distort={0.4}
            speed={2}
            roughness={0.25}
            metalness={0.6}
          />
        </mesh>
        <mesh ref={shell} scale={2.1}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#e67373" wireframe transparent opacity={0.22} />
        </mesh>
      </Float>
    </group>
  )
}

/** Smooth camera parallax that follows the pointer. */
function Rig() {
  useFrame(({ pointer, camera }) => {
    camera.position.x += (pointer.x * 0.9 - camera.position.x) * 0.05
    camera.position.y += (pointer.y * 0.6 - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Scene3D({ active = true }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.75]}
      // Stop rendering entirely while the hero is off-screen.
      frameloop={active ? 'always' : 'never'}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      // Listen to the whole page so parallax works even though the canvas sits behind the content.
      eventSource={document.getElementById('root')}
      eventPrefix="client"
    >
      <fog attach="fog" args={['#0a0a0a', 7, 17]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={60} color="#ff8a8a" />
      <pointLight position={[-6, -3, 2]} intensity={25} color="#ffffff" />
      <Particles />
      <Core />
      <Rig />
    </Canvas>
  )
}
