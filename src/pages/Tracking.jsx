import { useState } from "react";
import Spedizioni from "../components/Spedizioni";
import AggiornaSpedizioni from "../components/AggiornaSpedizioni";
import {Tabs, TabsHeader, TabsBody, Tab, TabPanel} from "@material-tailwind/react";

function Tracking() {

  const [attiva, setAttiva] = useState('spedizioni')

  return (
    <div>
      <Tabs value="spedizioni">
        <div className="border-b border-b-neutral-300">
        <TabsHeader className="w-min gap-2 font-semibold">
          <Tab key="spedizioni" value="spedizioni" className={` ${attiva == 'spedizioni' ? 'my-tab-active' : 'my-tab'}`} onClick={() => setAttiva('spedizioni')}>
            Spedizioni
          </Tab>
          <Tab key="aggiorna" value="aggiorna" className={` ${attiva == 'aggiorna' ? 'my-tab-active' : 'my-tab'}`} onClick={() => setAttiva('aggiorna')}>
            Aggiorna
          </Tab>          
        </TabsHeader>
        </div>
        <TabsBody>
          <TabPanel key="spedizioni" value="spedizioni" className="px-0">
            <Spedizioni/>
          </TabPanel>
          <TabPanel key="aggiorna" value="aggiorna" className="px-0">
            <AggiornaSpedizioni/>
          </TabPanel>                                           
        </TabsBody>
      </Tabs>
    </div>
  )
}

export default Tracking