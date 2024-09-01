import { createAction, createReducer, current } from '@reduxjs/toolkit'
import { initialPostList } from 'src/constants/blog'
import { PostType } from 'src/types/blog.type'

interface BlogState {
  postList: PostType[]
  editingPost: PostType | null
}

const initialState: BlogState = {
  postList: initialPostList,
  editingPost: null
}

export const addPost = createAction<PostType>('blog/addPost')
export const deletePost = createAction<string>('blog/deletePost')
export const startEditingPost = createAction<string>('blog/startEditingPost')
export const cancelEditingPost = createAction('blog/cancelEdit')
export const finishEditingPost = createAction<PostType>('blog/finishEditingPost')

const blogReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addPost, (state, action) => {
      state.postList.push(action.payload)
    })
    .addCase(deletePost, (state, action) => {
      const postId = action.payload
      const foundPostIndex = state.postList.findIndex((post) => post.id === postId)
      if (foundPostIndex !== -1) {
        state.postList.splice(foundPostIndex, 1)
      }
    })
    .addCase(startEditingPost, (state, action) => {
      const post = state.postList.find((post) => post.id === action.payload)
      if (post) {
        state.editingPost = post
      }
    })
    .addCase(cancelEditingPost, (state) => {
      state.editingPost = null
    })
    .addCase(finishEditingPost, (state, action) => {
      const postPayload = action.payload
      state.postList.forEach((post, index) => {
        if (post.id === postPayload.id) {
          state.postList[index] = postPayload
          state.editingPost = null
          return true
        }
      })
    })
    .addMatcher(
      (action) => action.type.includes('cancel'),
      (state, action) => {
        console.log(current(state))
      }
    )
})

export default blogReducer
