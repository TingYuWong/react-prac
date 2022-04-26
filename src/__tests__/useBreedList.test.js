/**
 * @jest-environment jsdom
 */

import { expect, jest } from '@jest/globals'
import  { renderHook } from '@testing-library/react-hooks'
import useBreedList from '../useBreedList'

test("gives an empty list with no animal", async () => {
  // 用react-hook後只需要import reactHook 寫這兩行
  const { result } = renderHook(() => useBreedList())
  const [breedList, status] = result.current
  expect(breedList).toHaveLength(0)
  expect(status).toBe('unloaded')
})

// test("gives back breedList with animal", async () => {
//   const breeds = [
//     "Havanese",
//     "Bichon Frise",
//     "Poodle",
//     "Maltese",
//     "Golden Retriever",
//     "Labrador",
//     "Husky",
//   ]

//   fetch.mockResponseOnce(
//     JSON.stringify({
//       animals: 'dog',
//       breeds,
//     })
//   )

//   const { result, waitForNextUpdate } = renderHook(() => useBreedList('dog'))
//   const [breedList, status] = result.current
//   await waitForNextUpdate()
//   // expect(status).toBe('loaded')
//   expect(breedList).toEqual(breeds)
// })

test("gives back breeds with an animal", async () => {
  const breeds = [
    "Havanese",
    "Bichon Frise",
    "Poodle",
    "Maltese",
    "Golden Retriever",
    "Labrador",
    "Husky",
  ];

  fetch.mockResponseOnce(
    JSON.stringify({
      animal: "dog",
      breeds,
    })
  );
  
  const { result, waitForNextUpdate } = renderHook(() => useBreedList("dog"));

  await waitForNextUpdate();

  const [breedList, status] = result.current;
  expect(status).toBe("loaded");
  expect(breedList).toEqual(breeds);
});



