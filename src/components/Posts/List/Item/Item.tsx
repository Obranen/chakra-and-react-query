import {FC} from 'react'
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

interface IItem {
  post: IPost
}

const Item: FC<IItem> = ({post}) => {
  return (
    <Container marginTop={'20px'} marginBottom={'20px'}>
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
          <Button colorScheme="red" variant="outline">Delete</Button>
          <Button colorScheme="blue" variant="outline">Edit</Button>
        </CardFooter>
      </Card>
    </Container>
  )
}

export default Item