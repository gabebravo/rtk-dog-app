import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';

type TBreed = string
interface IBreeds {
  [key: string]: string[];
};
type TBreedImgs = string[]
type TBreedImgGallery = string[]

type IBreedState = {
  breeds: IBreeds
  breedImages: TBreedImgs
  breed: TBreed
  gallery: TBreedImgGallery
}

const initialState: IBreedState = {
  breeds: {},
  breedImages: [], 
  breed: '',
  gallery: [], 
};

export const breedsSlice = createSlice({
  name: 'breeds',
  initialState,
  reducers: {
    setBreed: (state, action: PayloadAction<TBreed>) => {
      state.breed = action.payload;
    },
    setBreeds: (state, action: PayloadAction<IBreeds>) => {
      state.breeds = action.payload;
    },
    setBreedImages: (state, action: PayloadAction<TBreedImgs>) => {
      state.breedImages = [...action.payload];
    },
    setGalleryImg: (state, action: PayloadAction<string>) => {
      state.gallery = [...state.gallery, action.payload];
    },
    removeGalleryImg: (state, action: PayloadAction<string>) => {
      state.gallery = [...state.gallery].filter(img => img !== action.payload);
    },
  },
});

// export actions to dispatch from components
export const { setGalleryImg, removeGalleryImg, setBreed, setBreeds, setBreedImages } = breedsSlice.actions;

// THUNK ASYNC EXAMPLE
export const fetchBreedImages = (breed: string): AppThunk => async dispatch => {
  if(breed) {
    const allImages = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
    const { message } = await allImages.json()
    dispatch(setBreedImages(message))
    dispatch(setBreed(breed))
  }
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const breed = (state: RootState) => state.dogs.breed;
export const breeds = (state: RootState) => state.dogs.breeds;
export const gallery = (state: RootState) => state.dogs.gallery;
export const breedImages = (state: RootState) => state.dogs.breedImages;
export const breedNames = (state: RootState) => Object.keys(state.dogs.breeds);
export const subBreeds = (state: RootState) => Object.keys(state.dogs.breeds).filter(key => state.dogs.breeds[key].length);

export default breedsSlice.reducer;