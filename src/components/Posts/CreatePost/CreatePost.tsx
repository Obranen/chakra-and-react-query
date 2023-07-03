import {Button, Center, Container, FormControl, FormErrorMessage, FormLabel, Heading, Input} from '@chakra-ui/react'
import {Controller, SubmitHandler, useForm, useFormState} from 'react-hook-form'
import {IPost} from '../../../models/IPost'
import {createPost} from '../../../api/posts'
import {useMutation, useQueryClient} from '@tanstack/react-query'

const CreatePost = () => {
  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['posts'])
    }
  })

  const {handleSubmit, control, resetField} = useForm<IPost>({
    defaultValues: {author: '', title: ''}
  })
  const {errors} = useFormState({control})
  const onSubmit: SubmitHandler<IPost> = data => {
    createPostMutation.mutate({
      id: data.id,
      title: data.title,
      author: data.author
    })
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
          <Button
            disabled={createPostMutation.isLoading}
            type="submit"
            colorScheme="teal"
            variant="solid"
            loadingText='Loading...'
            isLoading={createPostMutation.isLoading}
          >
            Add Post
          </Button>
        </Center>
      </form>
    </Container>
  )
}

export default CreatePost