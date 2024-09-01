import { createAction, createSlice, current, nanoid, PayloadAction } from '@reduxjs/toolkit'
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

// export const addPost = createAction<PostType>('blog/addPost')
// export const deletePost = createAction<string>('blog/deletePost')
// export const startEditingPost = createAction<string>('blog/startEditingPost')
// export const cancelEditingPost = createAction('blog/cancelEdit')
// export const finishEditingPost = createAction<PostType>('blog/finishEditingPost')

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action: PayloadAction<PostType>) => {
        state.postList.push(action.payload)
      },
      prepare: (post: Omit<PostType, 'id'>) => {
        return {
          payload: {
            ...post,
            id: nanoid()
          }
        }
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      const postId = action.payload
      const foundPostIndex = state.postList.findIndex((post) => post.id === postId)
      if (foundPostIndex !== -1) {
        state.postList.splice(foundPostIndex, 1)
      }
    },
    startEditingPost: (state, action: PayloadAction<string>) => {
      const post = state.postList.find((post) => post.id === action.payload)
      if (post) {
        state.editingPost = post
      }
    },
    cancelEditingPost: (state) => {
      state.editingPost = null
    },
    finishEditingPost: (state, action: PayloadAction<PostType>) => {
      const postPayload = action.payload
      state.postList.forEach((post, index) => {
        if (post.id === postPayload.id) {
          state.postList[index] = postPayload
          state.editingPost = null
          return true
        }
      })
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type.includes('cancel'),
      (state, action) => {
        console.log(current(state))
      }
    )
  }
})

export const { addPost, cancelEditingPost, deletePost, finishEditingPost, startEditingPost } = blogSlice.actions

const blogReducer = blogSlice.reducer
export default blogReducer
