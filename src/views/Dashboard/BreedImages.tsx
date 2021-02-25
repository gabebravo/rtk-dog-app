import React, {ReactElement} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddCircle';
import { useSelector } from 'react-redux';
import { breed, breedImages } from '../../redux/breedsReducer';

// const itemData = [
//   {
//     img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//     title: 'Breakfast',
//     author: '@bkristastucchio',
//   },
// ];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    '& .MuiGridListTileBar-root': {
      background: 'none'
    }
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: '#FFF',
  },
  subHeader: {
    fontSize: '1.5rem'
  }
}));

interface Props {
  
}

export default function BreedImages({}: Props): ReactElement {
  const classes = useStyles();
  const breedName = useSelector(breed);
  const breedImgList = useSelector(breedImages);

  const addImg = (dog: string): void => {
    console.log('img', dog)
  }
  
  // TODO : ADD ON IMG CLICK MAKE LARGER SAMPLE
    return (
      <div className={classes.root}>
        <h2>Dog Breed Images</h2>
        <GridList cellHeight={180}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div" className={classes.subHeader}>{breedName}</ListSubheader>
          </GridListTile>
          {breedImgList.length && breedImgList.map((dog: string) => (
            <GridListTile key={dog}>
              <img src={dog} alt={dog} />
              <GridListTileBar
                actionIcon={
                  <IconButton 
                    onClick={() => addImg(dog)}
                    aria-label={`add dogo ${dog}`} 
                    className={classes.icon}>
                    <AddIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }


