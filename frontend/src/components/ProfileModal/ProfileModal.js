import React, {useState} from "react";
import {Modal, useMantineTheme} from "@mantine/core";
import {useDispatch, useSelector} from "react-redux";
import {uploadImage} from "../../Actions/uploadAction";
import {updateUser} from "../../Actions/UserActions"

//mantine is a library and this Modal is of its components

const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
  const theme = useMantineTheme();
  const{password, ...other} = data
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.authReducer.authData)


  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      e.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    console.log(UserData)
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage)
      UserData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (e) {
        console.log(e)
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage)
      UserData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (e) {
        console.log(e)
      }
    }
    dispatch(updateUser(user._id, UserData));
    setModalOpened(false);
  }


  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={modalOpened}
      size="42%"
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm" onSubmit={handleSubmit}>
        <h3>Your info</h3>

        <div>
          <input
            value={formData.firstname}
            onChange={handleChange}
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="First Name"
          />

          <input
            value={formData.lastname}
            onChange={handleChange}
            type="text"
            className="infoInput"
            name="lastname"
            placeholder="Last Name"
          />
        </div>



        <div>
          <input
            value={formData.livesIn}
            onChange={handleChange}
            type="text"
            className="infoInput"
            name="livesIn"
            placeholder="LIves in"

          />

          <input
            value={formData.country}
            onChange={handleChange}
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
          />
        </div>

        <div>
          <input
            value={formData.relationship}
            onChange={handleChange}
            name = "relationship"
            type="text"
            className="infoInput"
            placeholder="RelationShip Status"
          />
            <input
              value={formData.worksAt}
              onChange={handleChange}
              type="text"
              className="infoInput"
              name="worksAt"
              placeholder="Works at"
            />
        </div>


        <div>
          <label style={{marginRight:"5rem", marginLeft:"3rem"}}>Profile Image</label>
          <input type="file" name="profileImage" onChange={onImageChange} />
          </div>

          <div>
            <label style={{marginRight:"5rem", marginLeft:"3rem"}}>Cover image</label>
          <input type="file" name="coverImage" onChange={onImageChange} />
        </div>

        <button className="button infoButton">Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;