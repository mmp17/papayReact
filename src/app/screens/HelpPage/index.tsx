// React Import
import React from "react";
// Material UI Component Imports
import {
  Box,
  Container,
  Stack,
  Button,
  Typography,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
// Material UI Lab and Icon Imports
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList"; // Note: 'Tablist' and 'TabList' seem to be a duplicate, keeping 'TabList'
import TabPanel from "@mui/lab/TabPanel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// CSS Import
import "../../../css/help.css";

export function HelpPage() {
  // Initializations
  const [value, setValue] = React.useState("1");
  const faq = [
    {
      question: "How is the payment made?",
      answer: "You make the payment through Payme, Click payment applications",
    },
    {
      question: "How long does it take for the purchased items to arrive?",
      answer:
        "Orders will arrive in different time frames depending on what you purchased",
    },
    {
      question: "Do you guarantee the security of my data if I use the site?",
      answer:
        "Of course, our developers are responsible for the security of your data",
    },
    {
      question: "Who do I contact if there is a problem with the site?",
      answer:
        "Dear customer, please send a message to the admin from 'Message to the admin' section",
    },
    {
      question: "Can I also participate in the live chat?",
      answer:
        "Be sure to register on our site and feel free to use the Community section and leave your comments!",
    },
  ];
  const rules = [
    `You must register to use web site to make orders and use live chats`,
    `It is not possible to cancel your orders after you have paid for them in full, so please kindly check before making payments.`,
    `The use of obscene words during live communication is strictly prohibited`,
    `Personal ads cannot be distributed without admin's permission`,
    `Your articles should not go beyond the bounds of decency`,
    `Please respect our requests as all your actions are under the control of our admins`,
  ];
  // HANDLERS
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="help_page">
      <Container maxWidth="lg" sx={{ mt: "50px", mb: "50px" }}>
        <TabContext value={value}>
          <Box className={"help_menu"}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                style={{ display: "flex", justifyContent: "space-between" }}
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Rules" value={"1"} />
                <Tab label="FAQ" value={"2"} />
                <Tab label="Message to Admin" value={"3"} />
              </TabList>
            </Box>
          </Box>
          <Stack>
            <Stack className="help_main_content">
              <TabPanel value={"1"}>
                <Stack className="theRules_box">
                  <Box className={"theRulesFrame"}>
                    {rules.map((ele, key) => {
                      return <p key={key}>{ele}</p>;
                    })}
                  </Box>
                </Stack>
              </TabPanel>
              <TabPanel value={"2"}>
                <Stack className="accordian_menu">
                  {faq.map((ele, number) => {
                    return (
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panelia-content"
                          id="panelia-header"
                        >
                          <Typography>{ele.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{ele.answer}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
                </Stack>
              </TabPanel>
              <TabPanel value="3">
                <Stack className="admin_letter_box">
                  <Stack className="admin_letter_container">
                    <Box className={"admin_letter_frame"}>
                      <span>Leave a Message to Admin</span>
                      <p>
                        Hello! To leave a message to the admin, below please
                        fill out the form
                      </p>
                    </Box>
                    <form
                      action="#"
                      method="POST"
                      className="admin_letter_frame"
                    >
                      <div className="admin_input_box">
                        <label htmlFor="">Name</label>
                        <input type="text" name="mb_nick" placeholder="Name" />
                      </div>
                      <div className="admin_input_box">
                        <label htmlFor="">E-mail address</label>
                        <input
                          type="text"
                          name="mb_email"
                          placeholder="E-mail Address"
                        />
                      </div>
                      <div className="admin_input_box">
                        <label htmlFor="">Message</label>
                        <textarea
                          name="mb_msg"
                          placeholder="Message"
                        ></textarea>
                      </div>
                      <Box
                        display={"flex"}
                        justifyContent={"flex-end"}
                        sx={{ mt: "30px" }}
                      >
                        <Button type="submit" variant="contained">
                          Send
                        </Button>
                      </Box>
                    </form>
                  </Stack>
                </Stack>
              </TabPanel>
            </Stack>
          </Stack>
        </TabContext>
      </Container>
    </div>
  );
}
