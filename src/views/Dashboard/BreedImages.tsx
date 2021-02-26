import React, {ReactElement, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Dialog from '@material-ui/core/Dialog';
import { useSelector, useDispatch } from 'react-redux';
import { setGalleryImg, gallery, breed, resetPickedBreed, breedImages } from '../../redux/breedsReducer';

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
  unpicked: {
    color: '#FFF',
  },
  picked: {
    color: '#3CB371',
  },
  subHeader: {
    fontSize: '1.5rem'
  }
}));

export default function BreedImages(): ReactElement {
  const classes = useStyles();
  const [modalImg, setModalImg] = useState('');
  const breedName = useSelector(breed);
  const breedImgList = useSelector(breedImages);
  const imgGallery = useSelector(gallery);
  const dispatch = useDispatch()

  // @ts-ignore
  useEffect(() => {
    return () => dispatch(resetPickedBreed())
  }, [])

  const addImg = (dog: string): void => {
    !imgGallery.includes(dog) && dispatch(setGalleryImg(dog))
  }

  const showModal = (imgSrc: string): void => {
    setModalImg(imgSrc)
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
              <img src={dog} alt={dog} onClick={() => showModal(dog)}/>
              <GridListTileBar
                actionIcon={
                  <IconButton 
                    onClick={() => addImg(dog)}
                    aria-label={`add dogo ${dog}`}>
                    { imgGallery.includes(dog) ? <CheckCircleIcon className={classes.picked} /> : <AddIcon className={classes.unpicked} /> }
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
        <Dialog onClose={() => showModal('')} aria-labelledby="simple-dialog-title" open={Boolean(modalImg)}>
          <img src={modalImg} alt={modalImg} />
        </Dialog>
      </div>
    );
  }


