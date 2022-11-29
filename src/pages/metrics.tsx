import { setupAPIClient } from "../services/api";
import { withSSRGAuth } from "../utils/withSSRAuth";

export default function Metrics() {

    return (
        <>
            <h1>Metrics</h1>
        </>
    )
}

export const getServerSideProps = withSSRGAuth(async (context) => {
    const apiClient = setupAPIClient(context);
    const response = await apiClient.get('/me');

    return {
      props: {}
    }
}, {
    permissions: ['metrics.list'],
    roles: ['administrator']
});
