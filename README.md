# ChatNFL

To run the project, first ensure that you have ElasticSearch, Docker, npm, and Ollama installed.

1. Run the docker daemon.
2. Run elasticsearch locally:
     ```bash
     curl -fsSL https://elastic.co/start-local | sh
     ```

3. Run the "elastic_data.py" file in the CHATNFL folder. 
   Make sure to insert password for ELASTIC_AUTH before running it.
   This should take a few minutes.

4. Create a copy of the '.env.example' in ../web/server and modify insert local password for
   ELASTICSEARCH_PASSWORD.

5. Run Deepseek-r1 on ollama:
   ```bash
   ollama run deepseek-r1:1.5b
   ```
   This requires about 2GB of disk space.
6. Run the client:
   ```bash
   cd ~/ChatNFL/web/client
   npm run dev
   ```
7. Run the server:
   ```bash
   cd ~/ChatNFL/web/server
   npm run start
   ```
8. Navigate to your localhost.
