export default function htmlToMarkdown(html) {
    // Replace or customize this conversion logic based on your needs
    const conversions = [
      { regex: /<h1>(.*?)<\/h1>/g, replacement: '# $1' },
      { regex: /<h2>(.*?)<\/h2>/g, replacement: '## $1' },
      { regex: /<h3>(.*?)<\/h3>/g, replacement: '### $1' },
      { regex: /<h4>(.*?)<\/h4>/g, replacement: '#### $1' },
      { regex: /<h5>(.*?)<\/h5>/g, replacement: '##### $1' },
      { regex: /<h6>(.*?)<\/h6>/g, replacement: '###### $1' },
      { regex: /<p>(.*?)<\/p>/g, replacement: '$1\n' },
      { regex: /<br\s*\/?>/g, replacement: '\n' },
      { regex: /<strong>(.*?)<\/strong>/g, replacement: '**$1**' },
      { regex: /<em>(.*?)<\/em>/g, replacement: '_$1_' },
      { regex: /<a href="(.*?)">(.*?)<\/a>/g, replacement: '[$2]($1)' },
      // Add more conversion rules as needed
    ];
  
    let markdown = html;
  
    // Apply conversions
    conversions.forEach((conversion) => {
      markdown = markdown.replace(conversion.regex, conversion.replacement);
    });
  
    // Remove any remaining HTML tags
    markdown = markdown.replace(/<[^>]*>/g, '');
  
    return markdown.trim();
  }
  
  // Example usage:
  const htmlContent = '<h1>Hello World</h1><p>This is a <strong>sample</strong> HTML content.</p>';
  const markdownContent = htmlToMarkdown(htmlContent);
  console.log(markdownContent);
  