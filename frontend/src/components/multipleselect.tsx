            import {
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
            import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

            
            const ITEM_HEIGHT = 48;
            const ITEM_PADDING_TOP = 8;
            const MenuProps = {
              slotProps: {
                paper: {
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 250,
                  },
                },
              },
              };



            const handleChange = (e: SelectChangeEvent<typeof description>) => {
              const {
                target: { value },
              } = e;
              setDescription(
                // On autofill we get a stringified value.
                typeof value === "string" ? value.split(",") : value,
              );
            };

              const [description, setDescription] = useState<string[]>([]);
          


          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Optionen</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={description}
              onChange={handleChange}
              input={<OutlinedInput label="Optionen" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {names.map((name) => {
                const selected = description.includes(name);
                const SelectionIcon = selected
                  ? CheckBoxIcon
                  : CheckBoxOutlineBlankIcon;

                return (
                  <MenuItem key={name} value={name}>
                    <SelectionIcon
                      fontSize="small"
                      style={{
                        marginRight: 8,
                        padding: 9,
                        boxSizing: "content-box",
                      }}
                    />
                    <ListItemText primary={name} />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>