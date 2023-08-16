import { TouchableOpacityProps } from "react-native";
import { Container, Title } from "./styles";
import { Loading } from "../Loading";

type Props = TouchableOpacityProps & {
  title: string
  isLoading?: boolean
  type?: 'PRIMARY' | 'SECONDARY'
}

export function Button({type='PRIMARY', isLoading = false, title, ...rest} : Props){
  return (
    <Container disabled={isLoading} activeOpacity={0.7} {...rest}>
      {
        isLoading ? <Loading type={type}/> : <Title> {title} </Title>
      }
    </Container>
  )
}