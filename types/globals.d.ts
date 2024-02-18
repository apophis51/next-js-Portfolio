export { };
 
export type Roles = "admin" | "moderator";


declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    };
  }
}

// export { };
 
// declare global {
//   interface CustomJwtSessionClaims {
//     metadata: {
//       role?: "admin" | "moderator";
//     };
//   }