import { QueryFunction, QueryObserverResult, useQuery } from "react-query";

interface IuseReactQuery {
  name: string,
  apiCall: QueryFunction
  staleDuration?: number
}

export default function useReactQuery({ name, apiCall, staleDuration = 60000 }: IuseReactQuery): QueryObserverResult {
  return useQuery(name, apiCall, { staleTime: staleDuration })
}

/* AN EXAMPLE OF USING THE HOOK : 
  const fetchBreedData = () => axios.get('https://dog.ceo/api/breeds/list/all');
  const { status, data, error, isFetching } = useReactQuery({ 
    name: 'fetchBreedData', apiCall: fetchBreedData 
  })
*/ 