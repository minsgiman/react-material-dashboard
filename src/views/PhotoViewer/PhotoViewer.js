import React, {useState} from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/scss/image-gallery.scss';

const PhotoViewer = () => {
  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ];
  const [isLoadFinish, setIsLoadFinish] = useState(false);

  function onImageLoad(event) {
    if (!isLoadFinish) {
      setTimeout(() => {
        setIsLoadFinish(true);
      }, 100);
    }
  }

  return (
    <div className="photos_cont">
      <div className="photo_title_wrap">
        <span className="upper_dir">Photos</span>
        <span className="triangle-right"></span>
        <span className="cur_tit">This is Title</span>
      </div>
      <div className={"photos_wrap " + (isLoadFinish ? '' : 'hide')}>
        <ImageGallery items={images}
                      showNav={false}
                      onImageLoad={onImageLoad}/>
      </div>
      {!isLoadFinish && <img className="loading" src="/images/progress_rolling_blue.svg"></img>}
    </div>
  );
};

export default PhotoViewer;
