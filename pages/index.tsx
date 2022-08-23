import type { NextPage } from 'next'

import AppBarComponent from "../components/AppBar";
import { TranslationComponent } from "../components/Translation";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Home: NextPage = () => {
    return (
        <AppBarComponent>
            <ToastContainer/>
            <TranslationComponent/>
        </AppBarComponent>
    )
}


export default Home
