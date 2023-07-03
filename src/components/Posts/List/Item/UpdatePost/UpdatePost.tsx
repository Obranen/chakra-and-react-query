import {FC} from 'react'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {updatePost} from '../../../../../api/posts'
import {Controller, SubmitHandler, useForm, useFormState} from 'react-hook-form'
import {IPost} from '../../../../../models/IPost'
import {Button, Card, CardFooter, CardHeader, FormControl, FormErrorMessage, FormLabel, Input} from '@chakra-ui/react'

interface IUpdatePost {
  post: IPost
  cancelEdit: (isCancel: boolean) => void
}

const UpdatePost: FC<IUpdatePost> = ({post, cancelEdit}) => {
  const queryClient = useQueryClient()
  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['posts'])
    }
  })

  const {handleSubmit, control, resetField} = useForm<IPost>({
    defaultValues: {author: `${post.author}`, title: `${post.title}`}
  })
  const {errors} = useFormState({control})
  const onSubmit: SubmitHandler<IPost> = data => {
    updatePostMutation.mutate({
      id: post.id,
      title: data.title,
      author: data.author
    })
    resetField('author')
    resetField('title')
    cancelEdit(false)
  }

  return (
    <>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)} style={{marginBottom: '20px'}}>
          <CardHeader>
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
          </CardHeader>
          <CardFooter justify={'space-between'}>
            <Button onClick={() => cancelEdit(false)} colorScheme="green" variant="outline">Cancel</Button>
            <Button
              disabled={updatePostMutation.isLoading}
              type="submit"
              colorScheme="teal"
              variant="solid"
              loadingText="Loading..."
              isLoading={updatePostMutation.isLoading}
            >
              Save
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  )
}

export default UpdatePost