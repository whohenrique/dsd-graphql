import { ApolloServer, gql } from "apollo-server";

const typedefs = gql`
  type Project {
    id: ID!
    name: String!
    description: String!
    technologies: [String]!
    link: String!
    participants: [String]!
  }

  type Query {
    getProjects: [Project]!
  }

  type Mutation {
    createProject(
      name: String!
      description: String!
      technologies: [String!]!
      link: String!
      participants: [String!]!
    ): Project!
  }
`;

const projects: string[] = [];

projects.push({
  id: "1",
  name: "Projeto 1",
  description: "Descrição do projeto 1",
  technologies: ["React", "Node.js"],
  link: "https://github.com",
  participants: ["Henrique", "Eduardo"],
});

const server = new ApolloServer({
  typeDefs: typedefs,
  resolvers: {
    Mutation: {
      createProject: (
        _,
        { name, description, technologies, link, participants }
      ) => {
        const id = projects.length;
        const project = {
          id,
          name,
          description,
          technologies,
          link,
          participants,
        };
        projects.push(project);
        return project;
      },
    },
    Query: {
      getProjects: () => projects,
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
