import { useUser } from '@realm/react';
import { Container, Photo } from './styles'; 


export function PhotoUser() {
  const user = useUser()
  return (
   <Container>
     <Photo source={{uri: user.profile.pictureUrl}}/>
   </Container>
  );
}