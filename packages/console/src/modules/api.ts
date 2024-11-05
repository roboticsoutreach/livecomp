import { livecompPaths } from "@livecomp/sdk";
import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";

const fetchClient = createFetchClient<livecompPaths>({
    baseUrl: import.meta.env.VITE_SERVER_URL,
});
export const $api = createClient(fetchClient);

