import { MBranch } from '@/types/m_branch';
import { MMachineModel } from '@/types/m_machine_model';
import { MMaintContract } from '@/types/m_maint_contract';
import { MServiceAgent } from '@/types/m_service_agent';
import { MMaintenanceItem } from '@/types/m_maintenanceitem';

export interface MasterData {
  branches?:        MBranch[] | null;
  machinModels?:    MMachineModel[] | null;
  maintContracts?:  MMaintContract[] | null;
  serviceAgents?:   MServiceAgent[] | null;
  mMaintenanceItems?:  MMaintenanceItem[] | null;
};
