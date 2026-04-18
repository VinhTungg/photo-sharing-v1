import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation, useMatch } from "react-router-dom";

import fetchModel from "../../lib/fetchModelData";
import "./styles.css";
import { getUser } from "../../api/api";

const STUDENT_NAME = "Nguyễn Vĩnh Tùng";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const location = useLocation();
  const userDetailMatch = useMatch("/users/:userId");
  const userPhotosMatch = useMatch("/photos/:userId");
  const detailUserId = userDetailMatch?.params.userId || null;
  const photosUserId = userPhotosMatch?.params.userId || null;
  const [contextLabel, setContextLabel] = useState("Danh sách người dùng");

  useEffect(() => {
    let ignore = false;

    const loadContext = async () => {
      if (photosUserId) {
        try {
          const user = await fetchModel(`/user/${photosUserId}`);
          if (!ignore) {
            setContextLabel(`Ảnh của ${user.first_name}  ${user.last_name}`);
          }
          return;
        } catch {
          if (!ignore) {
            setContextLabel("Ảnh người dùng");
          }
          return;
        }
      }

      if (detailUserId) {
        try {
          const user = await fetchModel(`/user/${detailUserId}`);
          if (!ignore) {
            setContextLabel(`${user.first_name} ${user.last_name}`);
          }
          return;
        } catch {
          if (!ignore) {
            setContextLabel("Chi tiết người dùng");
          }
          return;
        }
      }

      if (!ignore) {
        setContextLabel(
          location.pathname === "/users" || location.pathname === "/"
            ? "Danh sách người dùng"
            : "Ứng dụng chia sẻ ảnh"
        );
      }
    };

    loadContext();

    return () => {
      ignore = true;
    };
  }, [detailUserId, location.pathname, photosUserId]);

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ justifyContent: "space-between", gap: 2 }}>
        <Typography variant="h6" color="inherit">
          {STUDENT_NAME}
        </Typography>
        <Typography variant="h6" color="inherit" textAlign="right">
          {contextLabel}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
