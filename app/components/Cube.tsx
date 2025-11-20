import { useBox } from '@react-three/cannon'
import { useStore } from '../hooks/useStore'
import { ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'

interface CubeProps {
  position: [number, number, number]
  texture: string
  selectedBlock: string
}

const blockColors: Record<string, string> = {
  grass: '#7cbd56',
  dirt: '#8b7355',
  stone: '#808080',
  wood: '#8b6914',
  leaves: '#228b22',
}

export default function Cube({ position, texture, selectedBlock }: CubeProps) {
  const [ref] = useBox(() => ({
    type: 'Static',
    position,
  }))

  const addCube = useStore((state) => state.addCube)
  const removeCube = useStore((state) => state.removeCube)

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()

    if (e.button === 0) { // Left click - remove
      removeCube(position[0], position[1], position[2])
    } else if (e.button === 2) { // Right click - place
      const clickedFace = e.face
      if (!clickedFace) return

      const { normal } = clickedFace
      const newPos: [number, number, number] = [
        position[0] + normal.x,
        position[1] + normal.y,
        position[2] + normal.z,
      ]

      addCube(newPos[0], newPos[1], newPos[2], selectedBlock)
    }
  }

  return (
    <mesh
      ref={ref as any}
      onClick={handleClick}
      onContextMenu={(e) => e.stopPropagation()}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={blockColors[texture] || '#808080'} />
    </mesh>
  )
}
