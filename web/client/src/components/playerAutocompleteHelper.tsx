import { AutocompleteRenderInputParams, Box, createFilterOptions, TextField } from "@mui/material";
import { PLAYERS, Player } from "@shared/Players";

const createPlayerAutocompleteProps = (label: string) => ({
  options: PLAYERS,
  renderInput: (params : AutocompleteRenderInputParams) => {
    return (<TextField {...params} label={label} />)
  },
  renderOption: (props: React.HTMLAttributes<HTMLLIElement> & { key: any; }, option : Player) => {
    const { key, ...optionProps } = props;
    return (
      <Box
        key={key}
        component="li"
        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
        {...optionProps}
      >
        <img
          loading="lazy"
          width="40"
          src={`https://static.www.nfl.com/image/upload/t_person_squared_mobile/f_auto/league/${option.headshot}`}
          alt=""
        />
        {option.label}
      </Box>
    );
  },
  getOptionKey: (option : Player) => option.id,
  filterOptions: createFilterOptions<Player>({limit: 5})
});

export { createPlayerAutocompleteProps };
