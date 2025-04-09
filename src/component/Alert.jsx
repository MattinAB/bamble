import { Alert } from "@chakra-ui/react";



export default function AlertComponent({alertMessage , status}){
    return (
        <Alert.Root status={status}>
            <Alert.Indicator />
            <Alert.Title >{alertMessage}</Alert.Title>
        </Alert.Root>
    )
}