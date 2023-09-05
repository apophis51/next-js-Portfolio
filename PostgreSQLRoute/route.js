import { NextResponse } from 'next/server'
// import User from './usermodel';
const Tick = require('./usermodel')
import bodyParser from 'body-parser';
import { request } from 'http';



// export async function POST(req) {
 
//     const requestData = await req.json();
//     return NextResponse.json(requestData);

// };

export async function POST(req) {
  try {
    //  const requestData = await req.json();
    const user = await Tick.create({
      username: 'newUsername',
      password: 'newPassword',
    })
      .then((user) => {
        console.log('New user created:', user.json());
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
    return NextResponse.json(requestData);
  } catch (error) {
    const responce = await req.json();
    return NextResponse.json(responce);
    // return NextResponse.json({ error: 'Could not create user'});
  }
};

  export async function GET(res, req) {
    
    try {
    const users = await User.findAll();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Could not retrieve users' });
  }
  }


    



 
