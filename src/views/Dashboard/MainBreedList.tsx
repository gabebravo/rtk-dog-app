import React, { useState, ReactElement } from 'react'
import { useSelector } from 'react-redux';
import { breeds } from './dashboardReducer';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import shortId from 'short-uuid'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function MainBreedList(): ReactElement {
  const breedList = useSelector(breeds);
  const [breed, setBreed] = useState('');
  const classes = useStyles();

  const handleBreed = (event: React.ChangeEvent<{ value: unknown }>) => {
    setBreed(event.target.value as string);
  };

  return (
    <div>
      <h2>Main Dog Breeds</h2>
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
    </div>
  );
}
