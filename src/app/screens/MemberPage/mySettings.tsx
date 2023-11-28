import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Button from "@mui/material/Button";

export function MySettings(props: any) {
  return (
    <Stack className={"my_settings_page"}>
      <Box className={"member_media_frame"}>
        <img
          src={"/auth/default_user.png"}
          className={"mb_image"}
          style={{ borderRadius: "50%" }}
          width={"100px"}
          height={"100px"}
        />
        <div className={"media_change_box"}>
          <span>Upload image</span>
          <p>You can uplose only such file extensions asJPG, JPEG, PNG!</p>
          <div className={"up_del_box"}>
            <Button component="label" style={{ minWidth: "0" }}>
              <CloudDownloadIcon />
              <input type="file" hidden />
            </Button>
          </div>
        </div>
      </Box>
      <Box className={"input_frame"}>
        <div className={"long_input"}>
          <label className={"spec_label"}>Name</label>
          <input
            className={"spec_input mb_nick"}
            type="text"
            placeholder="Usta Ahmad"
            name="mb_nick"
          />
        </div>
      </Box>
      <Box className={"input_frame"}>
        <div className={"short_input"}>
          <label className={"spec_label"}>Phone number</label>
          <input
            className={"spec_input mb_phone"}
            type="text"
            placeholder={"998951234567"}
            name="mb_phone"
          />
        </div>
        <div className={"short_input"}>
          <label className={"spec_label"}>Address</label>
          <input
            className={"spec_input  mb_address"}
            type="text"
            placeholder={"7 Kimyogarlar Street, Tashkent"}
            name="mb_address"
          />
        </div>
      </Box>
      <Box className={"input_frame"}>
        <div className={"long_input"}>
          <label className={"spec_label"}>Description</label>
          <textarea
            className={"spec_textarea mb_description"}
            placeholder={"No description"}
            name="mb_description"
          />
        </div>
      </Box>
      <Box display={"flex"} justifyContent={"flex-end"} sx={{ mt: "25px" }}>
        <Button variant={"contained"}>Save</Button>
      </Box>
    </Stack>
  );
}
