import React from 'react';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import 'typeface-roboto';

const marks = [
  {
    value: 0,
    label: '0 m',
  },
  {
    value: 10000,
    label: '10000 m',
  },
];

const SliderWithStyles = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default function DistanceSlider() {
  return (
    <>
      <Box pt={2} pl={2} pr={2}>
        <Typography component="span" fontWeight={600} variant="subtitle2">Distance slider</Typography>
      </Box>
      <Container>
        <SliderWithStyles marks={marks} valueLabelDisplay="auto" aria-label="distance slider" min={0} max={10000} defaultValue={5000} />
      </Container>
    </>
  );
}
