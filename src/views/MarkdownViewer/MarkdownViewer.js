import React, { useState } from 'react';
import Markdown from 'react-markdown';
import CodeBlock from './code-block';
import { getUrlParams } from './../../common/util';
import 'github-markdown-css';

const DevelopList = () => {
  const [markdownSrc, setMarkdownSrc] = useState('');

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
