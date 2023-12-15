import { useCallback, useEffect, useState } from 'react'
import type { Container, Engine } from 'tsparticles-engine'
import Particles from 'react-particles'
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from 'tsparticles-slim' // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.

import styles from './index.module.scss'

const FoodBackground = ({
  optionsName,
  children
}: {
  optionsName: string
  children: React.ReactNode
}) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {}, [])

  const [options, setOptions] = useState({})

  useEffect(() => {
    const loadData = async () => {
      try {
        const optionsData = await import(`./${optionsName}.ts`)

        setOptions(optionsData.default)
      } catch (error) {
        console.error('Error loading dynamic module:', error)
      }
    }

    loadData()
  }, [optionsName])

  return (
    <div className={styles.main}>
      <Particles
        id="tsparticles"
        className={styles.tsparticles}
        init={particlesInit}
        loaded={particlesLoaded}
        options={options}
      />
      {children}
    </div>
  )
}

export default FoodBackground
