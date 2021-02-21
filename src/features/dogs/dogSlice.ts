import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../redux/store';

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

export const dogSlice = createSlice({
  name: 'dogs',
  initialState,
  reducers: {
    setBreed: (state, action: PayloadAction<IBreed>) => {
      console.log('action.payload', action.payload)
      state.breeds = action.payload;
    },
  },
});

export const { setBreed } = dogSlice.actions;

export const fetchBreeds = (): AppThunk => async dispatch => {
  const allBreeds = await fetch('https://dog.ceo/api/breeds/list/all')
  const { message } = await allBreeds.json()

  const breeds = Object.keys(message).reduce((acc: IBreed, breed) => {
    if(message[breed].length > 0) {
      acc[breed] = message[breed]
    }
    return acc
  }, {})

  dispatch(setBreed(breeds))
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectDogs = (state: RootState) => state.dogs;

export default dogSlice.reducer;
