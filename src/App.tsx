import "./App.css";
import { About } from "./components/About";
import { Project } from "./components/Project";
import { useEffect, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

interface ProjectData {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link: string;
}

const PLACEHOLDER_DATA = {
  about: {
    name: "Henrique Eduardo",
    age: 21,
    description: "Teste de consumo de API GraphQL",
  },
};

const getProjects = gql`
  query Query {
    getProjects {
      id
      name
      description
      technologies
      link
    }
  }
`;

const createProject = gql`
  mutation Mutation(
    $name: String!
    $description: String!
    $technologies: [String!]!
    $link: String!
    $participants: [String!]!
  ) {
    createProject(
      name: $name
      description: $description
      technologies: $technologies
      link: $link
      participants: $participants
    ) {
      name
      description
      technologies
      technologies
      link
      participants
    }
  }
`;

function App() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const { data } = useQuery(getProjects);
  const [createProjectMutation] = useMutation(createProject);

  useEffect(() => {
    if (data) {
      setProjects(data.getProjects);
    }
  }, [data]);

  function addNewProject() {
    createProjectMutation({
      variables: {
        name: `Novo Projeto ${projects.length + 1}`,
        description: "Adicionando novo projeto",
        technologies: ["React", "Node"],
        link: "https://www.google.com",
      },
    }).then((response) => {
      console.log(projects);
      const newProject = response.data.createProject;
      setProjects([...projects, newProject]);
    });
  }

  return (
    <main>
      <section>
        <h2>Sobre mim</h2>
        <About {...PLACEHOLDER_DATA.about} />
      </section>

      {data && (
        <section>
          {projects.map(({ id, name, description, technologies, link }) => (
            <Project
              key={id}
              title={name}
              description={description}
              tecnologies={technologies}
              link={link}
            />
          ))}
        </section>
      )}

      <button
        style={{
          padding: "10px",
          margin: "10px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#333",
          color: "#fff",
          cursor: "pointer",
        }}
        onClick={addNewProject}
      >
        Novo projeto
      </button>
    </main>
  );
}

export default App;
