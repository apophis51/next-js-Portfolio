export function parseFrontmatter(mdContent) {
    const frontmatterRegex = /^---\n([\s\S]+?)\n---/;
    const match = mdContent.match(frontmatterRegex);
    
    if (match) {
        const frontmatterContent = match[1];
        const content = mdContent.slice(match[0].length).trim();
        
        const frontmatter = frontmatterContent.split('\n').reduce((acc, line) => {
            const [key, ...rest] = line.split(':');
            acc[key.trim()] = rest.join(':').trim();
            return acc;
        }, {});
        
        return { frontmatter, content };
    }
    
    return { frontmatter: null, content: mdContent.trim() };
}

// Example usage:
const markdownString = `---
title: RSC Frontmatter Example
description: This is an example of frontmatter parsing.
date: 2023-06-08
---
# Hello World
This is from the frontmatter parser!`;

const { frontmatter, content } = parseFrontmatter(markdownString);
console.log('Frontmatter:', frontmatter);
console.log('Content:', content);
