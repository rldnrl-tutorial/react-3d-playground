import { css } from '@emotion/react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Earth from '../components/earth'

const canvasStyleContainer = css`
  width: 100%;
  height: 100%;
`

const App = () => {
  return (
    <div css={canvasStyleContainer}>
      <Canvas>
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default App
