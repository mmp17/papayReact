// React
import { useContext, useEffect, useState } from "react";
// Material UI
import { Avatar, Box, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
// Socket Context
import { SocketContext } from "../../context/socket";

export function CommunityChats() {
  // Initializations
  const [messagesList, setMessagesList] = useState([]),
    socket = useContext(SocketContext),
    [onlineUsers, setOnlineUsers] = useState<number>(0);

  useEffect(() => {
    socket.connect();
    console.log("PRINTED");
    socket?.on("connect", function () {
      console.log("CLIENT: connected");
    });
    socket?.on("newMsg", (new_mesage: any) => {
      console.log("CLIENT: new message");
    });
    socket?.on("greetMsg", (new_mesage: any) => {
      console.log("CLIENT: greet message");
    });
    socket?.on("infoMsg", (msg: any) => {
      console.log("CLIENT: info message");
      setOnlineUsers(msg.total);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <Stack className={"chat_frame"}>
      <Box className={"chat_top"}>Live Chat {onlineUsers}</Box>
      <Box className={"chat_content"}>
        <Stack className={"chat_main"}>
          <Box
            flexDirection={"row"}
            style={{ display: "flex" }}
            sx={{ m: "10px 0px" }}
          >
            <div className={"msg_left"}>Here is live chat section</div>
          </Box>
          <Box
            flexDirection={"row"}
            style={{ display: "flex" }}
            alignItems={"flex-end"}
            justifyContent={"flex-end"}
            sx={{ m: "10px 0px" }}
          >
            <div className={"msg_right"}>Assalomu Alaykum</div>
          </Box>
          <Box
            flexDirection={"row"}
            style={{ display: "flex" }}
            sx={{ m: "10px 0px" }}
          >
            <Avatar alt={"martin"} src={"/community/girl.png"} />
            <div className={"msg_left"}>Vaalaykum assalom</div>
          </Box>
          <Box
            flexDirection={"row"}
            style={{ display: "flex" }}
            alignItems={"flex-end"}
            justifyContent={"flex-end"}
            sx={{ m: "10px 0px" }}
          >
            <div className={"msg_right"}>How are you?</div>
          </Box>
          <Box
            flexDirection={"row"}
            style={{ display: "flex" }}
            sx={{ m: "10px 0px" }}
          >
            <Avatar alt={"martin"} src={"/community/girl.png"} />
            <div className={"msg_left"}>Fine, thanks!</div>
          </Box>
        </Stack>
      </Box>
      <Box className={"chat_bott"}>
        <input
          type={"text"}
          name={"message"}
          className={"msg_input"}
          placeholder={"Xabar jo'natish"}
        />
        <button className={"send_msg_btn"}>
          <SendIcon style={{ color: "#fff" }} />
        </button>
      </Box>
    </Stack>
  );
}
