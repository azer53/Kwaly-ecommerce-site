import React from 'react'
import useForm from 'react-hook-form';

export default function ShippingSection(props) {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);
    return (

        // <div>
        //     <h2>Shipping</h2>
        //     {errors.Shipping && <span>This field is required</span>}
        //     <div>
        //         <input id="BE" name="Shipping" type="radio" value="BE" ref={register({ required: true })}></input>
        //         <label for="BE">Postal delivery in Belgium + €5.00 </label>
        //     </div>
        //     <div>
        //         <input id="NL" name="Shipping" type="radio" value="NL" ref={register({ required: true })}></input>
        //         <label for="NL">Postal delivery to The Netherlands + €9.00 </label>
        //     </div>
        //     <div>
        //         <input id="SN" name="Shipping" type="radio" value="SN" ref={register({ required: true })}></input>
        //         <label for="SN">Pick Up in Sint-Niklaas - Free</label>
        //     </div>

        //     <p className="italic text-sm text-gray-700">for shipping outside of Belgium or The Netherlands please <a href="mailto:admin@kwaly.be?Subject=International%20Shipping" target="_top"> send us an email</a></p>
        // </div>
    )
}
