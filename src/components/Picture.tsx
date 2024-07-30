export const Picture = () => {
	return (
		<>
			<mesh position={[(Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, -10]}>
				<boxGeometry />
				<meshStandardMaterial />
			</mesh>
		</>
	);
};
