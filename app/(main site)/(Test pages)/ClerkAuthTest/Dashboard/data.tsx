import { SearchUsers } from "./_search-users";
import { clerkClient } from "@clerk/nextjs";
import { setRole } from "./_actions";


import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { checkRole } from "../utils/roles";

export default async function AdminDashboard(params: { props: {
  searchParams: { search?: string }};
}) {
  const { sessionClaims } = auth();
  console.log(sessionClaims)
 
  // If the user does not have the admin role, redirect them to the home page
  // if (sessionClaims?.metadata.role !== "admin") 
  if (!checkRole("admin")){
    // redirect("/");
    return(
      <>

      <div className = 'bg white'>
    <p>you need to log your ass in boiii</p>
    </div>
    </>
    )
  }
   const query = params.props.searchParams.search

  console.log(query)
 
  const users = query ? await clerkClient.users.getUserList({ query }) : [];
 
  return (
    <>
      <h1>This is the admin dashboard</h1>
      <p>This page is restricted to users with the 'admin' role.</p>
 
      <SearchUsers />
 
      {users.map((user) => {
        return (
          <div key={user.id}>
            <div>
              {user.firstName} {user.lastName}
            </div>
            <div>
              {
                user.emailAddresses.find(
                  (email) => email.id === user.primaryEmailAddressId
                )?.emailAddress
              }
            </div>
            <div>{user.publicMetadata.role as string}</div>
            <div>
              <form action={setRole}>
                <input type="hidden" value={user.id} name="id" />
                <input type="hidden" value="admin" name="role" />
                <button type="submit">Make Admin</button>
              </form>
            </div>
            <div>
              <form action={setRole}>
                <input type="hidden" value={user.id} name="id" />
                <input type="hidden" value="moderator" name="role" />
                <button type="submit">Make Moderator</button>
              </form>
            </div>
          </div>
        );
      })}
    </>
  );
   
}