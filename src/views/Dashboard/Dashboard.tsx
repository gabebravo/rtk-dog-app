import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import axios from 'axios';
import { setBreeds } from '../../redux/breedsReducer';
import Panels from './Panels'

export default function Dogs() {
  const dispatch = useDispatch();

  // API CALL TO GET ALL BREEDS
  const fetchBreedData = () => axios.get('https://dog.ceo/api/breeds/list/all');
  const { status, data, error, isFetching } = useQuery('fetchBreedData', fetchBreedData, { staleTime: 60000 })

  useEffect(() => {
    if(status === 'success') {
      dispatch(setBreeds(data?.data?.message))
    }
  }, [status])

  return status === 'loading' ? (
    <span>Loading...</span>
  ) : status === 'error' ? (
    <span>{String(error) || 'An error occured'}</span>
  ) : (
    <>
      {isFetching ? <div>Refreshing...</div> : null}
      <div>
        <Panels />
      </div>
    </>
  )
}
