import React, { useEffect, useState } from "react";
import { Alert, Box, Button, CircularProgress, Divider, Paper, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import fetchModel from "../../lib/fetchModelData";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadUser = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchModel(`/user/${userId}`);
        if (!ignore) {
          setUser(data);
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

    loadUser();

    return () => {
      ignore = true;
    };
  }, [userId]);

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

  if (!user) {
    return <Alert severity="warning">Không tìm thấy người dùng.</Alert>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h3" gutterBottom>
          {user.first_name} {user.last_name}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="h6">
          <strong>Địa chỉ:</strong> {user.location}
        </Typography>
        <Typography variant="h6">
          <strong>Nghề nghiệp:</strong> {user.occupation}
        </Typography>

        <Box sx={{ mt: 2, p: 2, bgcolor: "#f0f2f5", borderRadius: 2 }}>
          <Typography variant="body1">
            <strong>Mô tả:</strong> {user.description}
          </Typography>
        </Box>

        <Button
          variant="contained"
          sx={{ mt: 3 }}
          component={Link}
          to={`/photos/${userId}`}
        >
          Xem ảnh của {user.first_name}
        </Button>
      </Paper>
    </Box>
  );
}

export default UserDetail;