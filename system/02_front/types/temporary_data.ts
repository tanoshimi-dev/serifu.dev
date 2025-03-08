import { TMenteinfo } from "./t_menteinfo";
import { MUserinfo } from "./m_userinfo";
import { MMaintenanceItem } from "./m_maintenanceitem";
import { MHosyu } from "./m_hosyu";

export interface TemporaryData extends TMenteinfo, MUserinfo, MMaintenanceItem, MHosyu {}
