import axios from 'axios'
import {IPost} from '../models/IPost'

export const getPosts = async () => {
  try {
    const response = await axios.get('http://localhost:5000/posts')
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const createPost = async (data: IPost) => {
  const url = 'http://localhost:5000/posts'
  try {
    await axios.post(url, data)
  } catch (e) {
    console.log(e)
  }
}

export const deletePost = async (id: number) => {
  const url = `http://localhost:5000/posts/${id}`
  try {
    await axios.delete(url)
    return null
  } catch (e) {
    console.log(e)
  }
}

export const updatePost = async (data: IPost) => {
  const url = `http://localhost:5000/posts/${data.id}`
  try {
    await axios.put(url, data)
  } catch (e) {
    console.log(e)
  }
}