import { useState } from 'react'


export default function useBasicToggle({ leftText, RightText }: { leftText: string, RightText: string }): [ boolean, React.FC ] {
    const [toggled, setToggled] = useState(false);

    function BasicToggle() {

        return (
            <div className='flex items-center justify-center whitespace-pre '>
                <p>{leftText}  </p>
                <input 
                checked={!toggled}
                type="checkbox" 
                onClick={() => toggled ? setToggled(false) : setToggled(true)} className="toggle" defaultChecked />
                
                <p>  {RightText}</p>
            </div>
        )
    }




    return [toggled, BasicToggle]
}
