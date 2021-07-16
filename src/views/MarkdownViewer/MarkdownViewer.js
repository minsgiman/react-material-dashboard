import React, { useState } from 'react';
import Markdown from 'react-markdown';
import CodeBlock from './code-block';
import { useHistory } from 'react-router-dom';
import { getUrlParams } from './../../common/util';
import { makeStyles } from '@material-ui/styles';
import 'github-markdown-css';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));

const DevelopList = () => {
  const [markdownSrc, setMarkdownSrc] = useState('');
  const history = useHistory();
  const classes = useStyles();
  const urlParams = getUrlParams(window.location.href),
    decodeUrl = decodeURIComponent(urlParams.url);

  if (decodeUrl) {
    import('./../../markdown' + urlParams.url).then(data => {
      fetch(data.default)
        .then(response => response.text())
        .then(text => {
          setMarkdownSrc(text);
        });
    });
  }

  return (
    <div className={classes.root + ' markdown_root'}>
      <h2 className={'dev-title'}>
        <span
          className="upper_dir"
          onClick={() => {
            history.push('/develop');
          }}>
          Develop
        </span>
        <span className="triangle-right"></span>
        <span
          className="up_link"
          onClick={() => {
            history.push(
              `/markdownlist?id=${urlParams.devId}&title=${urlParams.devTitle}`
            );
          }}>
          {urlParams.devTitle}
        </span>
        <span className="triangle-right"></span>
      </h2>
      <div className="markdown_content markdown-body">
        {!markdownSrc && <div>Loading...</div>}
        {markdownSrc && (
          <Markdown
            className="result"
            source={markdownSrc}
            escapeHtml={false}
            renderers={{ code: CodeBlock }}
          />
        )}
      </div>
    </div>
  );
};

export default DevelopList;
