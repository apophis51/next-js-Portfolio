import React, { useEffect, useState } from 'react'


 
    /**
     * @param leftText - The text on the left side of the toggle
     * @param RightText - The text on the right side of the toggle
     * 
     * This Function must take the form:
     *  
     *const [toggled, BasicToggle] = useBasicToggle({ leftText: 'Your Text', RightText: 'Your Right Item' })
     *
     *And Insert it Into Your JSX using the Form:
     *  \<BasicToggle />
     *
     * When the UI is toggled to the Right - The toggled button will be "True" 
     * 
     * When it is toggled to the left - the toggled button will be "False"
     */
export default function useBasicToggle({ leftText, RightText, saverCallBack }: { leftText: string, RightText: string, saverCallBack?: (modelValue: boolean) => Promise<boolean> }): [ boolean, React.Dispatch<React.SetStateAction<boolean>> ,React.FC ] {
    const [toggled, setToggled] = useState(true);

    function BasicToggle() {
       
       
        

        return (
            <div className='flex items-center justify-center whitespace-pre '>
                <p>{leftText}  </p>
                <input 
                checked={toggled}
                type="checkbox" 
                onChange = {async (evt) => {
                    setToggled(prev => !prev)
                    console.log(!!saverCallBack)
                    if (saverCallBack) {
                        console.log(evt.target.checked)
                        await saverCallBack(evt.target.checked)}
                }}
                //onChange={() => toggled ? setToggled(false) : setToggled(true)}
                 className="toggle"
                 //defaultChecked 
                />
                
                <p>  {RightText}</p>
            </div>
        )
    }




    return [toggled, setToggled ,BasicToggle]
}


// The .tsx files are your source files that should not be directly imported by consumers. They are meant for development and compilation into JavaScript. The consumers should not import these files directly unless they are also working in a TypeScript environment and have access to the source code for their own use, which is uncommon for packaged libraries.
