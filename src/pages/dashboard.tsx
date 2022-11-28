import { useContext, useEffect } from "react";
import { Can } from "../components/Can";
import { AuthContext } from "../context/AuthContext";

import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRGAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
    const { user } = useContext(AuthContext)

    useEffect(() => {
        api.get('/me')
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }, [])

    return (
        <>
            <h1>Dashboard: { user?.email }</h1>

            <Can permissions={['metrics.list']}>
                <div>Métricas</div> 
            </Can>
        </>
    )
}

export const getServerSideProps = withSSRGAuth(async (context) => {
    const apiClient = setupAPIClient(context);
    const response = await apiClient.get('/me');

    console.log(response);
    
    return {
      props: {}
    }
});
