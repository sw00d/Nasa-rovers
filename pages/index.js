import Head from 'next/head'
import { Box, CircularProgress, Fade } from '@mui/material'
import { useEffect, useState, useMemo } from 'react'
import styles from '../styles/Home.module.styl'

import RoverCard from "../components/RoverCard"

export default function Home() {
  const [mounting, setMounting] = useState(true)
  const [rovers, setRovers] = useState([])
  const sortedRovers = useMemo(() => sortByLaunchDate(rovers), [rovers])

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
      <div
        className={ styles.header }
      >
        <h1 className={ styles.main_title }>
          Mars Rovers
        </h1>
      </div>
      <main className={ styles.main }>
        {
          mounting ? (<CircularProgress/>) : (
            <Fade in={ !mounting }>
              <Box sx={ { display: 'flex', flexWrap: 'wrap' } }>
                {
                  sortedRovers.map((rover, i) => (
                    <RoverCard
                      key={ i }
                      rover={ rover }
                    />
                  ))
                }
              </Box>
            </Fade>
          )
        }
      </main>
    </div>
  )
}

function sortByLaunchDate(list_of_rovers) {
  if (!list_of_rovers) return []
  const rovers = [...list_of_rovers]
  rovers.sort((a, b) => {
    const [y1, m1, d1] = a.launch_date.split('-')
    const month1 = parseInt(m1) - 1
    // Month is zero indexed in JS's Date object for some wack reason...
    const date_a = new Date(y1, month1, d1)

    const [y2, m2, d2] = b.launch_date.split('-')
    const month2 = parseInt(m2) - 1
    const date_b = new Date(y2, month2, d2)
    return date_a - date_b
  })
  return rovers
}