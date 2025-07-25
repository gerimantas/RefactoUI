import dynamic from 'next/dynamic';
import Toolbar from "../components/Toolbar";
import SidebarTree from "../components/SidebarTree";
const TitleBar = dynamic(() => import('../components/TitleBar'), { ssr: false });
const DemoShadcnButton = dynamic(() => import('../components/DemoShadcnButton'), { ssr: false });
const DemoRadixDialog = dynamic(() => import('../components/DemoRadixDialog'), { ssr: false });
const DemoZustandCounter = dynamic(() => import('../components/DemoZustandCounter'), { ssr: false });
const DemoReactQuery = dynamic(() => import('../components/DemoReactQuery'), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-200 to-purple-200">
      <SidebarTree />
      <div className="flex-1 flex flex-col items-center justify-center">
        <TitleBar />
        <Toolbar />
        <div className="p-8 bg-white rounded shadow text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-4">Tailwind CSS veikia!</h1>
          <p className="text-lg text-gray-700 mb-4">Jei matote šį stilių – Next.js + Tailwind CSS integracija sėkminga.</p>
          <div className="flex flex-col gap-4 items-center">
            <DemoShadcnButton />
            <DemoRadixDialog />
            <DemoZustandCounter />
            <DemoReactQuery />
          </div>
        </div>
      </div>
    </div>
  );
}
