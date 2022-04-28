import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Results from './Results'
import useBreedList from "./useBreedList";
import changeAnimal from "./actionCreators/changeAnimal";
import changeBreed from "./actionCreators/changeBreed";
import changeLocation from "./actionCreators/changeLocation";
import changeTheme from "./actionCreators/changeTheme";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
const COLORS = ["peru", "darkblue", "chartreuse", "mediumorchid"]

const SearchParams = () => {
  const animal = useSelector(state => state.animal)
  const location = useSelector(state => state.location)
  const breed = useSelector(state => state.breed)
  const theme = useSelector(state => state.theme)
  const dispatch = useDispatch() // currying: 讓dispatch可以接受參數並呼叫action

  // 不引進整個state的原因是useSelector選出來的值一旦變動 就會造成searchParams re-render
  // 這表示即使是searchParams沒有用到的state屬性 變動後也會導致其re-render
  // 因此善用useSelector可以優化效能 並 讓react可以明確知道何時要re-render
  // const state = useSelector(state => state)

  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);

  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
    console.log('執行requestPets', json.pets, pets)
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          console.log('form onsubmit')
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => dispatch(changeLocation(e.target.value))}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              dispatch(changeAnimal(e.target.value))
            }}
            onBlur={(e) => {
              dispatch(changeAnimal(e.target.value))
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={(e) => dispatch(changeBreed(e.target.value))}
            onBlur={(e) => dispatch(changeBreed(e.target.value))}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="color">
          Color
          <select
            id="color"
            value={theme}
            onChange={(e) => dispatch(changeTheme(e.target.value))}
            onBlur={(e) => dispatch(changeTheme(e.target.value))}
          >
            {
              COLORS.map(color => (
                <option key={color} value={color}>{color}</option>
              ))
            }
          </select>
        </label>
        <button style={{backgroundColor: theme}}>Submit</button>
      </form>
      <Results pets={pets}/>
    </div>
  );
};

export default SearchParams;