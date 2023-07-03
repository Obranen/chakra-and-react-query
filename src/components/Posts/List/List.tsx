import axios from 'axios'
import {useQuery} from '@tanstack/react-query'
import {IPost} from '../../../models/IPost'
import Item from './Item/Item'
import {Container, Heading} from '@chakra-ui/react'

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
    return <Container marginTop={'20px'}>
      <Heading as={'h3'} size={'md'} textAlign={'center'} marginTop={'20px'}>
        Loading...
      </Heading>
    </Container>
  }

  if (posts.error) {
    return <Container marginTop={'20px'}>
      <Heading color={'red'} as={'h3'} size={'md'} textAlign={'center'} marginTop={'20px'}>
        Error... Посты не загружены
      </Heading>
    </Container>
  }
  return (
    <>
      <Heading as={'h3'} size={'md'} textAlign={'center'} marginTop={'30px'}>
        List
      </Heading>
      {posts.data.map((post: IPost) => (
        <Item post={post} key={post.id}/>
      ))}
    </>
  )
}

export default List