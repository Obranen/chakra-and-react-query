import {FC, useState} from 'react'
import {IPost} from '../../../../models/IPost'
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Divider,
  Flex,
  Heading
} from '@chakra-ui/react'
import UpdatePost from './UpdatePost/UpdatePost'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {deletePost} from '../../../../api/posts'

interface IItem {
  post: IPost
}

const Item: FC<IItem> = ({post}) => {
  const queryClient = useQueryClient()
  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['posts'])
    }
  })

  const [isEdit, setIsEdit] = useState(false)

  const cancelEdit = (isCancel: boolean) => {
    setIsEdit(isCancel)
  }

  return (
    <Container marginTop={'20px'} marginBottom={'20px'}>
      {isEdit ?
        <UpdatePost cancelEdit={cancelEdit} post={post}/>:
        <Card>
          <CardHeader>
            <Flex gap="2" alignItems="center">
              <Avatar name={post.author}/>
              <Heading size="sm">{post.author}</Heading>
            </Flex>
          </CardHeader>
          <Divider color={'lightgray'}/>
          <CardBody>
            {post.title}
          </CardBody>
          <CardFooter justify={'space-between'}>
            <Button colorScheme="red" variant="outline" onClick={() => deletePostMutation.mutate(post.id)}>Delete</Button>
            <Button onClick={() => setIsEdit(true)} colorScheme="blue" variant="outline">Edit</Button>
          </CardFooter>
        </Card>
      }
    </Container>
  )
}

export default Item