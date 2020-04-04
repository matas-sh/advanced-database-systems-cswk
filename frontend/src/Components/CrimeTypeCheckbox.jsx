import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
// import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import 'typeface-roboto';
import '../../style/custom.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    color: '#52af77',
    display: 'flex',
    paddingLeft: 2,
    paddingRight: 2,
  },
  FormControl: {
    margin: theme.spacing(1),
  },
  Checkbox: {
    color: '#52af77',
  },
  FormControlLabel: {
    color: '#52af77',
  },
}));

export default function CheckboxesGroup() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    antiSocialBehaviour: true,
    bicycleTheft: true,
    burglary: true,
    criminalDamageAndArson: true,
    drugs: true,
    otherCrime: true,
    otherTheft: true,
    possessionOfWeapons: true,
    publicOrder: true,
    robbery: true,
    shoplifting: true,
    theftFromThePerson: true,
    vehicleCrime: true,
    violenceAndSexualOffences: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const {
    antiSocialBehaviour, bicycleTheft, burglary, criminalDamageAndArson, drugs, otherCrime,
    otherTheft, possessionOfWeapons, publicOrder, robbery, shoplifting, theftFromThePerson,
    vehicleCrime, violenceAndSexualOffences,
  } = state;

  return (
    <>
      <FormControl component="fieldset" className={classes.formControl}>
        <Typography component="span" fontWeight={600} variant="subtitle2"> Select Crime Types </Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={antiSocialBehaviour} onChange={handleChange} name="antiSocialBehaviour" />}
            label="Anti-social Behaviour"
          />
          <FormControlLabel
            control={<Checkbox checked={bicycleTheft} onChange={handleChange} name="bicycleTheft" />}
            label="Bicycle Theft"
          />
          <FormControlLabel
            control={<Checkbox checked={burglary} onChange={handleChange} name="burglary" />}
            label="Burglary"
          />
          <FormControlLabel
            control={<Checkbox checked={criminalDamageAndArson} onChange={handleChange} name="criminalDamageAndArson" />}
            label="Criminal Damage And Arson"
          />
          <FormControlLabel
            control={<Checkbox checked={drugs} onChange={handleChange} name="drugs" />}
            label="Drugs"
          />
          <FormControlLabel
            control={<Checkbox checked={otherCrime} onChange={handleChange} name="otherCrime" />}
            label="Other Crime"
          />
          <FormControlLabel
            control={<Checkbox checked={otherTheft} onChange={handleChange} name="otherTheft" />}
            label="Other Theft"
          />
          <FormControlLabel
            control={<Checkbox checked={possessionOfWeapons} onChange={handleChange} name="possessionOfWeapons" />}
            label="Possession Of Weapons"
          />
          <FormControlLabel
            control={<Checkbox checked={publicOrder} onChange={handleChange} name="publicOrder" />}
            label="Public Order"
          />
          <FormControlLabel
            control={<Checkbox checked={robbery} onChange={handleChange} name="robbery" />}
            label="Robbery"
          />
          <FormControlLabel
            control={<Checkbox checked={shoplifting} onChange={handleChange} name="shoplifting" />}
            label="Shoplifting"
          />
          <FormControlLabel
            control={<Checkbox checked={theftFromThePerson} onChange={handleChange} name="theftFromThePerson" />}
            label="Theft From The Person"
          />
          <FormControlLabel
            control={<Checkbox checked={vehicleCrime} onChange={handleChange} name="vehicleCrime" />}
            label="Vehicle Crime"
          />
          <FormControlLabel
            control={<Checkbox checked={violenceAndSexualOffences} onChange={handleChange} name="violenceAndSexualOffences" />}
            label="Violence And Sexual Offences"
          />
        </FormGroup>
      </FormControl>
    </>
  );
}
