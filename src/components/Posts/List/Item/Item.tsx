import {FC} from 'react'
import {IPost} from '../../../../models/IPost'

interface IItem {
  post: IPost
}

const Item: FC<IItem> = ({post}) => {
  return (
    <>
      <li>
        <p>Author: {post.author}</p>
        <p>Title: {post.title}</p>
      </li>
    </>
  )
}

export default Item