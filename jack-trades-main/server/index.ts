import sequelize from './database/connection';
import { app, server } from './app';

const port = app.get('port');

(async () => {
  try {
    await sequelize.authenticate();
    // eslint-disable-next-line no-console
    server.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`Error on synchronizing Database: ${error}`);
  }
})();
