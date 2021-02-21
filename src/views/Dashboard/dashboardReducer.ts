import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store';
interface IBreeds {
  breeds: {
    [key: string]: string[];
  }
};

const initialState: IBreeds = {
  breeds: {}
};

interface IBreed {
  [key: string]: string[];
};

export const breedsSlice = createSlice({
  name: 'breeds',
  initialState,
  reducers: {
    setBreeds: (state, action: PayloadAction<IBreed>) => {
      state.breeds = action.payload;
    },
    setBreedData: (state, action: PayloadAction<any>) => {
      state.breeds = action.payload;
    },
  },
});

// export actions to dispatch from components
export const { setBreeds, setBreedData } = breedsSlice.actions;

// THUNK ASYNC EXAMPLE
// export const fetchBreeds = (): AppThunk => async dispatch => {
//   const allBreeds = await fetch('https://dog.ceo/api/breeds/list/all')
//   const { message } = await allBreeds.json()

//   const breeds = Object.keys(message).reduce((acc: IBreed, breed) => {
//     if(message[breed].length > 0) {
//       acc[breed] = message[breed]
//     }
//     return acc
//   }, {})

//   dispatch(setBreeds(breeds))
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectDogs = (state: RootState) => Object.keys(state.dashboard.breeds);

export default breedsSlice.reducer;
