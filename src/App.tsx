import { SyntheticEvent, useState } from "react";
import { Box, Button, styled, Tab, Tabs, TextField } from "@mui/material";
import { UploadFile } from "./flows/UploadFile";

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const [tab, setTab] = useState(0);
  const handleChange = (event: SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };

  return (
    <div>
      <Tabs value={tab} onChange={handleChange}>
        <Tab label={tab === 0 ? "1 Uploading" : "1"} id="0" />
        <Tab label={tab === 1 ? "2 Test your bot" : "2"} id="1" />
        <Tab label={tab === 2 ? "3 Registation" : "3"} id="2" />
      </Tabs>

      <TabPanel value={tab} index={0}>
        <UploadFile />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        Enter email to test bot!
        <TextField type="text" placeholder="Email*" />
        <Button>Test my bot</Button>
      </TabPanel>
      <TabPanel value={tab} index={2}>
        Registration
      </TabPanel>
    </div>
  );
}

export default App;
