import Container from '@mui/material/Container';





export default async function Layout({children}) { 

  return (
    <div>
      <Container maxWidth="xl"  >
        {children}
      </Container>
    </div>
  );
}