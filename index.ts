import { z } from 'zod'

const User = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email()
})

type User = z.infer<typeof User>

const Post = z.object({
    id: z.number(),
    title: z.string(),
    user: User
})

type Post = z.infer<typeof Post>

const validJson = JSON.stringify({
    "id": 1,
    "title": 'title',
    "user": {
        "id": 1,
        "name": "name",
        "email": "email@email.com"
    }
})

const invalidJson = JSON.stringify({
    "id": 1,
    "title": 'title',
    "user": {
        "id": 1,
        // "name": "name", name should be required
        "email": "email@email.com"
    }
})

try {
    const validPost = Post.parse(JSON.parse(validJson))
    console.log('validPost parse success')
    console.log(validPost)
    const invalidPost = Post.parse(JSON.parse(invalidJson))
    console.log('invalidPost parse success') // not run
    console.log(invalidPost) // not run
} catch (e) {
    console.log(e)
}