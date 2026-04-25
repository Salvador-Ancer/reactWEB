import { useEffect, useState } from 'react'
import {
  Container, Paper, Box, Typography, TextField, Button, List, ListItem, ListItemText, IconButton
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

function Users() {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:5001'

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${apiBase}/api/users`)
      const data = await res.json()
      setUsers(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleAdd = async () => {
    if (!name.trim()) return
    try {
      const res = await fetch(`${apiBase}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      })
      if (res.ok) {
        setName('')
        fetchUsers()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${apiBase}/api/users/${id}`, { method: 'DELETE' })
      if (res.ok) fetchUsers()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Usuarios
          </Typography>

          <Box display="flex" gap={2} mb={2}>
            <TextField
              label="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={handleAdd} disabled={!name.trim()}>
              Agregar
            </Button>
          </Box>

          <Typography variant="subtitle1" gutterBottom>
            Lista de usuarios
          </Typography>

          <List>
            {loading && <ListItem><ListItemText primary="Cargando..." /></ListItem>}
            {!loading && users.length === 0 && (
              <ListItem>
                <ListItemText primary="No hay usuarios" />
              </ListItem>
            )}
            {users.map((u) => (
              <ListItem key={u.id} secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(u.id)}>
                  <DeleteIcon />
                </IconButton>
              }>
                <ListItemText primary={u.name} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  )
}

export default Users
