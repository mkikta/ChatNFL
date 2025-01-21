import requests

def get_game_ids_by_year(year):
    response = requests.get(f"https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?limit=1000&dates={year}")
    response = response.json()
    if "events" in response:
        events = response["events"]
        for event in events:
            event_ids = []
            if "id" in event:
                event_ids.append(event["id"])
    return event_ids

def get_game_recaps(ids):
    game_recaps = []
    for id in ids:
        response = requests.get(f"https://cdn.espn.com/core/nfl/recap?xhr=1&gameId={id}")
        response = response.json()
        if "gamepackageJSON" in response:
            game_recap = response["gamepackageJSON"]
            if "article" in game_recap:
                game_recap = game_recap["article"]
                if "story" in game_recap:
                    game_recap = game_recap["story"]
        game_recaps.append(game_recap)
    return game_recaps

def main():
    game_ids = []
    for year in range(2020,2026):
        game_ids.extend(get_game_ids_by_year(year))

    # List of game recaps for all games in the 2020s.
    game_recaps = get_game_recaps(game_ids)


if __name__ == '__main__':
    main()
