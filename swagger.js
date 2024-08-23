import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API Tarefas',
    description: 'API para gerenciamento de tarefas e usuários',
  },
  host: 'https://trilhabackendjr-jun15-d69l.onrender.com',
  schemes: ['http'],
};

const outputFile = './swagger-output.json'; 
const routes = ['./src/routes/user.js', './src/routes/task.js']; 

swaggerAutogen()(outputFile, routes, doc);
