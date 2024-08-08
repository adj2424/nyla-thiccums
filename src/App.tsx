import './App.css';
import MyCanvas from './components/Canvas';

function App() {
	return (
		<div className="">
			{/* <div className="flex justify-center items-center absolute w-full h-screen pointer-events-none z-[1]">
				<span className="">TESTING</span>
				<div className="h-10 w-10 mix-blend-difference bg-slate-300"></div>
			</div> */}

			<div className="fixed w-full h-screen z-[-1]">
				<MyCanvas />
			</div>
		</div>
	);
}

export default App;

