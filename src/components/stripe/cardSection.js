import React, {useState} from 'react'
import { CardElement, IbanElement } from 'react-stripe-elements';

export default function CardSection() {

    const [isCreditSelected, setIsCreditSelected] = useState(true);
    const [isDebitSelected, setIsDebitSelected] = useState(false);

    const handleChange = (event)=>{
        console.log(event)
    }

    return (
        <div>
            <h2 className="text-karla-uppercase text-lg font-bold my-4 pb-2 border-b-2">Card Details</h2>
            <fieldset>
                <div className="my-1">
                    <input name="cardOption" checked={isCreditSelected} onChange={()=> {setIsCreditSelected(!isCreditSelected);setIsDebitSelected(!isDebitSelected)} } value="credit" type="radio" id="creditCard" />
                    <label className="pl-2" htmlFor="creditCard">Pay by credit card (VISA, Master Card,...)</label>
                </div>
                <div className="my-1">
                    <input name="cardOption" checked={isDebitSelected} onChange={()=> {setIsCreditSelected(!isCreditSelected);setIsDebitSelected(!isDebitSelected)} } value="debit" type="radio" id="debitCard" />
                    <label className="pl-2" htmlFor="debitCard">Pay by debit card (Maestro)</label>
                </div>
            </fieldset>
            <div className={`${isCreditSelected ? `block` : `hidden`} md:w-1/2 shadow-xl p-2 my-4`}>
                <CardElement style={{ base: { fontSize: '18px' } }} />

            </div>
            <div className={`${isDebitSelected ? `block` : `hidden`} md:w-1/2 shadow-xl p-2 my-4`}>

                <IbanElement style={{ base: { fontSize: '18px' } }}
                        supportedCountries={['SEPA']}></IbanElement>

            </div>
        </div>
    )
}
