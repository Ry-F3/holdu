import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
// Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
// Axios
import { axiosReq } from "../../api/axiosDefaults";
// Contexts
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import { useSetProfileData } from "../../contexts/ProfileContext";
// Styles
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";


const ProfileTypeChoiceForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const setProfileData = useSetProfileData();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();

  const [profileData, setProfileDataState] = useState({
    name: "",
    content: "",
    image: "",
    profile_type: "", 
    is_signup_completed: "",
  });

  const { name, content, image, profile_type, is_signup_completed } =
    profileData;
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is mounted

    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { name, content, image, profile_type, is_signup_completed } =
            data;
          if (isMounted) {
            // Check if the component is still mounted before updating state
            setProfileDataState({
              name,
              content,
              image,
              profile_type,
              is_signup_completed,
            });
          }
        } catch (err) {
          console.log(err);
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    handleMount();

    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, [currentUser, history, id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfileDataState({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Reset errors state
      setErrors({});

      // Check if name, content, and profileType are filled in or selected
      if (!name || !content || !profile_type || profile_type === "") {
        // Set errors if any of the fields are empty
        setErrors({
          name: name ? [] : ["Name is required"],
          content: content ? [] : ["Content is required"],
          profile_type:
            !profile_type || profile_type === ""
              ? ["Profile type is required"]
              : [],
        });

        return;
      }

      // If all fields are filled, proceed with form submission
      const formData = new FormData();
      formData.append("name", name);
      formData.append("content", content);
      formData.append("profile_type", profile_type); // Include profile type in form data

      if (imageFile?.current?.files[0]) {
        formData.append("image", imageFile?.current?.files[0]);
      }

      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      setProfileData(data);
      history.push("/");
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors(err.response.data);
      } else {
        setErrors({ general: "An error occurred while submitting the form" });
      }
    }
  };

  const textFields = (
    <>
      <Form.Group>
        {!is_signup_completed && (
          <Form.Label>Please fill in the form to continue</Form.Label>
        )}
        <Form.Control
          type="text"
          value={name}
          onChange={handleChange}
          name="name"
          placeholder="Enter your name ..."
        />
        {errors?.name && (
          <Alert variant="warning mb-3 mt-3">
            {errors.name.map((message, idx) => (
              <span key={idx}>{message}</span>
            ))}
          </Alert>
        )}
      </Form.Group>

      <Form.Group>
        {/* <Form.Label>Bio</Form.Label> */}
        <Form.Control
          as="textarea"
          value={content}
          onChange={handleChange}
          name="content"
          placeholder="Tell us about yourself? ..."
          rows={7}
        />
        {errors?.content && (
          <Alert variant="warning mb-3 mt-3">
            {errors.content.map((message, idx) => (
              <span key={idx}>{message}</span>
            ))}
          </Alert>
        )}
      </Form.Group>

      {!is_signup_completed && (
        <Form.Group>
          {/* <Form.Label>Profile Type</Form.Label> */}
          <Form.Control
            as="select"
            value={profile_type}
            onChange={handleChange}
            name="profile_type">
            <option value="" default hidden>
              What are you looking for?
            </option>
            <option value="employee">Looking for work!</option>
            <option value="employer">Looking to hire!</option>
          </Form.Control>
          {errors?.profile_type && (
            <Alert variant="warning mb-3 mt-3">
              {errors.profile_type.map((message, idx) => (
                <span key={idx}>{message}</span>
              ))}
            </Alert>
          )}
        </Form.Group>
      )}

      <Button
        className={`${btnStyles.customButton} ${btnStyles.Bright}  ${btnStyles.Wide}`}
        type="submit">
        Save
      </Button>
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-1 p-0 p-md-2 text-center mt-1" md={7} lg={6}>
          <Container className={appStyles.Content}>
            <Form.Group>
              {image && (
                <figure>
                  <Image src={image} fluid />
                </figure>
              )}
              {errors?.image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <div>
                <div className="mb-3">{currentUser?.username}</div>
                <Form.Label
                  className={`${btnStyles.customProfileButton} ${btnStyles.Bright} btn my-auto`}
                  htmlFor="image-upload">
                  Change the image
                </Form.Label>
              </div>
              <Form.File
                id="image-upload"
                ref={imageFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setProfileDataState({
                      ...profileData,
                      image: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text-center">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
};

export default ProfileTypeChoiceForm;
