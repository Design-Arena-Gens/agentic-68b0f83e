'use client'

import { Canvas } from '@react-three/fiber'
import { Sky, PointerLockControls } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { Suspense, useState } from 'react'
import Player from './Player'
import Ground from './Ground'
import Cubes from './Cubes'
import { useStore } from '../hooks/useStore'

export default function Game() {
  const [selectedBlock, setSelectedBlock] = useState<string>('grass')
  const cubes = useStore((state) => state.cubes)

  return (
    <>
      <div className="hud">
        <div>MindCraft 3D</div>
        <div>Blocks: {cubes.length}</div>
      </div>

      <div className="crosshair">+</div>

      <div className="controls">
        <div><strong>Controls:</strong></div>
        <div>WASD - Move</div>
        <div>Space - Jump</div>
        <div>Left Click - Remove Block</div>
        <div>Right Click - Place Block</div>
        <div>1-5 - Select Block Type</div>
      </div>

      <div className="block-selector">
        <div
          className={`block-option block-grass ${selectedBlock === 'grass' ? 'selected' : ''}`}
          onClick={() => setSelectedBlock('grass')}
          title="Grass (1)"
        />
        <div
          className={`block-option block-dirt ${selectedBlock === 'dirt' ? 'selected' : ''}`}
          onClick={() => setSelectedBlock('dirt')}
          title="Dirt (2)"
        />
        <div
          className={`block-option block-stone ${selectedBlock === 'stone' ? 'selected' : ''}`}
          onClick={() => setSelectedBlock('stone')}
          title="Stone (3)"
        />
        <div
          className={`block-option block-wood ${selectedBlock === 'wood' ? 'selected' : ''}`}
          onClick={() => setSelectedBlock('wood')}
          title="Wood (4)"
        />
        <div
          className={`block-option block-leaves ${selectedBlock === 'leaves' ? 'selected' : ''}`}
          onClick={() => setSelectedBlock('leaves')}
          title="Leaves (5)"
        />
      </div>

      <Canvas camera={{ fov: 75 }}>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Physics gravity={[0, -20, 0]}>
            <Ground />
            <Player selectedBlock={selectedBlock} />
            <Cubes />
          </Physics>
        </Suspense>
        <PointerLockControls />
      </Canvas>
    </>
  )
}
