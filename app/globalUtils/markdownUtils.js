import {debug} from '@/app/utils/debug'
 
export function processMarkdown(rawMarkdownContent) {
  ///we want to delete all code blocks before parsing the h1s 
  const markdownContent = rawMarkdownContent.replace(/```[\s\S]*?```/g, '')
    const lines = markdownContent.split('\n');
    // Regular expression to match Markdown headings
    const headingRegex = /^(#{1,6})\s+(.+)$/;
    // Array to store heading objects
    const headingsArray = [];
    // Process each line and extract heading information
    lines.forEach(line => {
      const match = line.match(headingRegex);
      if (match) {
        const depth = match[1].length; // Number of '#' characters indicates the heading depth
        let text = match[2].trim().replace(/\*/g, '');
     
         // Extract the text content of the heading
        // const link = '#' + text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');  
        const link = '#' + text.toLowerCase().replace(/[^a-z\s]/g, '').trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');  

        headingsArray.push({ level: depth, text, link});
      }
    });
    debug(headingsArray)
    return headingsArray;
  }