import { BaseToast, ErrorToast, SuccessToast, ToastConfig } from "react-native-toast-message";
import { Container } from "./styles";
import { Text } from "native-base";

export const toastConfig: ToastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */

  success: ({...props}) => (
    <SuccessToast
      {...props}
      style={{ marginTop: 16, borderLeftColor: 'green', backgroundColor: 'green'}}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '600',
        color: 'white'
      }}
    />
  ),
 
  error: ({type, ...rest}) => (
    <ErrorToast
      {...rest}
      style={{ marginTop: 16, borderLeftColor: 'red', backgroundColor: 'red'}}
      text1Style={{
        fontSize: 16,
        fontWeight: '600',
        color: 'white'
      }}
      text2Style={{
        fontSize: 15
      }}
      
    />
  ),

  info: ({type, ...rest}) => (
    <BaseToast
      {...rest}
      style={{ marginTop: 16, borderLeftColor: 'gray', backgroundColor: 'gray'}}
      text1Style={{
        fontSize: 16,
        fontWeight: '600',
        color: 'white'
      }}
    />
  ),
 

}