import { Alert } from "@chakra-ui/react";



export default function AlertComponent({alertMessage , status}){
    return (
        <Alert.Root status={status} mt={4}>
            <Alert.Indicator />
            <Alert.Title >{alertMessage}</Alert.Title>
        </Alert.Root>
    )
}