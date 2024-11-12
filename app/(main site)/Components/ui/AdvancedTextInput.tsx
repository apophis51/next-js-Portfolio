import { useState, useRef, useEffect } from 'react';

/**
 * Represents a reference string that holds the current value.
 */
type referenceString = {
    /** The current value of the reference string. */
    current: string;
};


export default function useAdvancedTextInput({ prompt }: { prompt: string }): [referenceString, React.FC] {
    const [output, setOutput] = useState<string>(''); // Manage the value using state
    const inputRef = useRef<HTMLInputElement>(null); // Create a ref to manage input focus

    const referenceString: referenceString = { current: output }; // A reference to the current value
console.log('render')
    // This effect keeps the focus on the input after the re-render
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus(); // Refocus the input after the component re-renders
        }
    }, [output]); // Only run this effect when the output value changes

    function BasicTextInput() {
        console.log('render')
        return (
            <div className="flex items-center justify-center">
                <input
                    ref={inputRef} // Attach the ref to the input element
                    onChange={(evt) => {
                        setOutput(evt.target.value); // Update state with the new value
                    }}
                    value={output} // Bind the state to the input's value
                    type="text"
                    placeholder={prompt}
                    className="input input-bordered w-full max-w-xs"
                />
            </div>
        );
    }

    return [referenceString, BasicTextInput];
}
