import { create } from 'zustand'

export interface Cube {
  pos: [number, number, number]
  texture: string
}

interface StoreState {
  cubes: Cube[]
  addCube: (x: number, y: number, z: number, texture: string) => void
  removeCube: (x: number, y: number, z: number) => void
}

export const useStore = create<StoreState>((set) => ({
  cubes: [],
  addCube: (x, y, z, texture) =>
    set((state) => ({
      cubes: [...state.cubes, { pos: [x, y, z], texture }],
    })),
  removeCube: (x, y, z) =>
    set((state) => ({
      cubes: state.cubes.filter(
        (cube) =>
          cube.pos[0] !== x || cube.pos[1] !== y || cube.pos[2] !== z
      ),
    })),
}))
