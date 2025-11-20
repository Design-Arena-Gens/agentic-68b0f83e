import { usePlane } from '@react-three/cannon'
import { useStore } from '../hooks/useStore'
import { ThreeEvent } from '@react-three/fiber'

export default function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0],
  }))

  const addCube = useStore((state) => state.addCube)

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    if (e.button === 2) { // Right click
      const [x, y, z] = Object.values(e.point).map((val) => Math.ceil(val))
      addCube(x, y, z, 'grass')
    }
  }

  return (
    <mesh ref={ref as any} onClick={handleClick} onContextMenu={(e) => e.stopPropagation()}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#7cbd56" />
    </mesh>
  )
}
