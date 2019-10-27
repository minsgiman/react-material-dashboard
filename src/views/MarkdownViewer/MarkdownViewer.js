import React, { useState } from 'react';
import Markdown from 'react-markdown';
import CodeBlock from './code-block';
import 'github-markdown-css';

const DevelopList = () => {
  const [markdownSrc, setMarkdownSrc] = useState('');

  function getUrlParams (url) {
    var queryString = url.split("?");
    if (queryString.length < 2) {
      return {};
    }
    queryString = queryString[1];

    var keyValuePairs = queryString.split("&");
    var keyValue, params = {};

    keyValuePairs.forEach(function(pair) {
      if (pair) {
        keyValue = pair.split("=");
        if (keyValue.length >= 2) {
          params[keyValue[0]] = decodeURIComponent(keyValue[1]).replace("+", " ");
        }
      }
    });
    return params
  }

  const urlParams = getUrlParams(window.location.href),
        decodeUrl = decodeURIComponent(urlParams.url);

  if (decodeUrl) {
    import('./../../markdown' + urlParams.url).then((data) => {
      fetch(data.default).then((response) => response.text()).then((text) => {
        setMarkdownSrc(text);
      });
    });
  }

  return (
    <div className="markdown_root">
      <div className="markdown_content markdown-body">
        {
          !markdownSrc &&
          <div>Loading...</div>
        }
        {
          markdownSrc &&
          <Markdown
            className="result"
            source={markdownSrc}
            escapeHtml={false}
            renderers={{code: CodeBlock}}
          />
        }
      </div>
    </div>
  );
};

export default DevelopList;
