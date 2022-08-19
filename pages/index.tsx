import type { NextPage } from 'next'
import AppBarComponent from "../components/AppBar";
import { TranslationComponent } from "../components/Translation";

const Home: NextPage = () => {
    return (
        <AppBarComponent>
            <TranslationComponent />
        </AppBarComponent>
    )
}


export default Home
