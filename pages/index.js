import Head from 'next/head'
import styles from '../styles/Home.module.styl'
import Box from '@mui/material/Box'

import RoverCard from "../components/RoverCard"
import { useEffect, useState } from 'react'

export default function Home() {
  const [mounting, setMounting] = useState(true)
  const [rovers, setRovers] = useState([])

  useEffect(() => {
    (async () => {
      // Fetches all rovers on mount
      try {
        setMounting(true)
        const res = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/?api_key=DEMO_KEY')
        const json = await res.json()
        setRovers(json.rovers)
      } catch (e) {
        // Catch and handle error
        console.error(e)
        // Replace alert with pretty snackbar
        alert('Error Occurred')
      } finally {
        if (mounting) {
          setMounting(false)
        }
      }
    })()
  }, [])

  return (
    <div className={ styles.container }>
      <Head>
        <title>Nasa rovers</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={ styles.main }>
        <Box sx={ { display: 'flex', flexWrap: 'wrap' } }>
          {
            rovers.map((rover, i) => (
              <RoverCard
                key={ i }
                rover={ rover }
              />
            ))
          }
        </Box>
      </main>

      <div
        className={ styles.footer }
      >
        Powered by{ ' ' }
      </div>
    </div>
  )
}