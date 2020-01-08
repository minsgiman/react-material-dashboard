import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/scss/image-gallery.scss';
import { getUrlParams } from './../../common/util';
import dataMap from './../Photos/map';

const PhotoViewer = () => {
  const urlParams = getUrlParams(window.location.href);
  const [isLoadFinish, setIsLoadFinish] = useState(false);
  const history = useHistory();
  let images = [], title = '';

  dataMap.some((data) => {
    if (data.id === urlParams.id) {
      images = data.images;
      title = data.title;
      return true;
    }
  });

  images.map((image) => {
    if (!image.thumbnail) {
      image.thumbnail = image.original
    }
  });

  function onImageLoad() {
    if (!isLoadFinish) {
      setTimeout(() => {
        setIsLoadFinish(true);
      }, 100);
    }
  }

  return (
    <div className="photos_cont">
      <div className="photo_title_wrap">
        <span className="upper_dir" onClick={() => {history.push('/photos')}}>Photos</span>
        <span className="triangle-right"></span>
        <span className="cur_tit">{title}</span>
      </div>
      <div className={'photos_wrap ' + (isLoadFinish ? '' : 'hide')}>
        <ImageGallery items={images}
          showNav={false}
          onImageLoad={onImageLoad}/>
      </div>
      {!isLoadFinish && <img className="loading" src="/images/progress_rolling_blue.svg"></img>}
    </div>
  );
};

export default PhotoViewer;
