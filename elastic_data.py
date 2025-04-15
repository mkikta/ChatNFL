import os
import csv
from elasticsearch import Elasticsearch, helpers

# CHANGE THE SECOND STRING HERE TO YOUR PASSWORD FROM elastic-start-local/.env
ELASTIC_AUTH = ('elastic', 'password_goes_here')
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
	return data

def try_load_data(client, index, data):
	try:
		print(f'Loading {index} data...')
		helpers.bulk(client, data, index=index)
	except Exception as _:
		print(f'Failed to load {index} data.', _)
		return
	print(f'Successfully loaded {index} data.')

if __name__ == '__main__':
	try:
		client = Elasticsearch('http://localhost:9200', verify_certs=False, basic_auth=ELASTIC_AUTH)
	except Exception as e:
		print('Failed to authenticate elasticsearch.')
		print('Make sure elasticsearch is running and set ELASTIC_AUTH with your password.')
		exit()

	# delete indices first
	try:
		print('Clearing current data...')
		response = client.indices.delete(index=['pbp', 'players'], ignore_unavailable=True)
	except Exception as e:
		print('Failed to clear existing data: ', e)
		exit()

	# load data/pbp and data/pbp_participation
	print('Merging pbp and pbp_participation data...')
	pbp_data = combine_folder('data/pbp')
	par_data = combine_folder('data/pbp_participation')
	par_mapping = {}
	for row in par_data:
		key = (row['nflverse_game_id'], row['play_id'])
		del row['nflverse_game_id']
		del row['play_id']
		par_mapping[key] = row
	merged_pbp = []
	for row in pbp_data:
		key = (row['game_id'], row['play_id'])
		if key in par_mapping:
			row.update(par_mapping[key])
			merged_pbp.append(row)
	print(f"Successfully merged {len(merged_pbp)} rows.")
	try_load_data(client, 'pbp', merged_pbp)
	try_load_data(client, 'pbp_participation', merged_pbp)
	# load data/players.csv
	try_load_data(client, 'players', read_csv('data/players.csv'))
