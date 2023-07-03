import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input
} from '@chakra-ui/react'
import {Controller, SubmitHandler, useForm, useFormState} from 'react-hook-form'
import {IPost} from '../../../models/IPost'
import {Container} from '@chakra-ui/react'

const CreatePost = () => {
  const {handleSubmit, control, resetField} = useForm<IPost>({
    defaultValues: {author: '', title: ''}
  })
  const {errors} = useFormState({control})
  const onSubmit: SubmitHandler<IPost> = data => {
    console.log(data)
    resetField('author')
    resetField('title')
  }

  return (
    <Container>
      <Heading as={'h3'} size={'lg'} textAlign={'center'} marginTop={'20px'}>
        Chakra, RHF and React Query
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)} style={{marginBottom: '20px'}}>
        <Controller
          control={control}
          name="author"
          rules={{required: 'Заполните поле'}}
          render={({field}) => (
            <FormControl isInvalid={!!errors.author?.message} marginTop={'20px'}>
              <FormLabel>Author</FormLabel>
              <Input
                type="text"
                value={field.value}
                onChange={(e) => field.onChange(e)}
              />
              <FormErrorMessage>{errors.author?.message}</FormErrorMessage>
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="title"
          rules={{required: 'Заполните поле'}}
          render={({field}) => (
            <FormControl isInvalid={!!errors.title?.message} marginTop={'20px'}>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                value={field.value}
                onChange={(e) => field.onChange(e)}
              />
              <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
            </FormControl>
          )}
        />
        <Center marginTop={'20px'}>
          <Button type="submit" colorScheme="teal" variant="solid">Add Post</Button>
        </Center>
      </form>
    </Container>
  )
}

export default CreatePost