import { cloneDeep } from 'lodash';
import codeSVG from '@plone/volto/icons/code.svg';
import showcaseSVG from '@plone/volto/icons/showcase.svg';

// Blocks - CodeBlock
import CodeBlockView from './components/Blocks/Code/View';
import CodeBlockEdit from './components/Blocks/Code/Edit';

// Blocks - MermaidBlock
import MermaidBlockEdit from './components/Blocks/Mermaid/Edit';
import MermaidBlockView from './components/Blocks/Mermaid/View';

// Blocks - GistBlock
import GistBlockEdit from './components/Blocks/Gist/Edit';
import GistBlockView from './components/Blocks/Gist/View';

import './theme/main.less';
import './theme/theme-dark.less';
import './theme/theme-light.less';

const applyConfig = (config) => {
  config.blocks.blocksConfig.codeBlock = {
    id: 'codeBlock',
    title: 'Code Block',
    icon: codeSVG,
    group: 'text',
    view: CodeBlockView,
    edit: CodeBlockEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    blockHasOwnFocusManagement: true,
    defaultLanguage: 'python',
    defaultStyle: 'dark',
  };

  config.blocks.blocksConfig.mermaidBlock = {
    id: 'mermaidBlock',
    title: 'Mermaid Diagram',
    icon: showcaseSVG,
    group: 'text',
    view: MermaidBlockView,
    edit: MermaidBlockEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 0,
    blockHasOwnFocusManagement: true,
  };

  config.blocks.blocksConfig.gistBlock = {
    id: 'gistBlock',
    title: 'Gist Block',
    icon: codeSVG,
    group: 'text',
    view: GistBlockView,
    edit: GistBlockEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    blockHasOwnFocusManagement: false,
  };

  config.settings['codeBlock'] = {
    languages: {
      plain: { label: 'Plaintext', language: 'plaintext' },
      bash: { label: 'Bash', language: 'bash' },
      css: { label: 'CSS', language: 'css' },
      dockerfile: { label: 'Dockerfile', language: 'docker' },
      javascript: { label: 'JavaScript', language: 'javascript' },
      typescript: { label: 'TypeScript', language: 'typescript' },
      jsx: { label: 'JSX', language: 'jsx' },
      tsx: { label: 'TSX', language: 'tsx' },
      json: { label: 'JSON', language: 'json' },
      less: { label: 'LESS', language: 'less' },
      markdown: { label: 'Markdown', language: 'markdown' },
      mermaid: { label: 'Mermaid', language: 'mermaid' },
      nginx: { label: 'nginx', language: 'nginx' },
      python: { label: 'Python', language: 'python' },
      scss: { label: 'SCSS', language: 'scss' },
      yaml: { label: 'Yaml', language: 'yaml' },
      xml: { label: 'XML', language: 'xml' },
    },
  };

  // Add Blocks to gridBlock and accordionBlock
  // It's important to maintain the chain, and do not introduce pass by reference in
  // the internal `blocksConfig` object, so we clone the object to avoid this.
  ['gridBlock', 'accordion'].forEach((blockId) => {
    const block = config.blocks.blocksConfig[blockId];
    if (
      block !== undefined &&
      block.allowedBlocks !== undefined &&
      block.blocksConfig !== undefined
    ) {
      block.allowedBlocks = [
        ...block.allowedBlocks,
        'codeBlock',
        'mermaidBlock',
        'gistBlock',
      ];
      block.blocksConfig.codeBlock = cloneDeep(
        config.blocks.blocksConfig.codeBlock,
      );
      block.blocksConfig.mermaidBlock = cloneDeep(
        config.blocks.blocksConfig.mermaidBlock,
      );
      block.blocksConfig.gistBlock = cloneDeep(
        config.blocks.blocksConfig.gistBlock,
      );
    }
  });

  return config;
};

export default applyConfig;
