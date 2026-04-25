import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

let users = [
  { id: '1', name: 'Admin' }
]

app.get('/api/users', (req, res) => {
  res.json(users)
})

app.post('/api/users', (req, res) => {
  const { name } = req.body
  if (!name) return res.status(400).json({ error: 'Name required' })
  const id = Date.now().toString()
  const user = { id, name }
  users.push(user)
  res.status(201).json(user)
})

app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params
  const prevLen = users.length
  users = users.filter((u) => u.id !== id)
  if (users.length === prevLen) return res.status(404).json({ error: 'Not found' })
  res.json({ success: true })
})

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 5000

function startServer(port) {
  const server = app.listen(port, () => console.log(`API listening on ${port}`))
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      const newPort = port + 1
      console.warn(`Port ${port} in use, trying ${newPort}`)
      startServer(newPort)
    } else {
      console.error('Server error', err)
      process.exit(1)
    }
  })
}

startServer(DEFAULT_PORT)
