import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store';
export interface IBreeds {
  breeds: string[],
  subBreeds: string[]
};

const initialState: IBreeds = {
  breeds: [],
  subBreeds: []
};

interface IBreed {
  [key: string]: string[];
};

export const breedsSlice = createSlice({
  name: 'breeds',
  initialState,
  reducers: {
    setBreeds: (state, action: PayloadAction<IBreed>) => {
      const dogs = Object.keys(action.payload).reduce((acc: IBreeds, key: string) => {
        action.payload[key].length > 0 ? acc.subBreeds.push(key) : acc.breeds.push(key)
        return acc
      }, { 
        breeds: [],
        subBreeds: []
      })
      state.breeds = dogs.breeds;
      state.subBreeds = dogs.subBreeds;
    },
  },
});

// export actions to dispatch from components
export const { setBreeds } = breedsSlice.actions;

// THUNK ASYNC EXAMPLE
// export const fetchBreeds = (): AppThunk => async dispatch => {
//   const allBreeds = await fetch('https://dog.ceo/api/breeds/list/all')
//   const { message } = await allBreeds.json()

  // const breeds = Object.keys(message).reduce((acc: IBreed, breed) => {
  //   if(message[breed].length > 0) {
  //     acc[breed] = message[breed]
  //   }
  //   return acc
  // }, {})

//   dispatch(setBreeds(breeds))
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const breeds = (state: RootState) => state.dashboard.breeds;
export const subBreeds = (state: RootState) => state.dashboard.subBreeds;

export default breedsSlice.reducer;
