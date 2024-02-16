
//Inspired by https://daisyui.com/components/menu/



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
            //loging
            if(markdownTOCData[index].text == "Content Discovery With Recursion")
            {
                console.log("Basic Content Discovery")
                console.log(markdownTOCData[index].level)
                console.log(markdownTOCData[index + 1].level)
                console.log(markdownTOCData[index - 1].level) 

                //Basic Content discovery           index = 2    index + 1 =3   index - 1 = 2
                //Content Discovery With Recurstion index = 2   index + 1 = 2    index - 1 = 3
                //NO 404 Status                     index = 2      index + 1=  3     index -1 = 3
                // Try in the terminal beelow       index = 3    index + 1 = 2   index - 1 = 2
                //Content Discovery with File Extensions   index   = 2     index + 1 = 3   index - 1 = 2

            }
            if (markdownTOCData[index - 1].level > markdownTOCData[index].level) {     //content discovery with recursion No/404
                    
                if(markdownTOCData[index + 1].level == markdownTOCData[index].level){  //content discovery with recursion
                    htmlString += '</ul></details></li>'
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
            if (markdownTOCData[index - 1].level < markdownTOCData[index].level) { // Ty in the terminal
                    
                    if(markdownTOCData[index + 1].level == markdownTOCData[index].level){
                        console.log(heading.link)
                        htmlString += `<li><a href=${heading.link}>${heading.text}</a></li>`
                    }
                    if(markdownTOCData[index + 1].level < markdownTOCData[index].level){  
                        htmlString += '<ul>'  //try it in the terminal
                        htmlString += `<li><a href=${heading.link}>${heading.text}</a></li>`
    
                    }
                    if(markdownTOCData[index + 1].level > markdownTOCData[index].level){
                        htmlString += '<li><details open>'
                        htmlString +=    `<summary><a href=${heading.link}>${heading.text}</a></summary>`
                        htmlString += '<ul>' 
                    }
            }
       
            if ((markdownTOCData[index - 1].level == markdownTOCData[index].level) && (markdownTOCData[index + 1].level > markdownTOCData[index].level)) {
                
                htmlString += '<li><details open>'
                htmlString +=    `<summary><a href=${heading.link}>${heading.text}</a></summary>`
                htmlString += '<ul>' 
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
        catch {
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



export function TableOfCfontentsGenerator({ markdownTOCData }) {

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