import React, { useEffect, useState } from 'react'
import { PostForm } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getPostAPI, getAllPostAPI, editPostAPI } from '../store/services/postAction'
import { resetPostState } from '../store/features/postSlice'

function EditPost() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState(null)
    const username = useSelector(state => state.user.userInfo?.username)
    const postInfo = useSelector(state => state.post.postInfo)
    const message = useSelector(state => state.post.message)
    const success = useSelector(state => state.post.success)
    const loading = useSelector(state => state.post.loading)

    const editPost = (data) =>{
        if(!data.title){
            return setError("Title is required")
        }
        if(!data.content){
            return setError("Content is required")
        }
        dispatch(editPostAPI({slug, data}))
    }

    useEffect(() => {
        dispatch(getPostAPI(slug))
    }, [])

    useEffect(() => {
        if(message && !success){
          setError(message);
        }
        else{
          setError(null)
        }
        if(message && success){
            navigate(`/${username}/${postInfo?.slug}`)
            dispatch(getAllPostAPI())
        }
      }, [message, success]);

    
    useEffect(() => {
        return () => dispatch(resetPostState())
    }, [])

    if(error){
        setTimeout(() => {
            setError(null)
        }, 3000)
    }
   return (

    <PostForm error={error} postAction={editPost} loading={loading} defaultValues={postInfo}/>
  )
}

export default EditPost
