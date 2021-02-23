import React, { useState, useEffect, ReactElement } from 'react'
import { useSelector } from 'react-redux';
import { breeds, breedNames, subBreeds } from '../../redux/breedsReducer';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import shortId from 'short-uuid'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    marginRight: theme.spacing(5),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function BreedPicker(): ReactElement {
  const allBreedsObj = useSelector(breeds);
  const breedList = useSelector(breedNames);
  const subBreedList = useSelector(subBreeds);
  const [breed, setBreed] = useState('');
  const [subBreed, setSubBreed] = useState('');
  const classes = useStyles();

  useEffect(() => {
    if(!subBreedList.includes(breed)) {
      // Not a sub breed >> GET PICS
    }
  }, [breed])

  useEffect(() => {
    // sub breed >> GET PICS
  }, [subBreed])

  const handleBreed = (event: React.ChangeEvent<{ value: unknown }>) => {
    setBreed(event.target.value as string);
  };

  const handleSubBreed = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSubBreed(event.target.value as string);
  };

  return (
    <div>
      <h2>Dog Breed Picker</h2>
      <FormControl className={classes.formControl}>
        <Select
          value={breed}
          onChange={handleBreed}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="" disabled>
            Breeds
          </MenuItem>
          {
            breedList.map(breed => <MenuItem key={shortId.generate()} value={breed}>{breed}</MenuItem>)
          }
        </Select>
        <FormHelperText>Pick A Breed</FormHelperText>
      </FormControl>
      {
        subBreedList.includes(breed) && (
        <FormControl className={classes.formControl}>
          <Select
            value={subBreed}
            onChange={handleSubBreed}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="" disabled>
              Sub Breeds
            </MenuItem>
            {
              allBreedsObj[breed].map(breed => <MenuItem key={shortId.generate()} value={breed}>{breed}</MenuItem>)
            }
          </Select>
          <FormHelperText>Pick A Sub Breed</FormHelperText>
        </FormControl>
        )
      }
    </div>
  );
}
