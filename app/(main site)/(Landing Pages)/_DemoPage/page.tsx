import Container from '@mui/material/Container';
import {Section} from '@/app/(main site)/Components/Section'

import Hero from '../../Components/Hero'








export default async function WebApps() {
  return (
    <div>
      <Container maxWidth="xl"  >
        <Hero contentNeeded={"Web Apps"} />
        <Section content={'WebApps'} />
        <Section content={'WorkSearchApp'} sectionTitle="Work Search App Articles" />
      </Container>
    </div>
  );
}