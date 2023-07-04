import Layout from "./components/Layout/Layout";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


function App() {

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
        <Layout />
        <ReactQueryDevtools initialIsOpen={false} />

    </QueryClientProvider>

  );
}

export default App;