import { Box } from '@mui/system'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db, storage } from '../../firebase/firebase'
import { UserInfoType } from '../../store/slices/userSlice'
import userDefaultAvatar from '../../assets/images/user.png'
import { Typography } from '@mui/material'
import { PostType } from '../../store/slices/postsSlice'
import { getDownloadURL, ref } from 'firebase/storage'

const SpecificUser = () => {
  const { id } = useParams()
  const [userInfo, setUserInfo] = useState<null | UserInfoType>(null)
  const [posts, setPosts] = useState<null | Array<PostType>>(null)
  const [postsAmount, setPostsAmount] = useState<null | number>(null)

  const getUser = async () => {
    const userRef = doc(db, "users", `${id}`);
    const userSnap = await getDoc(userRef);
    setUserInfo(userSnap.data() as UserInfoType)
    const postsArray: Array<PostType> = []

    const q = query(collection(db, "posts"), where("addedById", "==", id));
    const querySnapshot = await getDocs(q);
    setPostsAmount(querySnapshot.docs.length)

    querySnapshot.docs.map(async (post) => {
      const imageRef = ref(storage, `images/${post.data().addedById}/${post.id}.jpg`);
      const url = await getDownloadURL(imageRef)

      await Promise.all([post.data()]).then(values => {
        postsArray.push({
          ...values[0] as PostType,
          url
        })
      });
    })
    setPosts(postsArray as Array<PostType>)
  }


  useEffect(() => {
    getUser()
  }, [])

  return (
    <Box sx={{ pt: '48px' }} >
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
        <img style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} src={userInfo?.avatarUrl ? userInfo?.avatarUrl : userDefaultAvatar} alt="user avatar" />
        <Box>
          <Typography fontWeight="bold">{userInfo?.name}</Typography>
          <Typography>{userInfo?.email}</Typography>
          <Typography>Posty: {postsAmount}</Typography>
        </Box>
      </Box>
      <Box bgcolor="red">
        {posts?.map(post => <p>{post.url}</p>)}
      </Box>
    </Box >
  )
}

export default SpecificUser