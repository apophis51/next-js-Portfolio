export function SubmitToMongoDB({submit_to_mongoDB}: any) {
    console.log('SubmitToMongoDB triggered')
   
    
    return (
        <>
            <button className='btn bg-green-600 text-white'disabled={false}onClick={submit_to_mongoDB}>Save Article to MongoDb</button> 
        </>
    )
}