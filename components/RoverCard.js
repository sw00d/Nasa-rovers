import { Box,Card } from "@mui/material"

export default function RoverCard({ rover }) {
  return (
    <Card sx={{
      width: '250px',
      minHeight: '350px',
      margin: '10px',
      padding: '8px'
    }}>
      <div>{rover.name}</div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >

        <div>{rover.launch_date}</div>
        <div>{rover.landing_date}</div>
      </Box>
    </Card>
  )
}
