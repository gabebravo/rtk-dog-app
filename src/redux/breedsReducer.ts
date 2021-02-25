import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';
interface IBreeds {
  [key: string]: string[];
};
type IBreedImgs = string[]

type IBreedState = {
  breeds: IBreeds
  breedImages: IBreedImgs
}

const initialState: IBreedState = {
  breeds: {},
  breedImages: []
};

export const breedsSlice = createSlice({
  name: 'breeds',
  initialState,
  reducers: {
    setBreeds: (state, action: PayloadAction<IBreeds>) => {
      state.breeds = action.payload;
    },
    setBreedImages: (state, action: PayloadAction<string[]>) => {
      state.breedImages = [...action.payload];
    },
  },
});

// export actions to dispatch from components
export const { setBreeds, setBreedImages } = breedsSlice.actions;

// THUNK ASYNC EXAMPLE
export const fetchBreedImages = (breed: string): AppThunk => async dispatch => {
  if(breed) {
    const allImages = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
    const { message } = await allImages.json()
    dispatch(setBreedImages(message))
  }
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const breeds = (state: RootState) => state.dogs.breeds;
export const breedImages = (state: RootState) => state.dogs.breedImages;
export const breedNames = (state: RootState) => Object.keys(state.dogs.breeds);
export const subBreeds = (state: RootState) => Object.keys(state.dogs.breeds).filter(key => state.dogs.breeds[key].length);

export default breedsSlice.reducer;