/*
這個customHook 在 SearchParams.js 引入使用
import useBreedList from "./useBreedList";
const [breeds] = useBreedList(animal);
*/

import { useState, useEffect, useDebugValue } from 'react'
import { Animal, BreedListAPIResponse } from './APIResponsesTypes'

const localCache: {
  [index: string]: string[]
} = {}

type Status = "unloaded" | "loading" | "loaded"

export default function useBreedList(animal: Animal) {

  const [breedList, setBreedList] = useState([] as string[])
  const [status, setStatus] = useState('unloaded' as Status)

  useDebugValue('localCache length: ' + Object.keys(localCache))

  useEffect(() => {
    
    if(!animal) {
      setBreedList([])
    } else if(localCache[animal]) {
      setBreedList(localCache[animal])
    } else {
      requestBreedList(animal)
    }

    async function requestBreedList(animal: string) {
      setBreedList([])
      setStatus('unloaded')
      const res = await fetch(`http://pets-v2.dev-apis.com/breeds?animal=${animal}`)
      const json = (await res.json()) as BreedListAPIResponse
      localCache[animal] = json.breeds || []
      setBreedList(localCache[animal])
      setStatus('loaded')
    }

  }, [animal])

  return [breedList, status]
  
}

