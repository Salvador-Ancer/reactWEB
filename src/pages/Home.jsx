import { Container, Typography, Paper, Box } from '@mui/material'

function Home() {
  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Bienvenido!!
          </Typography>
          <Typography variant="body1">
            Esta es la vista principal de la aplicacion
          </Typography>
        </Paper>
      </Box>
    </Container>
  )
}

export default Home