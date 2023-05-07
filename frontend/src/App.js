import { Row, Col, Divider, Button, Image, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const fetchBlogData = () => {
    fetch("http://localhost:3001/api/blogs")
      .then((res) => res.json())
      .then((json) => {
        console.log(json.data);
        setBlogs(json.data);
      });
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState(""); 
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    fetchBlogData();
  }, [isModalOpen]);

  const handleOk = () => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({title, body, image})
    };
    fetch("http://localhost:3001/api/blogs/" + id, requestOptions).then(() => alert("Sửa thành công!!!"));
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleClick = (blg) => {
    setId(blg._id);
    setTitle(blg.title);
    setImage(blg.image);
    setBody(blg.body);
    setModalOpen(true);
  };

  return (
    <>
      <Row style={{ fontSize: "20px", fontWeight: "bold" }}>Blogs</Row>
      <Divider />
      {blogs.map((blg) => {
        return (
          <Row key={blg._id}>
            <Col span={24} style={{ fontSize: "15px", fontWeight: "bold" }}>
              {blg.title}
            </Col>
            <Col span={24} style={{ fontSize: "13px", marginTop: "10px" }}>
              {blg.body}
            </Col>
            <Col span={24} style={{ marginTop: "10px" }}>
              <Image width={100} src={blg.image} />
            </Col>
            <Col span={2} offset={22} style={{ marginTop: "10px" }}>
              <Button
                size="small"
                style={{ color: "white", backgroundColor: "blue" }}
                onClick={() => handleClick(blg)}
              >
                Chỉnh sửa
              </Button>
            </Col>
            <Divider />
          </Row>
        );
      })}
      <Modal
        title="Chỉnh sửa"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row>Title</Row>
        <Input value={title} onChange={(item) => setTitle(item.target.value)} />
        <Row style={{ marginTop: "10px" }}>Body</Row>
        <Input.TextArea
          value={body}
          onChange={(item) => setBody(item.target.value)}
        />
        <Row style={{ marginTop: "10px" }}>Image</Row>
        <Input value={image} onChange={(item) => setImage(item.target.value)} />
        <Image width={100} src={image} />
      </Modal>
    </>
  );
};

export default App;
