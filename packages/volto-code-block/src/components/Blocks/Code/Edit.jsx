import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import { SidebarPortal } from '@plone/volto/components';
import config from '@plone/volto/registry';
import CodeBlockData from './Data';
import Caption from '../../Caption/Caption.jsx';
import Editor from '../../Editor/Editor.tsx';
import { getHighlighter } from 'shiki';

const CodeBlockEdit = (props) => {
  const { data, selected, block, onChangeBlock } = props;
  const [code, setCode] = React.useState(data.code || '');
  const className = `code-block-wrapper edit ${data.style}`;
  const codeBlockConfig = config.blocks?.blocksConfig?.codeBlock;
  const defaultLanguage = codeBlockConfig?.defaultLanguage;
  const defaultStyle = codeBlockConfig?.defaultStyle;
  if (data.language === undefined) {
    data.language = defaultLanguage;
    data.style = defaultStyle;
  }
  const allLanguages = config.settings.codeBlock.languages;
  const language = allLanguages[data.language].language;
  const { caption_title, caption_description } = data;
  const handleChange = (code) => {
    setCode(code);
    onChangeBlock(block, { ...data, code: code });
  };

  const highlightCode = async (code) => {
    const highlighter = await getHighlighter({ theme: data.style });
    return highlighter.codeToHtml(code, { lang: data.language });
  };

  return (
    <div className="block code">
      <div className={className}>
        <Editor
          value={code}
          onValueChange={(code) => handleChange(code)}
          highlight={(code) => highlightCode(code)}
          padding={10}
          preClassName={`code-block-wrapper ${data.style} language-${data.language}`}
        />
        {caption_title && (
          <Caption title={caption_title} description={caption_description} />
        )}
        <SidebarPortal selected={selected}>
          <CodeBlockData {...props} />
        </SidebarPortal>
      </div>
    </div>
  );
};

export default withBlockExtensions(CodeBlockEdit);
