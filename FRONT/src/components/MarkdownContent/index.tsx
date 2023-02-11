import React from 'react';

import { marked } from 'marked';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';

import { Container } from './styles';
import 'highlight.js/styles/github-dark.css';

interface MarkdownContentProps {
	content: string;
}

export const MarkdownContent = ({ content }: MarkdownContentProps) => {
	const renderer = new marked.Renderer();
	renderer.code = (code, language) => {
		const codeHighlight = hljs.highlight(code, {
			language: language || 'text',
			ignoreIllegals: true,
		}).value;
		return `<pre><code class="hljs ${language}">${codeHighlight}</code></pre>`;
	};

	const html = marked(content, { renderer });
	const purifiedHtml = DOMPurify.sanitize(html);

	return <Container dangerouslySetInnerHTML={{ __html: purifiedHtml }} />;
};
