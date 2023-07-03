import {useQuery} from '@tanstack/react-query'
import {IPost} from '../../../models/IPost'
import Item from './Item/Item'
import {Container, Heading} from '@chakra-ui/react'
import {getPosts} from '../../../api/posts'

const List = () => {
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

  if (!posts.data.length) {
    return <Container marginTop={'20px'}>
      <Heading as={'h3'} size={'md'} textAlign={'center'} marginTop={'20px'}>
        Нет постов.
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