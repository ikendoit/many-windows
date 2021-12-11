import type { NextApiRequest, NextApiResponse } from 'next'
import { useRouter } from 'next/router'
type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }

  const body = JSON.parse(req.body)

  res.status(200).json({'message': 'That post was smoooth'})
}
