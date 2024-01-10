// Material-UI Component Imports
import { Box, Container, Stack } from "@mui/material";

export function Footer() {
  return (
    <div className="footer_config">
      <Container>
        <Stack className="main_footer_container">
          <Stack flexDirection={"row"} style={{ height: "242px" }}>
            <Stack className="info" flexDirection={"column"}>
              <Box>
                <img src={"/papay_footer.svg"} />
              </Box>
              <Box className="main_text">
                For more information, download the Papay app available on both
                iOS and Android platforms. Follow us on social media for the
                latest updates and mouth-watering offers.
              </Box>
              <Stack className="contact_links">
                <Box>
                  <img src={"/icons/facebook.svg"} />
                </Box>
                <Box>
                  <img src={"/icons/twitter.svg"} />
                </Box>
                <Box>
                  <img src={"/icons/instagram.svg"} />
                </Box>
                <Box>
                  <img src={"/icons/youtube.svg"} />
                </Box>
              </Stack>
            </Stack>
            <Stack className="parts">
              <Box className="part_subject">Sections</Box>
              <Box className="divider"></Box>
              <Box className="targets">Home Restaurants Community Help</Box>
            </Stack>
            <Stack className="find_us">
              <Box className="find"> Contacts</Box>
              <Box className="divider"></Box>
              <Stack className="details" sx={{ mt: "19.36px" }}>
                <Box className="detail_first"> 📌</Box>
                <Box className="detail_second">
                  206 Malik Street, Tashkent, Uzbekistan
                </Box>
              </Stack>
              <Stack className="details" sx={{ mt: "9px" }}>
                <Box className="detail_first">📞 </Box>
                <Box className="detail_second">+998 - 99 266 25 62</Box>
              </Stack>
              <Stack className="details" sx={{ mt: "9px" }}>
                <Box className="detail_first">✉️</Box>
                <Box className="detail_second">info@papays.com</Box>
              </Stack>
            </Stack>
          </Stack>
          <Box className="liner" sx={{ mt: "86px" }}></Box>
          <Box className="copyrights">
            Copyright Papays 2023, All right reserved.
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
