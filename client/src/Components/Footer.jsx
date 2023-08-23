import { Box, Flex, Text } from "@chakra-ui/react"

const Footer = () => {
   const date = new Date
   const year = date.getFullYear()
   return (
      <Flex align={"center"}
         justifyContent={"space-around"} className="navBoxTwo" p={4} m={3} bg={"#dcd2cd"} fontFamily={"Lugrasimo"} fontWeight={"bold"} fontSize={{base:"14px", sm:"16px", md:"18px"}}>
         <Box display={{base:"none", sm:"block"}}>
            <Text>#blog_Cuvette / Copyright @ {year}</Text>
         </Box>
         <Box>
            <Text>-Aman Singh Rajawat</Text>
         </Box>
      </Flex>
   )
}

export default Footer
