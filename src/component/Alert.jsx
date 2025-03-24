import { Alert } from "@chakra-ui/react";



export default function AlertComponent({alertMessage}){
    return (
        <Alert.Root status='error'>
            <Alert.Indicator />
            <Alert.Title >{alertMessage}</Alert.Title>
        </Alert.Root>
    )
}