import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchBreeds,
  selectDogs,
} from './dogSlice';
import styles from './Dogs.module.css';

export default function Dogs() {
  const breeds = useSelector(selectDogs);
  const dispatch = useDispatch();
  // const [incrementAmount, setIncrementAmount] = useState('2');

  useEffect(() => {
    dispatch(fetchBreeds())
  }, [])


  console.log('breeds', breeds)
  return (
    <div>
      <h3>Example</h3>
    </div>
  );
}
