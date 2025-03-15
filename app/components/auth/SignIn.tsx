import useAdvancedTextInput3 from "@/app/hooks/ui/useAdvancedTextInput3";


export default function SignIn() {
    const [email, BasicEmail] = useAdvancedTextInput3({ prompt: "Email" });
    const [password, BasicPassword] = useAdvancedTextInput3({ prompt: "Password" });
    return (
        <div className= 'flex flex-col justify-center items-center h-screen gap-5 text-white bg-black p-5'>
            <h2 className='text-3xl'>Sign In</h2>
            <div className='text-black'>
            <BasicEmail />
            </div>
            <div className='text-black'>
            <BasicPassword />
            </div>
        </div>
    );
}