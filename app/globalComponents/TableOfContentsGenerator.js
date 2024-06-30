
//Inspired by https://daisyui.com/components/menu/
/* test urls
http://localhost:3000/ProgrammingBlogs/how-do-you-customize-your-reactmarkdown-components#how-do-you-customize-your-reactmarkdown-components
http://localhost:3000/ProgrammingBlogs/ffuf---hacker-tools#no-404-status
http://localhost:3000/ProgrammingBlogs/how-do-you-make-a-toc-table-of-contents-sidebar
http://localhost:3000/ProgrammingBlogs/learn-websockets#want-to-learn-more
http://localhost:3000/ProgrammingBlogs/how-do-you-integrate-stripe-with-nextjs 
*/


const ListWrapper = ({ children }) => {
    return (
      <ul>
        {React.Children.map(children, (child, index) => (
          <li key={index}>{child}</li>
        ))}
      </ul>
    );
  };
  
  export default ListWrapper;


  export function TableOfContentsGenerator({ markdownTOCData }) {   
  
    console.log(markdownTOCData)
    const renderTOC = () => {
      let htmlString = `<ul class="menu bg-base-200 w-56 rounded-box">
      <h3><b>On This Page</b></h3><li><a href=${markdownTOCData[0].link}>${markdownTOCData[0].text}</a></li>`
      markdownTOCData = markdownTOCData.slice(1)

      let levelsOpend = 0 // htmlString += '</ul></details></li>'
      let duplicates = []
      markdownTOCData.map((heading, index, array) => {
        console.log(markdownTOCData[index])
        try {
            console.log(heading)
            let next_is_biggerText = markdownTOCData[index + 1].level < markdownTOCData[index].level
            let next = markdownTOCData[index + 1]
            //let prev_is_equalText = markdownTOCData[index - 1].level == markdownTOCData[index].level
            let next_is_equalText = markdownTOCData[index + 1].level == markdownTOCData[index].level
            let next_is_smallerText = markdownTOCData[index + 1].level > markdownTOCData[index].level
            // the section might get duplicated in equaling text
            if (next_is_smallerText && !duplicates.includes(heading.text)) {     //content discovery with recursion No/404
                   console.log(heading.text, next.text)
                   console.log(duplicates.includes(next.text))
                   console.log(duplicates)
                    htmlString += '<li><details open>'
                    htmlString +=    `<summary><a href=${heading.link}>${heading.text}</a></summary>`
                    htmlString += '<ul>'    
                    levelsOpend++       
           }
            else if (next_is_equalText) { // Ty in the terminal
                    console.log(heading.text)
                   if(!duplicates.includes(heading.text)){
                   htmlString += `<li><a href=${heading.link}>${heading.text.replace(/:$/g, '')}</a></li>`
                   }
                   if(!duplicates.includes(next.text)){
                   htmlString += `<li><a href=${next.link}>${next.text.replace(/:$/g, '')}</a></li>`
                   }
                   duplicates.push(heading.text)
                   duplicates.push(next.text)
            }
            else if (next_is_biggerText) {
                console.log(heading.text)
                while(levelsOpend > 0) {
                    console.log('hit promo')
                    htmlString += '</ul></details></li>'
                    levelsOpend--
                }
                // htmlString += `<li><a href=${next.link}>${next.text}</a></li>`
            }
            else {
                console.log(heading.text)
                // htmlString += `<li><a href=${heading.link}>${heading.text}</a></li>`
            }
        }
        catch(error) {
            console.log(error)
            console.log(heading.text)
            while(levelsOpend > 0) {
                console.log('hit promo')
                htmlString += '</ul></details></li>'
                levelsOpend--
            }
            // htmlString += `<li><a href=${heading.link}>${heading.text}</a></li>`
            // htmlString += '<li>'
        }
        
    });
      console.log(htmlString)
      return htmlString ;
    };
  
    return <div dangerouslySetInnerHTML={{ __html: renderTOC() }} />;
  };


  export function TableOfConttentsGeneratorDepricated({ markdownTOCData }) {   
  
    console.log(markdownTOCData)
    const renderTOC = () => {
      let htmlString = `<ul class="menu bg-base-200 w-56 rounded-box">
      <h3><b>On This Page</b></h3>`
      
      let levelsOpend = 0 // htmlString += '</ul></details></li>'
      markdownTOCData.map((heading, index, array) => {
        console.log(markdownTOCData[index])
        try {
            console.log(heading)
            let last_was_biggerText = markdownTOCData[index - 1].level < markdownTOCData[index].level
            let last_was_equalText = markdownTOCData[index - 1].level == markdownTOCData[index].level
            let last_was_smallerText = markdownTOCData[index - 1].level > markdownTOCData[index].level
            if (last_was_biggerText) {     //content discovery with recursion No/404
                   console.log(heading.link)
                    htmlString += '<li><details open>'
                    htmlString +=    `<summary><a href=${heading.link}>${heading.text}</a></summary>`
                    htmlString += '<ul>'    
                    levelsOpend++       
           }
            else if (last_was_equalText) { // Ty in the terminal
                    console.log(heading.text)
                   htmlString += `<li><a href=${heading.link}>${heading.text}</a></li>`
            }
            else if (last_was_smallerText) {
                console.log(heading.text)
                while(levelsOpend > 0) {
                    console.log('hit promo')
                    htmlString += '</ul></details></li>'
                    levelsOpend--
                }
                htmlString += `<li><a href=${heading.link}>${heading.text}</a></li>`
            }
            else {
                console.log(' we are doing nothing')
            }
        }
        catch(error) {
            console.log(error)
            console.log(heading.text)

            htmlString += `<li><a href=${heading.link}>${heading.text}</a></li>`
            htmlString += '<li>'
        }
        
    });
      console.log(htmlString)
      return htmlString ;
    };
  
    return <div dangerouslySetInnerHTML={{ __html: renderTOC() }} />;
  };



  export function TableOffContentsGeneratorDepricated({ markdownTOCData }) {   
  
    console.log(markdownTOCData)
    const renderTOC = () => {
      let htmlString = `<ul class="menu bg-base-200 w-56 rounded-box">
      <h3><b>On This Page</b></h3>`
    //   <li><a>Item 1</a></li>
    //   <li>
    //     <details open>
    //       <summary>Parent</summary>
    //       <ul>
    //         <li><a>Submenu 1</a></li>
    //         <li><a>Submenu 2</a></li>
    //         <li>
    //           <details open>
    //             <summary>Parent</summary>
    //             <ul>
    //               <li><a>Submenu 1</a></li>
    //               <li><a>Submenu 2</a></li>
    //             </ul>
    //           </details>
    //         </li>
    //       </ul>
    //     </details>
    //   </li>
    //   <li><a>Item 3</a></li>
  
      
      let tracksToClose = 0
      markdownTOCData.map((heading, index, array) => {
        console.log(markdownTOCData[index])
        try {
            console.log(heading)
            //if the previous header is bigger then the current
            if (markdownTOCData[index - 1].level > markdownTOCData[index].level) {     //content discovery with recursion No/404
                    
                if(markdownTOCData[index + 1].level == markdownTOCData[index].level){  //content discovery with recursion
                    console.log(heading.text)
                    // htmlString += '</ul></details></li>'

                    htmlString += `<li><a href=${heading.link}>${heading.text}</a></li>`
                }
                if(markdownTOCData[index + 1].level > markdownTOCData[index].level){ 
                    console.log(markdownTOCData[index].text) 
                    //No 404 status
                    htmlString += '</ul></details></li>'
                    htmlString += '<li><details open>'
                    htmlString +=    `<summary><a href=${heading.link}>${heading.text}</a></summary>`
                    htmlString += '<ul>' 
                }
        }
            else if (markdownTOCData[index - 1].level < markdownTOCData[index].level) { // Ty in the terminal
                    
                    if(markdownTOCData[index + 1].level == markdownTOCData[index].level){
                        console.log(heading.text)

                        console.log(heading.link)
                        htmlString += `<li><a href=${heading.link}>${heading.text}</a></li>`
                    }
                    if(markdownTOCData[index + 1].level < markdownTOCData[index].level){  
                        console.log(heading.text)

                        htmlString += '<ul>'  //try it in the terminal
                        htmlString += `<li><a href=${heading.link}>${heading.text}</a></li>`
    
                    }
                    if(markdownTOCData[index + 1].level > markdownTOCData[index].level){
                        console.log(heading.text)

                        htmlString += '<li><details open>'
                        htmlString +=    `<summary><a href=${heading.link}>${heading.text}</a></summary>`
                        htmlString += '<ul>' 
                    }
            }
       
            else if ((markdownTOCData[index - 1].level == markdownTOCData[index].level) && (markdownTOCData[index + 1].level > markdownTOCData[index].level)) {
                console.log(heading.text)

                htmlString += '<li><details open>'
                htmlString +=    `<summary><a href=${heading.link}>${heading.text}</a></summary>`
                htmlString += '<ul>' 
            }
            else {
                console.log(heading.text)
                htmlString += `<li><a href=${heading.link}>${heading.text}</a></li>`
            }
            // if (markdownTOCData[index - 1].level == markdownTOCData[index].level) {
            //     htmlString += `<li><a href=${heading.link}>${heading.text}</a></li>`
            // }
            //      if (markdownTOCData[index - 1].level > markdownTOCData[index].level) {
            //     if(markdownTOCData[index - 1].level - markdownTOCData[index].level == 1){
            //     htmlString += '</ul></details></li></ul></details></li>'
            //     htmlString += `<li><a href=${heading.link}>${heading.text}</a></li>`}
            //     if(markdownTOCData[index - 1].level - markdownTOCData[index].level == 2){
            //         htmlString += '</ul></details></li>'
            //         htmlString += '</ul></details></li>'
            //         htmlString += `<li><a href=${heading.link}>${heading.text}</a></li>`}

            // }
        }
        catch(error) {
            console.log(error)
            console.log(heading.text)

            htmlString += `<li><a href=${heading.link}>${heading.text}</a></li>`
            htmlString += '<li>'
        }
        
        //     <li key={index}>
        //         <a href={heading.link}>{heading.text}</a>
        //     </li>)
    });
      console.log(htmlString)
      return htmlString ;
    };
  
    return <div dangerouslySetInnerHTML={{ __html: renderTOC() }} />;
  };



