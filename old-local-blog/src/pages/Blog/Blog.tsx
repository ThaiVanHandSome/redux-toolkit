import CreatePost from 'src/components/CreatePost'
import PostList from 'src/components/PostList'

export default function Blog() {
  return (
    <div className='p-5'>
      <CreatePost />
      <PostList />
    </div>
  )
}
