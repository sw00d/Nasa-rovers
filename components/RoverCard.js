import { Box, Card, Chip, Link } from "@mui/material"
import { format } from 'date-fns'
import styles from '../styles/RoverCard.module.styl'
import { CheckCircleOutlineOutlined } from '@mui/icons-material'

function formatDate(date) {
  const [y, m, d] = date.split('-')
  const month = parseInt(m) - 1
  // Month is zero indexed in JS's Date object for some wack reason...
  return format(new Date(y, month, d), 'MMM, yyyy')

}

export default function RoverCard({ rover }) {
  return (
    <Link href={`/rover/${rover.name}/`} color="inherit">
      <Card
        dark="true"
        className={styles.clickable_card}
        sx={ {
          width: '250px',
          minHeight: '350px',
          margin: '10px',
          padding: '8px',
          bgcolor: 'grey.main',
        } }
      >
        <div className={ styles.card_title }>
          { rover.name }
        </div>

        <Box
          sx={ {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '20px'
          } }
        >
          <Chip
            label={ (
              <div>
                <div className={ styles.launched_label }>
                  Launched
                </div>
                { formatDate(rover.launch_date) }
              </div>
            ) }
            className={ styles.date_chip_1 }
          />
          <Box
            className={ styles.divider }
          />
          <Chip
            label={ (
              <div>
                <div className={ styles.landed_label }>
                  Landed
                </div>
                { formatDate(rover.landing_date) }
              </div>
            ) }
            className={ styles.date_chip_2 }
          />
        </Box>

        <div className={ styles.camera_title }>Cameras ({ rover.total_photos.toLocaleString("en-US") } photos):</div>
        <div className={ styles.cameras_container }>
          {
            rover.cameras.map(({ name }, i) => (
              <div
                key={ i }
                className={ styles.camera_name }
              >
                <CheckCircleOutlineOutlined sx={ {
                  fontSize: '14px',
                  color: 'white',
                  opacity: '.6',
                  marginRight: '4px',
                } }/>
                { name }
              </div>
            ))
          }
        </div>
      </Card>
    </Link>
  )
}
