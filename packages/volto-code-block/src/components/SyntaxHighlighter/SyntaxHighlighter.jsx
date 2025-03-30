import React, { useEffect, useState } from 'react';
import { getHighlighter } from 'shiki';
import config from '@plone/volto/registry';

import cx from 'classnames';

const SyntaxHighlighter = (props) => {
  const { language, code, showLineNumbers, lineNbr } = props;
  const className = cx(`language-${language}`, {
    'line-numbers': showLineNumbers,
  });
  const allLanguages = config.settings.codeBlock.languages;
  const [highlighter, setHighlighter] = useState(null);

  useEffect(() => {
    const loadHighlighter = async () => {
      const highlighter = await getHighlighter({ theme: 'nord' });
      setHighlighter(highlighter);
    };

    loadHighlighter();
  }, []);

  useEffect(() => {
    if (highlighter) {
      highlighter.codeToHtml(code, { lang: language });
    }
  }, [highlighter, code, language]);

  return (
    <pre className={className} data-start={lineNbr}>
      <code dangerouslySetInnerHTML={{ __html: highlighter ? highlighter.codeToHtml(code, { lang: language }) : code }} />
    </pre>
  );
};

export default SyntaxHighlighter;
