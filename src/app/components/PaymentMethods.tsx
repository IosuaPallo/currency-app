import {useEffect, useState} from "react";
import {Box, Card, Typography, useMediaQuery} from "@mui/material";

type PaymentMethodsProps = {
    onPaymentMethodChange: (method: string) => void;
    boxWidth: number;
}

type Payment = {
    name: string;
    image: string;
}

const paymentMethods: Payment[] = [{name: 'mastercardOrVisa', image: "visa.png"}, {
    name: 'paypal',
    image: "paypal.png"
}, {name: 'klarna', image: 'Klarna.png'}, {name: 'giropay', image: 'giro.png'}, {
    name: 'applePay',
    image: 'apple.png'
}, {name: 'googlePay', image: "google.png"}];

const PaymentMethods = (props: PaymentMethodsProps) => {
    const {onPaymentMethodChange, boxWidth} = props;

    const matchesMD = useMediaQuery("(min-width:900px)");

    const [paymentMethod, setPaymentMethod] = useState("")
    const [error, setError] = useState(true);
    const [boxWidthCalculated, setBoxWidthCalculated] = useState(matchesMD ? `${(boxWidth - 10 * paymentMethods.length) / paymentMethods.length}px` : 'calc(100%-1px)')


    const handlePaymentMethodChange = (method: string) => {
        setPaymentMethod(method);
        onPaymentMethodChange(method);
        setError(false);
    }

    useEffect(() => {
        setBoxWidthCalculated(matchesMD ? `${(boxWidth - 10 * paymentMethods.length) / paymentMethods.length}px` : 'calc(100%-1px)');
    }, [boxWidth, matchesMD]);


    return <>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                width: matchesMD ? '60%' : '100%'
            }}>
                <Typography sx={{color: error ? 'red' : 'black'}}>Bezahlmethode *</Typography>
            </Box>
            <Box sx={{
                ...(matchesMD ? {display: 'flex', flexDirection: 'row', width: '60%'} : {
                    display: 'grid',
                    gridTemplateColumns: matchesMD ? 'repeat(auto-fit, minmax(0, 1fr))' : 'repeat(2, 1fr)',
                    gap: '10px',
                    width: '90%',
                    justifyContent: 'center',
                    alignItems: 'center',
                })

            }}>
                {
                    paymentMethods.map((method, index) => (
                        <Card sx={{
                            border: paymentMethod === method.name ? '2px solid blue' : 'none',
                            borderRadius: '5px',
                            boxShadow: '3px 5px 3px rgba(25,25,25,0.3)',
                            width: boxWidthCalculated,
                            height: matchesMD ? '90px' : '120px',
                            margin: '5px 10px 5px 0',
                            background: 'white',
                            transform: paymentMethod == method.name ? 'scale(1.1)' : 'scale(1)',
                            "&:hover": {
                                background: 'rgba(100,100,100,0.3)'
                            },
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                              onClick={() => handlePaymentMethodChange(method.name)}
                              key={method.name}
                        >
                            <img src={"/" + method.image} alt={""} style={{width: '100%', height: '100%'}}/>

                        </Card>
                    ))
                }
            </Box>
        </Box>
    </>
}

export default PaymentMethods;