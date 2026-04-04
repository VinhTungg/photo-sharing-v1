const express = require("express");

const loadModels = require("./loadModels");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/test/info", (req, res) => {
  const models = loadModels();
  res.json(models.schemaInfo());
});

app.get("/user/list", (req, res) => {
  const models = loadModels();
  res.json(models.userListModel());
});

app.get("/user/:id", (req, res) => {
  const models = loadModels();
  const user = models.userModel(req.params.id);

  if (!user) {
    res.status(404).json({ message: "Không tìm thấy người dùng." });
    return;
  }

  res.json(user);
});

app.get("/photosOfUser/:id", (req, res) => {
  const models = loadModels();
  const user = models.userModel(req.params.id);

  if (!user) {
    res.status(404).json({ message: "Không tìm thấy người dùng." });
    return;
  }

  res.json(models.photoOfUserModel(req.params.id));
});

app.listen(PORT, () => {
  console.log(`Photo Sharing API đang chạy tại http://localhost:${PORT}`);
});
