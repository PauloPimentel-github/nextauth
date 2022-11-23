import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useCan } from "../hooks/useCan";

import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRGAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
    const { user } = useContext(AuthContext)

    const userCanSeeMetrics = useCan({
        //permissions: ['metrics.list']
        roles: ['administrator', 'editor']
    })

    useEffect(() => {
        api.get('/me')
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }, [])

    return (
        <>
            <h1>Dashboard: { user?.email }</h1>

            { userCanSeeMetrics && <div>Métricas</div> }
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
