import { useStore } from '../hooks/useStore'
import Cube from './Cube'
import { useState, useEffect } from 'react'

export default function Cubes() {
  const cubes = useStore((state) => state.cubes)
  const [selectedBlock, setSelectedBlock] = useState('grass')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const blockTypes = ['grass', 'dirt', 'stone', 'wood', 'leaves']
      const keyNum = parseInt(e.key)
      if (keyNum >= 1 && keyNum <= 5) {
        setSelectedBlock(blockTypes[keyNum - 1])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      {cubes.map((cube) => (
        <Cube
          key={`${cube.pos[0]}-${cube.pos[1]}-${cube.pos[2]}`}
          position={cube.pos}
          texture={cube.texture}
          selectedBlock={selectedBlock}
        />
      ))}
    </>
  )
}
