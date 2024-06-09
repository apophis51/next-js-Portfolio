import Container from '@mui/material/Container';
import Hero from '../../Components/Hero'
import {Section} from '@/app/(main site)/Components/Section'








export default async function WebApps() {
  return (
    <div>
      <Container maxWidth="xl"  >
        <Hero contentNeeded={"Web Apps"} />
        <Section content={'WebApps'} />
        <Section content={'WorkSearchApp'} />
      </Container>
    </div>
  );
}