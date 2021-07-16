import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getUrlParams } from './../../common/util';
import dataMap from './../Videos/map';

const VideoViewer = () => {
  const urlParams = getUrlParams(window.location.href);
  const history = useHistory();
  const [isLoadFinish, setIsLoadFinish] = useState(false);
  let videoUrl = '',
    title = '';

  dataMap.some(data => {
    if (data.id === urlParams.id) {
      videoUrl = data.videoUrl;
      title = data.title;
      return true;
    }
  });

  function iframeOnLoad() {
    if (!isLoadFinish) {
      setTimeout(() => {
        setIsLoadFinish(true);
      }, 100);
    }
  }

  return (
    <div className="photos_cont">
      <div className="photo_title_wrap">
        <span
          className="upper_dir"
          onClick={() => {
            history.push('/videos');
          }}>
          Videos
        </span>
        <span className="triangle-right"></span>
        <span className="cur_tit">{title}</span>
      </div>
      <div className={'photos_wrap ' + (isLoadFinish ? '' : 'hide')}>
        <iframe src={videoUrl} onLoad={iframeOnLoad}></iframe>
      </div>
      {!isLoadFinish && (
        <img className="loading" src="/images/progress_rolling_blue.svg"></img>
      )}
    </div>
  );
};

export default VideoViewer;
