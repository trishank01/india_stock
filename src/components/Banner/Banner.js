import { Box, Container, Typography } from "@mui/material";
import Carousel from "./Carousel";

function Banner() {

    return (
        <Box sx={{
            backgroundImage: "url('https://images.pond5.com/blurred-stock-market-background-footage-086305586_prevstill.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
        }}>
            <Container sx={{
                height: 400,
                display: "flex",
                flexDirection: "column",
                paddingTop: { sm: 8, md: 10 },
                justifyContent: "space-around",
            }}>
                <Box sx={{
                    display: "flex",
                    height: "40%",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                }}>
                    <Typography
                        variant="h2"
                        style={{
                            fontWeight: "bold",
                            color: "white",
                            marginBottom: 15,
                            fontFamily: "Montserrat",
                        }}
                    >
                        Indian Stock Market Tracker
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        style={{
                            color: "darkgrey",
                            textTransform: "capitalize",
                            fontFamily: "Montserrat",
                        }}
                    >
                        Get all the Info regarding your favorite stock.
                    </Typography>
                </Box>
                <Carousel />
            </Container>
        </Box>
    );
}

export default Banner;
