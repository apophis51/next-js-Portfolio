export function SubmitToMongoDB({submit_to_mongoDB}: any) {
    return (
        <>
            <button className='btn bg-green-600 text-white'disabled={false}onClick={submit_to_mongoDB}>Save As New Article</button> 
        </>
    )
}