export function TableOfCfontentsGeneratorDepricated({ markdownTOCData }) {

    console.log(markdownTOCData)


    // [
    //     {
    //       level: 1,
    //       text: 'How Do You Customize Your ReactMarkdown Components?',
    //       link: '#how-do-you-customize-your-reactmarkdown-components'
    //     },
    //     { level: 3, text: 'The issue:', link: '#the-issue' },
    //     { level: 3, text: 'The Remedy:', link: '#the-remedy' },
    //     {
    //       level: 2,
    //       text: 'Method 1: Customize Your ReactMarkdown Components by Dom Manipulation',
    //       link: '#method-1-customize-your-reactmarkdown-components-by-dom-manipulation'
    //     },
    //     {
    //       level: 2,
    //       text: 'Method 2: HTML ReactMarkdown Manipulation',
    //       link: '#method-2-html-reactmarkdown-manipulation'
    //     },
    //     {
    //       level: 2,
    //       text: 'Method 3: Markdown Attribute Manipulation',
    //       link: '#method-3-markdown-attribute-manipulation'
    //     },
    //     { level: 1, text: 'CSS Classes{.WARNING}', link: '#css-classeswarning' },
    //     { level: 2, text: 'Id Values{#Updates}', link: '#id-valuesupdates' },
    //     {
    //       level: 2,
    //       text: 'Custom Styling{style="color:darkgoldenrod"}',
    //       link: '#custom-stylingstylecolordarkgoldenrod'
    //     },
    //     { level: 2, text: 'Bonus Section:', link: '#bonus-section' },
    //     { level: 2, text: 'Conclusion', link: '#conclusion' }
    //   ]
    return (
        <ul className="menu bg-base-200 w-56 rounded-box p-0">
            <h3><b>On This Page</b></h3>
            {markdownTOCData.map((heading, index, array) => {
                try {
                    if (markdownTOCData[index - 1].level < markdownTOCData[index].level) {
                        return (dangerouslySetInnerHTML =
                            '<ul>' +
                                <li><a href={heading.link}>{heading.text}</a></li>
                        )
                    }
                    if (markdownTOCData[index - 1].level > markdownTOCData[index].level) {
                        return (
                                '</ul>'
                        )
                    }
                }
                catch { }
                return (
                    <li key={index}>
                        <a href={heading.link}>{heading.text}</a>
                    </li>)
            })}

            <li><a>Item 1</a></li>
            <li>
                <details open>
                    <summary>Parent</summary>
                    <ul>
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                        <li>
                            <details open>
                                <summary>Parent</summary>
                                <ul>
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </details>
            </li>
            <li><a>Item 3</a></li>
        </ul>
    )


    // return (
    //     <div className="table-of-contents">
    //         <h2>Table of Contents</h2>
    //         <ul>
    //             {markdownTOCData.map((heading, index) => (
    //                 <li key={index}>
    //                     <a href={heading.link}>{heading.text}</a>
    //                 </li>
    //             ))}
    //         </ul>
    //     </div>
    // );
}