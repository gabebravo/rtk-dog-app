import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import axios from 'axios';
import {
  setBreedData,
  selectDogs,
} from './dashboardReducer';

export default function Dogs() {
  const breedsList = useSelector(selectDogs);
  const dispatch = useDispatch();

  // API CALL TO GET ALL BREEDS
  const fetchBreedData = () => axios.get('https://dog.ceo/api/breeds/list/all');
  const { status, data, error, isFetching } = useQuery('fetchBreedData', fetchBreedData, { staleTime: 60000 })

  useEffect(() => {
    if(status === 'success') {
      dispatch(setBreedData(data?.data?.message))
    }
  }, [status])


  console.log('breedsList', breedsList)
  return status === 'loading' ? (
    <span>Loading...</span>
  ) : status === 'error' ? (
    <span>{String(error) || 'An error occured'}</span>
  ) : (
    <>
      {isFetching ? <div>Refreshing...</div> : null}

      <div>
        <h3>Data here</h3>
      </div>
    </>
  )
}
