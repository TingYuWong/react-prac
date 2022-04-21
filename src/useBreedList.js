/*
這個customHook 在 SearchParams.js 引入使用
import useBreedList from "./useBreedList";
const [breeds] = useBreedList(animal);
*/

import { useState, useEffect, useDebugValue } from 'react'

const localCache = {}

export default function useBreedList(animal) {

  const [breedList, setBreedList] = useState([])
  const [status, setStatus] = useState('unloaded')

  useDebugValue('localCache length: ' + Object.keys(localCache))

  useEffect(() => {
    
    if(!animal) {
      setBreedList([])
    } else if(localCache[animal]) {
      setBreedList(localCache[animal])
    } else {
      requestBreedList(animal)
    }

    async function requestBreedList(animal) {
      setBreedList([])
      setStatus('unloaded')
      const res = await fetch(`http://pets-v2.dev-apis.com/breeds?animal=${animal}`)
      const json = res.json()
      localCache[animal] = json.breeds || []
      setBreedList(localCache[animal])
      setStatus('loaded')
    }

  }, [animal])

  return [breedList, status]
  
}

