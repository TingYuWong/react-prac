import Pet from './Pet'
import { FunctionComponent } from 'react'
import { Pet as PetType } from './APIResponsesTypes'

interface Props {
  [pets: string]: PetType[]
}

const Results: FunctionComponent<Props> =  ({ pets }) => {

  return ( 
    <div>
      {
        (!pets.length) ? (
          <h1>No Pets Found</h1>
        ) : (
          pets.map(pet => (
            <Pet
              key={pet.id}
              id={pet.id}
              images={pet.images}
              location={`${pet.city}, ${pet.state}`}
              name={pet.name}
              animal={pet.animal}
              breed={pet.breed}
            />
          ))
        )
      }
    </div>
  )
}

export default Results


