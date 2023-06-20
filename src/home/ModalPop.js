import { Modal, Button } from "react-bootstrap";
import { React, useState } from "react";
import { useSelector } from "react-redux";
import { userToken } from "../app/userSlice";
const ModalPop = (props) => {
  const isShow = props.show;
  const token = useSelector(userToken);
  const [editmovieDescription, setEditMovieDescription] = useState(
    props.movieDescription
  );
  const editReview = async () => {
    const url = `http://localhost:3001/api/review/` + props.movie.id;
    let apiResonse = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        description: editmovieDescription,
      }),
    });
    const tjson = await apiResonse.json();
    console.log(tjson);
    props.setMovieDescription(editmovieDescription);
    props.initModal();
  };
  return (
    <div>
      <Modal show={isShow}>
        <Modal.Header closeButton onClick={props.initModal}>
          <Modal.Title>Edit Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            class="modalTextInput form-control"
            value={editmovieDescription}
            onChange={(e) => setEditMovieDescription(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.initModal}>
            Close
          </Button>
          <Button variant="dark" onClick={() => editReview()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalPop;
