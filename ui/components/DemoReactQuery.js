import { useQuery } from '@tanstack/react-query';
function fetchMessage() {
  return new Promise((resolve) => setTimeout(() => resolve('React Query works!'), 500));
}
export default function DemoReactQuery() {
  const { data, isLoading } = useQuery({
    queryKey: ['demo-message'],
    queryFn: fetchMessage,
  });
  return (
    <div className="p-4 border rounded">
      <div>React Query: {isLoading ? 'Loading...' : data}</div>
    </div>
  );
}
