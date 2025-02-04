import os
import csv
from elasticsearch import Elasticsearch, helpers

# CHANGE THE SECOND STRING HERE TO YOUR PASSWORD FROM elastic-start-local/.env
ELASTIC_AUTH = ('elastic', 'epyj1jgu')
EXCLUDE_COLUMNS = ['old_game_id']
MIN_YEAR = 2020

def get_files(folder):
  files = [f for f in os.listdir(folder) if f.endswith('.csv')]
  return files

def filter_years(file_names):
  return [f for f in file_names if int(f[-8:-4]) >= MIN_YEAR]

def read_csv(path):
  with open(path, 'r') as f:
    reader = csv.DictReader(f)
    data = [{k: v for k, v in row.items() if v != '' and k not in EXCLUDE_COLUMNS} for row in reader]
    return data

def combine_folder(folder):
  files = filter_years(get_files(folder))
  data = []
  for file in files:
    data.extend(read_csv(f'{folder}/{file}'))
    break
  return data

if __name__ == '__main__':
  try:
    client = Elasticsearch("http://localhost:9200", verify_certs=False, basic_auth=ELASTIC_AUTH)
  except Exception as e:
    print("Failed to authenticate elasticsearch.")
    print("Make sure elasticsearch is running and set ELASTIC_AUTH with your password.")
    exit()

  # delete indices first
  try:
    print("Clearing current data...")
    client.indices.delete(index='pbp', ignore_unavailable=True)
    client.indices.delete(index='pbp_participation', ignore_unavailable=True)
    client.indices.delete(index='players', ignore_unavailable=True)
  except Exception as e:
    print("Failed to clear existing data.")
    exit()

  # read data/pbp
  try:
    print("Loading data/pbp files...")
    data = combine_folder('data/pbp')
    helpers.bulk(client, data, index='pbp')
  except Exception as e:
    print("Failed to load data/pbp files.")
    exit()
  print("Successfully loaded data/pbp files.")

  # read data/pbp_participation
  try:
    print("Loading data/pbp_participation files...")
    data = combine_folder('data/pbp_participation')
    helpers.bulk(client, data, index='pbp_participation')
  except Exception as e:
    print("Failed to load data/pbp_participation files.")
    exit()
  print("Successfully loaded data/pbp_participation files.")

  # read data/players.csv
  try:
    print("Loading data/players.csv data...")
    data = read_csv('data/players.csv')
    helpers.bulk(client, data, index='players')
  except Exception as e:
    print("Failed to load data/players.csv data.")
    exit()
  print("Successfully loaded data/players.csv data.")
