import Header from './components/Header.jsx'
import ProjectForm from './components/ProjectForm.jsx'
import ProjectList from './components/ProjectList.jsx'
import projectsArr from './projects.js'

function App() {
	return (
		<div className="App">
			<div>
				<Header />
			</div>
			<div>
				<ProjectForm />
			</div>
			<div>
				<ProjectList projects={projectsArr} />
			</div>
		</div>
	);
}

export default App;
