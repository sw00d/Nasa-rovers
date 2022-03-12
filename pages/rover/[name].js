import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Box, CircularProgress, TextField } from "@mui/material"
import DatePicker from '@mui/lab/DatePicker'
import { format } from 'date-fns'
import styles from "../../styles/Home.module.styl"

export default function Home(arg) {
  const { query: { name } } = useRouter()
  const [loading, setLoading] = useState(true)
  const [images, setImages] = useState([])
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    (async () => {
      if (!name || !date || date?.length < 10) return
      // Fetches images of rover
      try {
        setLoading(true)
        const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${ name.toLowerCase() }/photos?earth_date=${ format(date, 'yyyy-M-d') }&api_key=DEMO_KEY`
        const res = await fetch(url)
        const json = await res.json()
        // setImages(json.photos || [])
      } catch (e) {
        // Catch and handle error
        console.error(e)
        // Replace alert with pretty snackbar
        alert('Error Occurred')
      } finally {
        if (loading) {
          setLoading(false)
        }
      }
    })()
  }, [date, name])

  return (
    <div className={ styles.container }>

      <div
        className={ styles.header }
      >
        <Box
          sx={ {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 15px',
            flexWrap: 'wrap',
            width: '100%'
          } }
          className={ styles.main_title }
        >
          <h1 className={ styles.main_title }>
            { name }
          </h1>
          <Box
            sx={ {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            } }
          >
            <DatePicker
              label="Date"
              value={ date }
              onChange={ (newDate) => {
                setDate(newDate)
              } }
              renderInput={ (params) => <TextField { ...params } color={ 'white' }/> }
            />

            {
              loading ?
                (
                  <Box
                    sx={ {
                      marginLeft: '8px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    } }
                  >
                    <CircularProgress color="white" size={ 25 }/>
                  </Box>
                )
                : null
            }
          </Box>
        </Box>
      </div>
      <div className={ styles.main }>
        {
          !images.length ? <div>No images for the selected date</div> : null
        }

        <Box sx={ { display: 'flex', flexWrap: 'wrap' } }>
          {
            images.map(({ img_src }, i) => (
              <Box
                key={ i }
                sx={ {
                  width: '250px',
                  margin: '10px',
                  padding: '8px',
                } }
              >
                <img
                  src={ img_src }
                  alt={`${name} image ${i+1}`}
                  width="250px"
                />
              </Box>
            ))
          }
        </Box>
      </div>

    </div>
  )
}
