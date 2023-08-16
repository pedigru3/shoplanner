import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import { View } from "native-base";

export function Routes(){
  return (
    <View flex={1}>
      <NavigationContainer>
        <AppRoutes/>
      </NavigationContainer>
    </View>
  )
}