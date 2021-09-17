import React //, {useState }
    from 'react';
    import '../PaymentForm.css';
    import Button from '@material-ui/core/Button';
    import { Alert, AlertTitle } from '@material-ui/lab';
    import IconButton from '@material-ui/core/IconButton';
    import { makeStyles } from '@material-ui/core/styles';
    import CloseIcon from '@material-ui/icons/Close';

    import Config from '../../../config/config';
import axios from 'axios';
import {
    TextField,
    Grid,
    Stepper,
    Step,
    StepLabel,
    Typography,FormLabel
} from "@material-ui/core";
import {
    CardCvcElement,
    CardNumberElement,
    CardExpiryElement
} from "@stripe/react-stripe-js";
// import { useStateValue } from "../../StateContext";
import StripeInput from '../StripeInput'
import amex from '../../../Images/cards/amex.png';
import cirrus from '../../../Images/cards/cirrus.png';
import diners from '../../../Images/cards/diners.png';
import dankort from '../../../Images/cards/dankort.png';
import discover from '../../../Images/cards/discover.png';
import jcb from '../../../Images/cards/jcb.png';
import maestro from '../../../Images/cards/maestro.png';
import mastercard from '../../../Images/cards/mastercard.png';
import visa from '../../../Images/cards/visa.png';
import visaelectron from '../../../Images/cards/visaelectron.png';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '25ch',
    },
    customInputLabel: {
        "& legend": {
          visibility: "visible"
        }
      }
  }));
const PaymentForm = (props) => {

    // const [{ formValues }, dispatch] = useStateValue();
    const classes = useStyles();

    const cardsLogo = [
        amex,
        cirrus,
        diners,
        dankort,
        discover,
        jcb,
        maestro,
        mastercard,
        visa,
        visaelectron
    ];
    const [alert, setalert] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(0);

    const PaymentSuccecs=(()=>{
        axios.post(Config.getServerPath()+'cart/'+props.user._id)
        .then(res => {
    if(res.data.status===400){
      console.log('error')
    return
    }
    const r= props.handleAddChild();
    if(r)
    setalert(true); 
    
    
        })
        .catch(() => {    console.log('send')
      }   );
        setalert(true);
    });
    const PaymentSuccecsChild=(()=>{
      axios.post(Config.getServerPath()+'childPay/'+props.user._id)
      .then(res => {
  if(res.data.status===400){
    console.log('error')
  return
  }
  console.log(props.user._id)
 const r= props.handleAddChild();
if(r)
  setalert(true); 
  
  
      })
      .catch(() => {    console.log('send')
    }   );
      setalert(true);
  });
    
    return <>

{!alert? (<div className='payment'>
<h3 hidden={!props.child} className='titel-payment'><u>תשלום רישום ילד</u> </h3>

        <div id='pric-div' >
        <div  id='pric-1'>
        <TextField
          id="outlined-disabled"
          label="מטבע"
                        variant="outlined"
                        value={'ILS  ₪'}
                        disabled={true}
                        InputLabelProps={{ shrink: true,className:'price-lable' }}

                    />
        </div>
        <div id='pric-1'>

            <TextField
                label="סכום"
                name="amount"
                variant="outlined"
                required
                fullWidth
                disabled={true}
                value={props.price}
                InputLabelProps={{ shrink: true,className:'price-lable' }}

            
            />
        </div>
        </div>
        
        <div id='pric-2'>
            <TextField
                label="מספר אשראי"
                name="ccnumber"
                variant="outlined"
                required
                fullWidth
                InputProps={{
                    inputComponent: StripeInput,
                    inputProps: {
                        component: CardNumberElement
                    },
                }}
                InputLabelProps={{ shrink: true,className:'price-lable' }}
            />
        </div>
        <div id='pric-div'className='MuiTextField-root' >
        <div id='pric-1'>
            <TextField
                label="תוקף כרטיס"
                name="ccexp"
                variant="outlined"
                required
                fullWidth
                notched

                InputProps={{
                    inputProps: {
                        component: CardExpiryElement
                    },
                    inputComponent: StripeInput
                }}
                InputLabelProps={{ shrink: true ,className:'price-lable'}}
            />
        </div>
        <div id='pric-1'>
            <TextField
                label="CVC"
                name="cvc"
                variant="outlined"
                required
                fullWidth
                InputProps={{
                    inputProps: {
                        component: CardCvcElement
                    },
                    inputComponent: StripeInput
                }}
                InputLabelProps={{ shrink: true,className:'price-lable' }}
            />
        </div>
        </div>


            <div className='cards'>
            <Grid container item xs={10} sm={6} justify="space-between">
                {cardsLogo.map(e => <img key={e} src={e} alt={e} width="60px" align="bottom" id='pric-img' style={{ padding: "5px 5px" }} />)}
            </Grid>
            </div>
        <button onClick={props.child?PaymentSuccecsChild: PaymentSuccecs} type='submit'  id='pay'>בצע תשלום</button>
        <button onClick={props.back} hidden={!props.child}  id='pay-back'>לחזרה לעמוד הקודם</button>

        <br/>
        </div>
) :(<> <Alert id='success-alert' severity="success"    action={
            <IconButton id='close-icon'
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setalert(false);
              }}
            >
              <CloseIcon  fontSize="inherit" />
            </IconButton>
          }>
        <AlertTitle  id='success-alert-title'>התשלום בוצע בהצלחה</AlertTitle>
        הקבלה תשלח למייל
      </Alert>
      <div className='cart-no-product'>
  <a href='/'>למעבר לדף הראשי</a>
  </div>
      </>)}
    </>
}

export default PaymentForm;