import express from 'express'
import { prisma } from '../lib/prisma'

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello from Prisma API!')
})


// CREATE USER
app.post('/users', async (req, res) => {
  const { name, email } = req.body

  try {
    const user = await prisma.user.create({
      data: { name, email }
    })
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' })
  }
})

// GET ALL USERS
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { posts: true }
    })
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

// GET USER BY EMAIL 
app.get('/users/email/:email', async (req, res) => {
  const { email } = req.params

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

// UPDATE USER
app.put('/users/:id', async (req, res) => {
  const { id } = req.params
  const { name, email } = req.body

  try {
    const user = await prisma.user.update({
      where: { Userid: id }, 
      data: { name, email }
    })

    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' })
  }
})

// DELETE USER
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await prisma.user.delete({
      where: { Userid: id } 
    })

    res.json({ message: 'User deleted successfully', user })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' })
  }
})


// CREATE POST 
app.post('/posts', async (req, res) => {
  const { title, content, authorId } = req.body

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId 
      }
    })

    res.status(201).json(post)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' })
  }
})

// GET ALL POSTS 
app.get('/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true }
    })

    res.json(posts)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' })
  }
})

// GET POST BY ID 
app.get('/posts/:id', async (req, res) => {
  const { id } = req.params

  try {
    const post = await prisma.post.findUnique({
      where: { postId: id }, 
      include: { author: true }
    })

    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    res.json(post)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' })
  }
})

// UPDATE POST 
app.put('/posts/:id', async (req, res) => {
  const { id } = req.params
  const { title, content, published } = req.body

  try {
    const post = await prisma.post.update({
      where: { postId: id }, 
      data: { title, content, published }
    })

    res.json(post)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' })
  }
})

// DELETE POST 
app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params

  try {
    const post = await prisma.post.delete({
      where: { postId: id } 
    })

    res.json({ message: 'Post deleted successfully', post })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' })
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})