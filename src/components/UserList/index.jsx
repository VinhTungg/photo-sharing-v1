import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import fetchModel from "../../lib/fetchModelData";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadUsers = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchModel("/user/list");
        if (!ignore) {
          setUsers(data);
        }
      } catch (loadError) {
        if (!ignore) {
          setError(loadError.message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Người dùng
      </Typography>
      <List component="nav">
        {users.map((item, index) => (
          <React.Fragment key={item._id}>
            <ListItemButton component={Link} to={`/users/${item._id}`} >
              <ListItemText
                primary={`${item.first_name} ${item.last_name}`}
                secondary={item.location}
              />
            </ListItemButton>
            {index < users.length - 1 ? <Divider /> : null}
          </React.Fragment>
        ))}
      </List>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Chọn một người dùng để xem thông tin chi tiết và ảnh.
      </Typography>
    </Box>
  );
}

export default UserList;
