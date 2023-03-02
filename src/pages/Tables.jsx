import { useState, useEffect } from "react";
import Operatori from "../components/Operatori"
import Vettori from "../components/Vettori"
import Corrieri from "../components/Corrieri"
import Clienti from "../components/clienti"
import {Tabs, TabsHeader, TabsBody, Tab, TabPanel} from "@material-tailwind/react";

function Tables() {

  const [attiva, setAttiva] = useState('my-button-tab')

  return (
    <div>
      <Tabs value="operatori">
        <div className="border-b border-b-neutral-300">
        <TabsHeader className="w-min gap-4 font-semibold">
          <Tab key="operatori" value="operatori" className={attiva} onClick={() => setAttiva(my-button-tab-active)}>
            Operatori
          </Tab>
          <Tab key="vettori" value="vettori" className={attiva}>
            Vettori
          </Tab>
          <Tab key="corrieri" value="corrieri" className={attiva}>
            Corrieri
          </Tab>
          <Tab key="clienti" value="clienti" className={attiva}>
            Clienti
          </Tab>
        </TabsHeader>
        </div>
        <TabsBody>
          <TabPanel key="operatori" value="operatori" className="px-0">
            <Operatori/>
          </TabPanel>
          <TabPanel key="vettori" value="vettori" className="px-0">
            <Vettori/>
          </TabPanel>
          <TabPanel key="corrieri" value="corrieri" className="px-0">
            <Corrieri/>
          </TabPanel>
          <TabPanel key="clienti" value="clienti" className="px-0">
            <Clienti/>
          </TabPanel>                                
        </TabsBody>
      </Tabs>
    </div>
  )
}

export default Tables




