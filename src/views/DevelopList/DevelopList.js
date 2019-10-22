import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import CodeBlock from './code-block';

import frontMd from './../../markdown/frontend/angularjs-digest.md';

const DevelopList = () => {
  const [markdownSrc, setMarkdownSrc] = useState('');

  useEffect(() => {
    fetch(frontMd).then((response) => response.text()).then((text) => {
      setMarkdownSrc(text);
    });
  }, []);

  return (
    <div class="markdown_root">
      <div class="markdown_content">
        <Markdown
          className="result"
          source={markdownSrc}
          escapeHtml={false}
          renderers={{code: CodeBlock}}
        />
      </div>
    </div>
  );
};

export default DevelopList;
