import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Rating,
  Typography,
  styled,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { MemberInterface } from "../../interfaces/IMember";

type Props = {
  id: number;
  image: string;
  content: string;
  rankName: string;
  rating: number;
  courseName: string;
  memberID: number;
  firstName: string;
  lastName: string;
};

// style
const BoxAuthor = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "2rem",
  marginBottom: "1.5rem",
  position: "relative",
});

const options = [
  { icon: <EditIcon />, label: "Edit", color: "#3f50b5" },
  { icon: <DeleteIcon />, label: "Delete", color: "#f44336" },
];

function ReviewCard({
  id,
  image,
  content,
  rankName,
  rating,
  courseName,
  memberID,
  firstName,
  lastName,
}: Props) {
  const navigate = useNavigate();
  const [memberLogin, setMemberLogin] = useState<MemberInterface>({
    ID: Number(localStorage.getItem("uid")),
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const handleClickOpenPopup = () => setIsOpenPopup(true);
  const handleClickClosePopup = () => setIsOpenPopup(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const checkMemberLogin = () => {
    if (memberID === memberLogin.ID) {
      console.log("same");
      setIsShow(!isShow);
    }
  };

  useEffect(() => {
    checkMemberLogin();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#FFF9F9",
        maxWidth: "500px",
        mx: "auto",
        p: "2rem 4rem",
        borderRadius: "2rem",
      }}
    >
      {/* Author and rating */}
      <BoxAuthor>
        {/* Avatar */}
        <Avatar
          alt=""
          src="https://us-tuna-sounds-images.voicemod.net/8fab1c3e-1cb9-47b6-8fe3-699bc7c2aaa9-1655706403347.jpg"
          sx={{ width: 60, height: 60 }}
        />
        {/* Author */}
        <Box>
          <Typography>
            <Box
              sx={{
                wordSpacing: "4px",
                display: "inline-block",
                fontWeight: "900",
                fontSize: "1.5rem",
              }}
            >
              {firstName} {lastName}
            </Box>
          </Typography>
          {/* Rating */}
          <Rating name="simple-controlled" value={rating} readOnly />
          <Typography sx={{ wordSpacing: "4px" }}>
            course: {courseName}
          </Typography>
        </Box>
        {/* Edit, Delete */}
        {isShow && (
          <>
            <IconButton
              sx={{ position: "absolute", right: -32 }}
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  // maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              {options.map((option, idx) => (
                <MenuItem
                  sx={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    color: `${option.color}`,
                  }}
                  key={idx}
                  selected={option.label === "Pyxis"}
                  onClick={
                    option.label === "Edit"
                      ? () => navigate(`update-review/${id}`)
                      : handleClickOpenPopup
                  }
                >
                  {option.label} {option.icon}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </BoxAuthor>
      {/* Content */}
      <Box>
        <Typography>{content}</Typography>
        <Box
          sx={{
            maxWidth: "250px",
            mx: "auto",
            mt: "1.2rem",
          }}
        >
          <img src={image} alt="" style={{ width: "100%" }} />
        </Box>
      </Box>
    </Box>
  );
}

export default ReviewCard;
