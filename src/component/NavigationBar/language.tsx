import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import China from "./image/china_small.svg";
import USA from "./image/usa_small.svg";

export const Android12Switch = styled(Switch)(() => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url(${China})`,
      backgroundRepeat: "no-repeat",
      backgroundPositionY: "center",
      left: 12,
    },
    '&:after': {
      backgroundImage: `url(${USA})`,
      backgroundRepeat: "no-repeat",
      backgroundPositionY: "center",
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));
