# ChatNFL

To run the project, first ensure that you have ElasticSearch, Docker, npm, and Ollama installed.

1. Run the docker daemon.
2. Run elasticsearch locally:
     ```bash
     curl -fsSL https://elastic.co/start-local | sh.
     ```
4. Run Deepseek-r1 on ollama:
   ```bash
   ollama run deepseek-r1:1.5b.
   ```
   This requires about 2GB of disk space.
5. Run the client:
   ```bash
   cd ~/ChatNFL/web/client
   npm run dev
   ```
6. Run the server:
   ```bash
   cd ~/ChatNFL/web/server
   npm run start
   ```
7. Navigate to your localhost.
