import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export const Container = styled(TouchableOpacity)`  
  width: 100%;
  
  min-height: 50px;
  max-height: 50px;

  border-radius: 10px;

  flex-direction: row;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) =>  theme.COLORS.RED_500};
  margin-top: 6px;
`
export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BODY_BOLD};
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.WHITE}
  `}
`
