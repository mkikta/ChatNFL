f = open("data/players.csv", "r")

cols = f.readline().rstrip().split(',')
headers = {}
for i in range(len(cols)):
  headers[cols[i]] = i
print(cols)
count = 0
earliest_season = 2024
with open("web/shared/Players.ts", "w") as of:
  print("""export interface Player {
  id: string,
  label: string,
  shortName: string,
  headshot: string
}
const PLAYERS : Player[] = [""", file=of)
  for line in f.readlines():
    vals = line.split(',')
    last_season = int(vals[headers["last_season"]])
    if last_season >= 2024:
      print(f"\t{{ id: \"{vals[headers["nfl_id"]]}\", label: \"{vals[headers["display_name"]]}\",  shortName: \"{vals[headers["short_name"]]}\", headshot: \"{vals[headers["headshot"]].split("/")[-1]}\" }},", sep=",", file=of)
  print("];\n\nexport default PLAYERS;", file=of)
f.close()