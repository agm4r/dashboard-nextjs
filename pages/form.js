import FormComponent from "../modules/Form"
import Head from 'next/head'
import { Fragment } from "react";

const Form = () => {
    return (
        <Fragment>
            <Head>
                <title>Form Page</title>
            </Head>
            <FormComponent />
        </Fragment>
    );
}
 
export default Form;