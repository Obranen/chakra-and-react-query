import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
import {IPost} from '../../models/IPost'

const Posts = () => {
  const getPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/posts')
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  const posts = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts()
  })
  
  if (posts.isLoading) {
    return <h1>Loading...</h1>
  }

  if (posts.error) {
    return <h1>Error... Посты не загружены</h1>
  }

  return (
    <>
      {posts.data.map((post: IPost) => (
        <div key={post.id}>
          <ul>
            <li>
              <p>Author: {post.author}</p>
              <p>Title: {post.title}</p>
            </li>
          </ul>
        </div>
      ))}
    </>
  )
}

export default Posts