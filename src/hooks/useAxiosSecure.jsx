import axios from 'axios'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import { useNavigate } from 'react-router-dom'

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  })

  const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { userLogout } = useContext(AuthContext);
    
    useEffect(() => {
      axiosSecure.interceptors.response.use(
        res => {
          return res
        },
        async error => {
          console.log(
            'Caught error from axios interceptor',
            error.response
          )
          if (error.response.status === 401 || error.response.status === 403) {
            // logout
            userLogout()
            // navigate to login
            navigate('/login')
          }
        }
      )
    }, [userLogout, navigate])
    return axiosSecure
  }
  export default useAxiosSecure