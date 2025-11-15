/* eslint-disable max-len */
import {
  Grid, Typography, List, ListItem, ListItemText, Link,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import './Footer.css';

const Footer = () => (
  <Grid
    id="footer"
    container
    padding={5}
    height={320}
    mt={10}
  >
    <Grid item xs={2.6} md={2.5}>
      <div>
        <Typography variant="h6">Shop By Category</Typography>
        <List>
          <ListItem disablePadding>
            <ListItemText primary="Clothes" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Furnature" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Accessories" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Electonics" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Books" />
          </ListItem>
        </List>
      </div>
    </Grid>
    <Grid item xs={2.6} md={2.5}>
      <div>
        <Typography variant="h6">About</Typography>
        <List>
          <ListItem disablePadding>
            <ListItemText primary="About Us" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Contact Us" />
          </ListItem>
        </List>
      </div>
    </Grid>
    <Grid item xs={2.6} md={2.5}>
      <div>
        <Typography variant="h6">Policy</Typography>
        <List>
          <ListItem disablePadding>
            <ListItemText primary="Retrun Policy" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Terms of Use" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Security" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Privacy" />
          </ListItem>
        </List>
      </div>
    </Grid>
    <Grid item xs md>
      <Typography variant="h6">Founders</Typography>
      <List>
        <ListItem disablePadding>
          <Link href="https://github.com/hkmusameh01" target="_blank" color="inherit">
            <GitHubIcon fontSize="large" />
          </Link>
          <ListItemText primary="Abdalhakim Abumusameh" />
        </ListItem>
        <ListItem disablePadding>
          <Link href="https://github.com/hkmusameh01" target="_blank" color="inherit">
            <GitHubIcon fontSize="large" />
          </Link>

          <ListItemText primary="Sara Dahman" />
        </ListItem>
        <ListItem disablePadding>
          <Link href="https://github.com/hkmusameh01" target="_blank" color="inherit">
            <GitHubIcon fontSize="large" />
          </Link>

          <ListItemText primary="Mohammed Balousha" />
        </ListItem>
      </List>
    </Grid>
  </Grid>
);

export default Footer;
