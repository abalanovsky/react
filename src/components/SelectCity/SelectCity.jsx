import './SelectCity.css'
import Button from '@mui/material/Button';
import {Stack} from "@mui/material";
export function SelectCity(props) {
    const cities = ['Kyiv', 'Lviv', 'Odesa', 'Kharkiv', 'Poltava', 'Uzhhorod', 'Ivano-Frankivsk', 'Dnipro',
        'Zaporizhzhia', 'Khmelnytskyi']
    return (
        <div className="select-container">
            <Stack spacing={2} direction="column">
            {cities.map(city => <Button key={city} variant="outlined" onClick={() => props.handleSelect(city)}>{city}
            </Button>)}
            </Stack>
        </div>
    )
}
