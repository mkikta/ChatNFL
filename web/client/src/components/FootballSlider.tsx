import { Slider, styled } from "@mui/material";

const FootballSlider = styled(Slider)`
color: transparent;
height: 100px;
background-image: url("/field.png");
background-size: 100%;
border-radius: 0px;
margin-top: 10px;
& .MuiSlider-track {
  height: 100%;
  border-radius: 0px;
  border-right: 3px solid yellow;
  box-sizing: border-box;
}
& span[data-index="0"] {
  background-image: url("/football.png");
  background-repeat: no-repeat;
  background-size: 100%;
  top: 70%;
  width: 30px;
  height: 21px;
  border-radius: 0px;
  box-shadow: none !important;
}
& span[data-index="1"] {
  background-image: url("/yardline.png");
  background-repeat: no-repeat;
  background-size: 100%;
  width: 15px;
  height: 75px;
  background-size: 100%;
  top: 20px;
  border-radius: 0px;
  box-shadow: none !important;
}
`;

export default FootballSlider;