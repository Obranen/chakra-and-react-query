import axios from 'axios'
import {useQuery} from '@tanstack/react-query'
import {IPost} from '../../../models/IPost'
import Item from './Item/Item'

const List = () => {
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
    <ul>
      {posts.data.map((post: IPost) => (
        <Item post={post} key={post.id}/>
      ))}
    </ul>
  )
}

export default List