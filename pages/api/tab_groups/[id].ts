import { useRouter } from 'next/router'

const Post = () => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }

  const body = JSON.parse(req.body)

  return {'message': 'That post was smoooth'}
}

export default Post
