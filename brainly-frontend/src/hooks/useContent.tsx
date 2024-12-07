import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BackendURL } from '../config'

export function useContent () {
    const [contents, setContents] = useState([])

    const getContent = async () => {
        axios.get(`${BackendURL}/content`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(res => {
                setContents(res.data.content)
            })
    }

     useEffect(() => {
        getContent()
        let interval = setInterval(() => {
            getContent()
        }, 8 * 1000)

        return () => clearInterval(interval)
     }, [])

  return {contents, getContent}
}

