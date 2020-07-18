import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import "video-react/dist/video-react.css";
import { Player, BigPlayButton, LoadingSpinner } from 'video-react';
import { getUrlParams } from './../../common/util';
import dataMap from './../Videos/map';

const VideoViewer = () => {
  const urlParams = getUrlParams(window.location.href);
  const history = useHistory();
  let videoUrl = '', title = '', thumbnailUrl = '';

  dataMap.some((data) => {
    if (data.id === urlParams.id) {
      videoUrl = data.videoUrl;
      thumbnailUrl = data.thumbnailUrl;
      title = data.title;
      return true;
    }
  });

  return (
    <div className="photos_cont">
      <div className="photo_title_wrap">
        <span className="upper_dir" onClick={() => {history.push('/videos')}}>Videos</span>
        <span className="triangle-right"></span>
        <span className="cur_tit">{title}</span>
      </div>
      <div className={'photos_wrap'}>
        <Player
          playsInline
          poster={thumbnailUrl}
          src={videoUrl}>
          <BigPlayButton position="center" />
          <LoadingSpinner />
        </Player>
      </div>
    </div>
  );
};

export default VideoViewer;
