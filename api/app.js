import express from 'express';
import routes from "./routes/index.js";

const app = express()

app.use(express.json())
app.use(routes);

const PORT = 3000;
app.listen(PORT, () => console.log(`O servidor está disponível na PORTA ${PORT}`));

export default app;