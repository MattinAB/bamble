import { Grid, GridItem, Show  , useBreakpointValue} from '@chakra-ui/react'
import './App.css'
import NavBar from './component/NavBar';
import SideBar from './component/SideBar';
import MainScreen from './component/MainScreen';




function App() {

  // Initialize Firebase
    const showAside = useBreakpointValue({ base: true,md: true, lg: true });

  return (
    <Grid 
      p={2} 
      templateAreas={{
      base: `"nav" "aside" "main"`,
      md:`"nav nav" "aside main"`,
      lg: `"nav nav" "aside main"`
    }}
      templateColumns={{
        base: '1fr',
        md:'1fr 4fr',
        lg: '1fr 4fr',
      }}
    >
        <GridItem 
          area='nav' 
          bg={'blue.100'} 
          p={{base:2 , md:4 , lg:5}}
          borderRadius={{base:'2xl' , md:'3xl' , lg:'4xl'}}
          
        >
          <NavBar/>
        </GridItem>
        <Show  when={showAside} >
          <GridItem 
            area='aside'
            minH={{base:10 , md:'100vh' , lg:'100vh'}}  
            bg={'gray.100'}  p={2} 
            borderRadius='2xl'
            mt={2}
            >
            <SideBar/>
          </GridItem>
        </Show>
        <GridItem area='main' bg={'white'} p={5}>
          <MainScreen/>
        </GridItem>
    </Grid>
  )
}

export default App
