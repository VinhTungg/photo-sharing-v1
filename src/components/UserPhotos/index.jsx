import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";

import fetchModel from "../../lib/fetchModelData";
import kenobi1 from "../../images/kenobi1.jpg";
import kenobi2 from "../../images/kenobi2.jpg";
import kenobi3 from "../../images/kenobi3.jpg";
import kenobi4 from "../../images/kenobi4.jpg";
import ludgate1 from "../../images/ludgate1.jpg";
import malcolm1 from "../../images/malcolm1.jpg";
import malcolm2 from "../../images/malcolm2.jpg";
import ouster from "../../images/ouster.jpg";
import ripley1 from "../../images/ripley1.jpg";
import ripley2 from "../../images/ripley2.jpg";
import took1 from "../../images/took1.jpg";
import took2 from "../../images/took2.jpg";

const photoSources = {
  "kenobi1.jpg": kenobi1,
  "kenobi2.jpg": kenobi2,
  "kenobi3.jpg": kenobi3,
  "kenobi4.jpg": kenobi4,
  "ludgate1.jpg": ludgate1,
  "malcolm1.jpg": malcolm1,
  "malcolm2.jpg": malcolm2,
  "ouster.jpg": ouster,
  "ripley1.jpg": ripley1,
  "ripley2.jpg": ripley2,
  "took1.jpg": took1,
  "took2.jpg": took2,
};

function formatDate(dateString) {
  return new Date(dateString).toLocaleString();
}

function getPhotoSource(fileName) {
  return photoSources[fileName] || null;
}

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadUserPhotos = async () => {
      setLoading(true);
      setError("");

      try {
        const [userData, photoData] = await Promise.all([
          fetchModel(`/user/${userId}`),
          fetchModel(`/photosOfUser/${userId}`),
        ]);

        if (!ignore) {
          setUser(userData);
          setPhotos(photoData);
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

    loadUserPhotos();

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
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Ảnh của {user.first_name} {user.last_name}
      </Typography>

      {photos.length === 0 ? (
        <Typography variant="body1">Người dùng này chưa đăng ảnh nào.</Typography>
      ) : null}

      {photos.map((photo) => {
        const photoSource = getPhotoSource(photo.file_name);

        return (
          <Card key={photo._id} sx={{ marginBottom: 4, boxShadow: 3 }}>
            <CardHeader
              title={`Đăng lúc ${formatDate(photo.date_time)}`}
            />

            {photoSource ? (
              <CardMedia
                component="img"
                height="auto"
                image={photoSource}
                alt={`${user.first_name} ${user.last_name}`}
                sx={{ objectFit: "contain", maxHeight: 500 }}
              />
            ) : (
              <Box sx={{ p: 3 }}>
                <Alert severity="warning">Không thể tải ảnh {photo.file_name}.</Alert>
              </Box>
            )}

            <CardContent>
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                Bình luận
              </Typography>
              <Divider />

              {photo.comments && photo.comments.length > 0 ? (
                photo.comments.map((comment) => (
                  <Box key={comment._id} sx={{ mt: 2, mb: 2, pl: 2 }}>
                    <Typography variant="subtitle2">
                      <Link
                        to={`/users/${comment.user._id}`}
                        style={{ fontWeight: "bold", textDecoration: "none", color: "#1976d2" }}
                      >
                        {comment.user.first_name} {comment.user.last_name}
                      </Link>
                      <span style={{ color: "gray", marginLeft: "10px", fontSize: "0.8rem" }}>
                        {formatDate(comment.date_time)}
                      </span>
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {comment.comment}
                    </Typography>
                    <Divider variant="inset" component="div" sx={{ mt: 1 }} />
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Chưa có bình luận nào cho ảnh này.
                </Typography>
              )}
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}

export default UserPhotos;