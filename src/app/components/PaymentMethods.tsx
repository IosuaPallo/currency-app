import {useEffect, useState} from "react";
import {Box, Card} from "@mui/material";

type PaymentMethodsProps = {
    onPaymentMethodChange: (method: string) => void;
    boxWidth: number;
}

const paymentMethods = ['mastercardOrVisa', 'paypal', 'klarna', 'giropay', 'applePay', 'googlePay'];

const PaymentMethods = (props: PaymentMethodsProps) => {
    const {onPaymentMethodChange, boxWidth} = props;

    const [paymentMethod, setPaymentMethod] = useState("")

    useEffect(() => {

    }, []);

    const handlePaymentMethodChange = (method: string) => {
        setPaymentMethod(method);
        onPaymentMethodChange(method);
    }


    return <>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
            {
                paymentMethods.map((method, index) => (
                    <Card sx={{
                        borderRadius: '5px',
                        boxShadow: '3px 5px 3px rgba(25,25,25,0.3)',
                        width: `${(boxWidth - 10 * paymentMethods.length) / paymentMethods.length}px`,
                        height: '60px',
                        margin: '5px',
                        background: paymentMethod == method ? 'rgba(25,25,25,0.4)' : 'white',
                        transform: paymentMethod == method ? 'scale(1.1)' : 'scale(1)',
                        "&:hover": {
                            background: 'rgba(100,100,100,0.3)'
                        }
                    }}
                          onClick={() => handlePaymentMethodChange(method)}
                          key={method}
                    >
                        {method}
                    </Card>
                ))
            }
        </Box>
    </>
}

export default PaymentMethods;