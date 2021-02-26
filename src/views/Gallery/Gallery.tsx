import React, {ReactElement, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import { useSelector, useDispatch } from 'react-redux';
import { removeGalleryImg, gallery } from '../../redux/breedsReducer';

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

export default function Gallery(): ReactElement {
  const classes = useStyles();
  const [modalImg, setModalImg] = useState('');
  const imgGallery = useSelector(gallery);
  const dispatch = useDispatch()

  const removeImg = (dog: string): void => {
    dispatch(removeGalleryImg(dog))
  }

  const showModal = (imgSrc: string): void => {
    setModalImg(imgSrc)
  }
  
  // TODO : ADD ON IMG CLICK MAKE LARGER SAMPLE
    return (
      <div className={classes.root}>
        <h2>Dog Breed Gallery</h2>
        <GridList cellHeight={180}>
          {imgGallery.length && imgGallery.map((dog: string) => (
            <GridListTile key={dog}>
              <img src={dog} alt={dog} onClick={() => showModal(dog)}/>
              <GridListTileBar
                actionIcon={
                  <IconButton 
                    onClick={() => removeImg(dog)}
                    aria-label={`add dogo ${dog}`} 
                    className={classes.icon}>
                    <CancelIcon />
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


