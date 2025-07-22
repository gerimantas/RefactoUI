import { create } from 'zustand';
const useCounter = create((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));
export default function DemoZustandCounter() {
  const { count, inc } = useCounter();
  return (
    <div className="p-4 border rounded">
      <div>Zustand Counter: {count}</div>
      <button onClick={inc} className="mt-2 px-4 py-2 bg-green-200 rounded">Increment</button>
    </div>
  );
}
